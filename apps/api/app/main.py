from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from app.db.init_db import init_db
from app.db.models import Category, ProductOffer
from app.db.session import SessionLocal

load_dotenv()

@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

origins = os.getenv("CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in origins if o],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/offers")
def list_offers(
    db: Annotated[Session, Depends(get_db)],
    limit: Annotated[int, Query(ge=1, le=5000)] = 50,
    store: str | None = None,
    category: str | None = None,
    category_slug: str | None = None,
):
    query = (
        select(ProductOffer, Category.slug, Category.name, Category.external_id)
        .outerjoin(Category, ProductOffer.category_id == Category.id)
        .order_by(ProductOffer.price.asc().nulls_last())
    )

    if store:
        query = query.where(ProductOffer.store == store)

    if category:
        query = query.where(ProductOffer.category == category)

    if category_slug:
        query = query.where(Category.slug == category_slug)

    offers = db.execute(query.limit(limit)).all()

    return [
        {
            "id": offer.id,
            "store": offer.store,
            "external_id": offer.external_id,
            "title": offer.title,
            "normalized_title": offer.normalized_title,
            "price": offer.price,
            "price_list": offer.price_list,
            "stock": offer.stock,
            "category": offer.category,
            "category_slug": category_slug_value,
            "category_name": category_name,
            "category_external_id": category_external_id,
            "marca": offer.marca,
            "url": offer.url,
            "image": offer.image,
        }
        for offer, category_slug_value, category_name, category_external_id in offers
    ]


@app.get("/categories")
def list_categories(
    db: Annotated[Session, Depends(get_db)],
    store: str | None = None,
    only_with_products: bool = True,
):
    product_count = func.count(ProductOffer.id)
    query = (
        select(
            Category.id,
            Category.store,
            Category.external_id,
            Category.name,
            Category.slug,
            Category.image,
            Category.sort_order,
            product_count.label("product_count"),
        )
        .outerjoin(ProductOffer, ProductOffer.category_id == Category.id)
        .group_by(
            Category.id,
            Category.store,
            Category.external_id,
            Category.name,
            Category.slug,
            Category.image,
            Category.sort_order,
        )
        .order_by(Category.sort_order.asc().nulls_last(), Category.name.asc())
    )

    if store:
        query = query.where(Category.store == store)

    if only_with_products:
        query = query.having(product_count > 0)

    rows = db.execute(query).all()
    return [
        {
            "id": category_id,
            "store": category_store,
            "external_id": external_id,
            "name": name,
            "slug": slug,
            "image": image,
            "sort_order": sort_order,
            "product_count": count,
        }
        for category_id, category_store, external_id, name, slug, image, sort_order, count in rows
    ]
