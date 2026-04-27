import re
import unicodedata

from sqlalchemy import delete, inspect, select, text

from shared.db import SessionLocal, engine
from shared.models import Base, Category, ProductOffer


def slugify_category(name: str) -> str:
    normalized = unicodedata.normalize("NFD", (name or "").strip())
    ascii_name = normalized.encode("ascii", "ignore").decode("ascii").lower()
    sanitized = re.sub(r"[^a-z0-9]+", " ", ascii_name)
    return "-".join(part for part in sanitized.split() if part)


def ensure_product_offers_schema() -> None:
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    columns = {column["name"] for column in inspector.get_columns("product_offers")}
    if "image" not in columns:
        with engine.begin() as connection:
            connection.execute(
                text("ALTER TABLE product_offers ADD COLUMN image VARCHAR(1000)")
            )
    if "category_id" not in columns:
        with engine.begin() as connection:
            connection.execute(
                text("ALTER TABLE product_offers ADD COLUMN category_id INTEGER")
            )


def build_category_seed(products: list[dict], categories: list[dict] | None = None) -> list[dict]:
    category_map: dict[tuple[str, int | None, str], dict] = {}

    for category in categories or []:
        store = category["store"]
        external_id = category.get("external_id")
        name = (category.get("name") or "").strip()
        if not name:
            continue

        slug = category.get("slug") or slugify_category(name)
        category_map[(store, external_id, slug)] = {
            "store": store,
            "external_id": external_id,
            "name": name,
            "slug": slug,
            "group_external_id": category.get("group_external_id"),
            "image": category.get("image"),
            "hidden_keywords": category.get("hidden_keywords"),
            "sort_order": category.get("sort_order"),
        }

    for product in products:
        name = (product.get("category") or "").strip()
        if not name:
            continue

        store = product["store"]
        external_id = product.get("category_external_id")
        slug = slugify_category(name)
        category_map.setdefault(
            (store, external_id, slug),
            {
                "store": store,
                "external_id": external_id,
                "name": name,
                "slug": slug,
                "group_external_id": None,
                "image": None,
                "hidden_keywords": None,
                "sort_order": None,
            },
        )

    return list(category_map.values())


def sync_categories(session, categories: list[dict]) -> dict[tuple[str, int | None, str], int]:
    existing_categories = session.scalars(select(Category)).all()
    existing_map = {
        (category.store, category.external_id, category.slug): category
        for category in existing_categories
    }

    for item in categories:
        key = (item["store"], item.get("external_id"), item["slug"])
        existing = existing_map.get(key)
        if existing:
            existing.name = item["name"]
            existing.group_external_id = item.get("group_external_id")
            existing.image = item.get("image")
            existing.hidden_keywords = item.get("hidden_keywords")
            existing.sort_order = item.get("sort_order")
            continue

        category = Category(**item)
        session.add(category)
        session.flush()
        existing_map[key] = category

    return {key: category.id for key, category in existing_map.items()}


def save_products(products: list[dict], categories: list[dict] | None = None) -> None:
    stores = {product["store"] for product in products}
    category_seed = build_category_seed(products, categories)

    ensure_product_offers_schema()

    with SessionLocal() as session:
        category_id_map = sync_categories(session, category_seed)

        for store in stores:
            session.execute(delete(ProductOffer).where(ProductOffer.store == store))

        session.add_all(
            ProductOffer(
                store=product["store"],
                external_id=product["id"],
                title=product["title"],
                normalized_title=product["normalized_title"],
                price=product["price"],
                price_list=product["price_list"],
                stock=product["stock"],
                category_id=category_id_map.get(
                    (
                        product["store"],
                        product.get("category_external_id"),
                        slugify_category(product.get("category", "")),
                    )
                ),
                category=product["category"],
                marca=product["marca"],
                url=product["url"],
                image=product.get("image"),
            )
            for product in products
        )
        session.commit()
