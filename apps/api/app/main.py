from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

from app.db.init_db import init_db
from app.db.models import Category, ProductOffer
from app.db.session import SessionLocal

load_dotenv()

CANONICAL_CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "procesadores-amd": ["procesadores amd", "ryzen"],
    "procesadores-intel": ["procesadores intel", "core i", "intel cpu"],
    "mothers-amd": ["mothers amd", "mother amd"],
    "mothers-intel": ["mothers intel", "mother intel"],
    "memorias": ["memorias", "ram", "ddr4", "ddr5"],
    "placas-de-video-geforce": ["placas de video geforce", "geforce", "rtx", "gtx"],
    "placas-de-video-radeon-amd": ["placas de video radeon amd", "radeon amd", "radeon"],
    "placas-de-video-intel-arc": ["placas de video intel arc", "intel arc", "arc"],
    "discos-solidos-ssd": ["ssd", "discos solidos ssd", "nvme", "m.2"],
    "discos-externos": ["discos externos", "disco externo"],
    "fuentes-de-alimentacion": ["fuentes de alimentacion", "fuente", "psu"],
    "gabinetes": ["gabinetes", "gabinete"],
    "coolers-cpu": ["coolers cpu", "cpu cooler"],
    "coolers-fan": ["coolers fan", "fans", "fan"],
    "pasta-termica": ["pasta termica"],
    "teclados": ["teclados", "teclado usb"],
    "mouses": ["mouses", "mouse gamer", "mouse inalambrico", "mouse optico usb"],
    "mouse-pads": ["mouse pads", "mouse pad"],
    "auriculares": ["auriculares"],
    "microfonos": ["microfonos", "microfono"],
    "webcam": ["webcam"],
    "joysticks": ["joysticks"],
    "stream-deck": ["stream deck"],
    "parlantes": ["parlantes", "parlantes 2.0", "parlantes portatiles"],
    "teclado-y-mouse": ["teclado y mouse"],
    "notebooks": ["notebooks", "notebook", "laptops", "ultrabooks"],
    "pc-de-escritorio": ["pc de escritorio", "equipos armados", "mini pcs", "armados"],
    "consolas": ["consolas"],
    "cables-y-adaptadores": ["cables", "adaptadores"],
    "routers-wifi": ["routers", "wifi", "conectividad", "red", "router hogar", "access point", "antenas"],
    "kits-de-actualizacion": ["kits de actualizacion"],
    "combos-de-teclados-mouses-y-otros": ["combos de teclados", "combos de mouses", "combos", "teclado y mouse"],
    "modding-cables-iluminacion-y-otros": ["modding", "iluminacion"],
    "estabilizadores": ["estabilizadores"],
    "ups": ["ups"],
    "volantes-simuladores-de-manejo": ["volantes", "simuladores de manejo"],
    "sillas-gamers": ["sillas", "sillas gamers"],
    "monitores": ["monitores y pantallas", "monitores", "pantallas"],
    "televisores": ["televisores", "tv"],
    "proyectores": ["proyectores"],
    "capturadoras-y-sintonizadoras-de-tv": ["capturadoras", "sintonizadoras de tv"],
    "impresoras-y-multifunciones": ["impresoras", "impresoras laser", "impresoras multifuncion", "impresoras y multifunciones"],
    "plotter": ["plotter"],
    "escaner": ["escaner", "scanner"],
    "toners": ["toners", "toner"],
    "accesorios-de-celulares": ["celulares", "smartwatch", "tablet"],
    "robots": ["robots"],
    "general": ["general"],
    "sin-identificar": ["sin identificar"],
}


def build_canonical_category_filter(canonical_slug: str):
    keywords = CANONICAL_CATEGORY_KEYWORDS.get(canonical_slug, [])
    if not keywords:
        return None

    expressions = []
    for keyword in keywords:
        lowered_keyword = keyword.lower()
        expressions.extend(
            [
                func.lower(func.coalesce(Category.name, "")).contains(lowered_keyword),
                func.lower(func.coalesce(Category.slug, "")).contains(lowered_keyword.replace(" ", "-")),
                func.lower(func.coalesce(ProductOffer.category, "")).contains(lowered_keyword),
            ]
        )

    return or_(*expressions)

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
    offset: Annotated[int, Query(ge=0)] = 0,
    store: str | None = None,
    category: str | None = None,
    category_slug: str | None = None,
    canonical_category_slug: str | None = None,
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

    if canonical_category_slug:
        canonical_filter = build_canonical_category_filter(canonical_category_slug)
        if canonical_filter is not None:
            query = query.where(canonical_filter)

    offers = db.execute(query.offset(offset).limit(limit)).all()

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
