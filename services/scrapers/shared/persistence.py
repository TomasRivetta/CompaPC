from sqlalchemy import delete, inspect, text

from shared.db import SessionLocal, engine
from shared.models import Base, ProductOffer


def ensure_product_offers_schema() -> None:
    Base.metadata.create_all(bind=engine)

    inspector = inspect(engine)
    columns = {column["name"] for column in inspector.get_columns("product_offers")}
    if "image" not in columns:
        with engine.begin() as connection:
            connection.execute(
                text("ALTER TABLE product_offers ADD COLUMN image VARCHAR(1000)")
            )


def save_products(products: list[dict]) -> None:
    stores = {product["store"] for product in products}

    ensure_product_offers_schema()

    with SessionLocal() as session:
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
                category=product["category"],
                marca=product["marca"],
                url=product["url"],
                image=product.get("image"),
            )
            for product in products
        )
        session.commit()
