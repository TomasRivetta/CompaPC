from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from app.db.init_db import init_db
from app.db.models import ProductOffer
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
):
    query = select(ProductOffer).order_by(ProductOffer.price.asc().nulls_last())

    if store:
        query = query.where(ProductOffer.store == store)

    if category:
        query = query.where(ProductOffer.category == category)

    offers = db.scalars(query.limit(limit)).all()

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
            "marca": offer.marca,
            "url": offer.url,
        }
        for offer in offers
    ]
