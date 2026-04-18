from config.urls_compra_gamer import (
    COMPRAGAMER_BASE_URL as BASE_URL,
    COMPRAGAMER_PRODUCTS_URL as PRODUCTS_URL,
    STORE_NAME,
    COMPRAGAMER_CATEGORY_URL as CATEGORIAS_URL,
    COMPRAGAMER_MARCAS_URL as MARCAS_URL,
)

from shared.http import get_json
from shared.cleaners import clean_text, clean_price
from shared.normalizer import normalize_name


def created_url(name: str, id_product: int) -> str:
    product_name = clean_text(name).replace(" ", "_").replace("-", "_")
    return f"{BASE_URL}/producto/{product_name}_{id_product}"


def create_image_url(images: list[dict] | None) -> str | None:
    if not images:
        return None

    ordered_images = sorted(images, key=lambda image: image.get("orden", 9999))
    image_name = ordered_images[0].get("nombre")
    if not image_name:
        return None

    return f"https://imagenes.compragamer.com/productos/compragamer_Imganen_general_{image_name}-mini.jpg"

def build_lookup(data: list, key_field: str = "id", value_field: str = "nombre") -> dict:
    if not data:
        return {}

    return {
        item.get(key_field): item.get(value_field, "")
        for item in data
        if item.get(key_field) is not None
    }


def get_compragamer_products():
    products_data = get_json(PRODUCTS_URL)
    categorias_data = get_json(CATEGORIAS_URL)
    marcas_data = get_json(MARCAS_URL)

    if not products_data:
        return []

    categorias_map = build_lookup(categorias_data, "id", "nombre")
    marcas_map = build_lookup(marcas_data, "id", "nombre")

    products = []
    for p in products_data:
        if p.get("vendible") != 1:
            continue

        product = {
            "store": STORE_NAME,
            "id": p.get("id_producto"),
            "title": clean_text(p.get("nombre")),
            "normalized_title": normalize_name(p.get("nombre")),
            "price": clean_price(p.get("precioEspecial")),
            "price_list": clean_price(p.get("precioLista")),
            "stock": p.get("stock", 0),
            "category": categorias_map.get(p.get("id_categoria"), ""),
            "marca": marcas_map.get(p.get("id_marca"), ""),
            "url": created_url(p.get("nombre", ""), p.get("id_producto")),
            "image": create_image_url(p.get("imagenes")),
        }

        products.append(product)


    return products
