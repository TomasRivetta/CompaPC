import re
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

from shared.cleaners import clean_text, clean_price
from shared.normalizer import normalize_name
from config.urls_full_h4rd import (
    STORE_NAME,
    FULLH4RD_BASE_URL,
    FULLH4RD_AURICULARES_URL,
)

HEADERS = {
    "User-Agent": "Mozilla/5.0",
}


def extract_price(text: str | None) -> int | None:
    """
    Convierte strings tipo:
    '$57.001,37' -> 57001
    '$1.234.567,89' -> 1234567
    """
    if not text:
        return None

    match = re.search(r"\$\s*([\d\.]+),\d{2}", text)
    if not match:
        return None

    integer_part = match.group(1).replace(".", "")
    return clean_price(integer_part)


def extract_all_prices(text: str | None) -> list[int]:
    """
    Devuelve todos los precios enteros encontrados en el texto.
    Ej:
    '$57.001,37 $62.701,48' -> [57001, 62701]
    """
    if not text:
        return []

    matches = re.findall(r"\$\s*([\d\.]+),\d{2}", text)
    prices = []

    for value in matches:
        parsed = clean_price(value.replace(".", ""))
        if parsed is not None:
            prices.append(parsed)

    return prices


def extract_product_id(url: str) -> int | None:
    """
    Extrae el id desde URLs tipo:
    /prod/30581/placa-de-video...
    """
    if not url:
        return None

    match = re.search(r"/prod/(\d+)", url)
    if not match:
        return None

    return clean_price(match.group(1))


def looks_like_product(url: str, text: str) -> bool:
    """
    Filtra anchors que realmente sean productos.
    """
    if not url or "/prod/" not in url:
        return False

    if "$" not in text:
        return False

    if "comprar" not in text.lower() and "agregar" not in text.lower():
        return False

    return True

def get_product_image(product_url: str) -> str | None:
    try:
        response = requests.get(product_url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        response.encoding = "utf-8"

        soup = BeautifulSoup(response.text, "html.parser")

        # buscar imágenes que contengan "productos"
        imgs = soup.find_all("img")

        for img in imgs:
            src = img.get("src", "")

            if "productos" in src or "product" in src:
                return src

        return None

    except Exception as e:
        print(f"[IMAGE ERROR] {product_url} -> {e}")
        return None

def clean_title_from_card_text(text: str) -> str:
    """
    Toma el texto completo del card y deja solo el nombre.
    """
    if not text:
        return ""

    # cortar en el primer precio
    text = re.split(r"\$\s*[\d\.]+,\d{2}", text, maxsplit=1)[0]

    garbage_words = [
        "Comprar",
        "Agregar",
        "Sin Stock",
        "Despacho en:",
        "24hs",
    ]

    for word in garbage_words:
        text = text.replace(word, "")

    return clean_text(text)


def get_full_h4rd_products() -> list[dict]:
    products = []

    response = requests.get(
        FULLH4RD_AURICULARES_URL,
        headers=HEADERS,
        timeout=20,
    )
    response.raise_for_status()
    response.encoding = "utf-8"

    soup = BeautifulSoup(response.text, "html.parser")

    seen_ids = set()

    # Recorremos todos los enlaces y nos quedamos con los que apunten a /prod/
    for a in soup.find_all("a", href=True):
        href = a.get("href", "").strip()
        full_url = urljoin(FULLH4RD_BASE_URL, href)
        #image = get_product_image(full_url)
        
        raw_text = clean_text(a.get_text(" ", strip=True))

        if not looks_like_product(full_url, raw_text):
            continue

        external_id = extract_product_id(full_url)
        if external_id is None or external_id in seen_ids:
            continue

        seen_ids.add(external_id)

        prices = extract_all_prices(raw_text)
        price = prices[0] if len(prices) >= 1 else None
        price_list = prices[1] if len(prices) >= 2 else None

        title = clean_title_from_card_text(raw_text)

        product = {
            "store": STORE_NAME,
            "id": external_id,
            "title": title,
            "normalized_title": normalize_name(title),
            "price": price,
            "price_list": price_list,
            "stock": 0,  # en listado no queda claro el stock exacto
            "category": "auriculares",
            "marca": None,
            "url": full_url,
            "image": None,
        }

        # seguridad mínima para no guardar basura
        if product["title"] and product["url"] and product["id"] is not None:
            products.append(product)

    return products