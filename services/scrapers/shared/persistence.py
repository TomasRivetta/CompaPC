from sqlalchemy import delete

from shared.db import SessionLocal, engine
from shared.models import Base, ProductOffer


def save_products(products: list[dict]) -> None:
    stores = {product["store"] for product in products}

    Base.metadata.create_all(bind=engine)

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
            )
            for product in products
        )
        session.commit()
