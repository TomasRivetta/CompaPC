import json
import re
from functools import lru_cache
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

from config.urls_full_h4rd import (
    FULLH4RD_BASE_URL,
    FULLH4RD_PERIFERICOS_URL,
    STORE_NAME,
)
from shared.cleaners import clean_price, clean_text
from shared.normalizer import normalize_name

HEADERS = {
    "User-Agent": "Mozilla/5.0",
}

TITLE_CATEGORY_RULES: list[tuple[str, list[str]]] = [
    ("webcam", ["webcam"]),
    ("microfonos", ["microfono", "microfonos"]),
    ("auriculares", ["auricular", "auriculares", "headset", "headphone"]),
    ("teclados", ["teclado", "keyboard"]),
    ("mouses", ["mouse", "mice"]),
    ("mouse pads", ["mouse pad", "pad mouse"]),
    ("joysticks", ["joystick", "gamepad"]),
    ("stream deck", ["stream deck"]),
    ("monitores", ["monitor"]),
    ("notebooks", ["notebook", "laptop"]),
    ("memorias", ["memoria ddr", "ddr4", "ddr5", "ram"]),
    ("procesadores", ["ryzen", "core i", "procesador", "cpu"]),
    ("placas de video", ["geforce", "rtx", "gtx", "radeon", "intel arc"]),
    ("ssd", ["ssd", "nvme", "m.2"]),
    ("discos externos", ["disco externo"]),
    ("gabinetes", ["gabinete"]),
    ("fuentes de alimentacion", ["fuente", "psu"]),
    ("coolers", ["cooler", "fan"]),
]


def extract_all_prices(text: str | None) -> list[int]:
    if not text:
        return []

    matches = re.findall(r"\$\s*([\d\.]+),\d{2}", text)
    prices: list[int] = []

    for value in matches:
        parsed = clean_price(value.replace(".", ""))
        if parsed is not None:
            prices.append(parsed)

    return prices


def extract_product_id(url: str) -> int | None:
    if not url:
        return None

    match = re.search(r"/prod/(\d+)", url)
    if not match:
        return None

    return clean_price(match.group(1))


def slugify_title(value: str) -> str:
    normalized = normalize_name(value or "")
    return normalized.replace(" ", "-")


def build_product_url(external_id: int, title: str, fallback_url: str | None = None) -> str:
    if fallback_url and "/prod/" in fallback_url:
        return urljoin(FULLH4RD_BASE_URL, fallback_url)

    return f"{FULLH4RD_BASE_URL}/prod/{external_id}/{slugify_title(title)}"


def looks_like_product(url: str, text: str) -> bool:
    if not url or "/prod/" not in url:
        return False

    if "$" not in text:
        return False

    if "comprar" not in text.lower() and "agregar" not in text.lower():
        return False

    return True


def clean_title_from_card_text(text: str) -> str:
    if not text:
        return ""

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


def infer_category_from_title(title: str) -> str:
    normalized_title = normalize_name(title or "")

    for category, keywords in TITLE_CATEGORY_RULES:
        if any(keyword in normalized_title for keyword in keywords):
            return category

    return "sin identificar"


def parse_ld_json_product(soup: BeautifulSoup) -> dict:
    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        raw_json = script.string or script.get_text(strip=True)
        if not raw_json:
            continue

        try:
            parsed = json.loads(raw_json)
        except json.JSONDecodeError:
            continue

        if isinstance(parsed, dict) and parsed.get("@type") == "Product":
            return parsed

    return {}


def extract_web_stock(soup: BeautifulSoup) -> int:
    stock_container = soup.select_one(".stock-container")
    if not stock_container:
        return 0

    virtual_stock = stock_container.find(string=re.compile(r"stock .* web", re.IGNORECASE))
    if not virtual_stock:
        return 0

    stock_block = virtual_stock.find_parent("div")
    if not stock_block:
        return 0

    classes = stock_block.get("class", [])
    if "available" in classes:
        return 1
    if "no-stock" in classes:
        return 0

    stock_text = clean_text(stock_block.get_text(" ", strip=True)).lower()
    return 0 if "sin stock" in stock_text else 1


@lru_cache(maxsize=2048)
def get_product_details(product_url: str, title_hint: str) -> dict:
    details = {
        "category": infer_category_from_title(title_hint),
        "stock": 0,
        "marca": None,
        "image": None,
    }

    try:
        response = requests.get(product_url, headers=HEADERS, timeout=20)
        response.raise_for_status()
        response.encoding = "utf-8"
    except Exception as error:
        print(f"[FULLH4RD DETAIL ERROR] {product_url} -> {error}")
        return details

    soup = BeautifulSoup(response.text, "html.parser")
    product_data = parse_ld_json_product(soup)

    category = clean_text(product_data.get("category"))
    if category:
        details["category"] = category

    brand = product_data.get("brand")
    if isinstance(brand, dict):
        brand = brand.get("name")
    details["marca"] = clean_text(brand)

    image = product_data.get("image")
    if isinstance(image, list):
        image = image[0] if image else None
    if image:
        details["image"] = urljoin(FULLH4RD_BASE_URL, image)

    details["stock"] = extract_web_stock(soup)
    return details


def get_full_h4rd_products() -> list[dict]:
    products = []

    response = requests.get(
        FULLH4RD_PERIFERICOS_URL,
        headers=HEADERS,
        timeout=20,
    )
    response.raise_for_status()
    response.encoding = "utf-8"

    soup = BeautifulSoup(response.text, "html.parser")
    seen_ids: set[int] = set()

    for anchor in soup.find_all("a", href=True):
        href = anchor.get("href", "").strip()
        full_url = urljoin(FULLH4RD_BASE_URL, href)
        raw_text = clean_text(anchor.get_text(" ", strip=True))

        if not looks_like_product(full_url, raw_text):
            continue

        external_id = extract_product_id(full_url)
        if external_id is None or external_id in seen_ids:
            continue

        prices = extract_all_prices(raw_text)
        price = prices[0] if len(prices) >= 1 else None
        price_list = prices[1] if len(prices) >= 2 else None
        title = clean_title_from_card_text(raw_text)
        if not title:
            continue

        product_url = build_product_url(external_id, title, full_url)
        details = get_product_details(product_url, title)

        product = {
            "store": STORE_NAME,
            "id": external_id,
            "title": title,
            "normalized_title": normalize_name(title),
            "price": price,
            "price_list": price_list,
            "stock": details["stock"],
            "category": details["category"],
            "marca": details["marca"],
            "url": product_url,
            "image": details["image"],
        }

        seen_ids.add(external_id)
        products.append(product)

    return products
