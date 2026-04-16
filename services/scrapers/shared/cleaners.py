def clean_text(text: str | None) -> str:
    if not text:
        return ""
    return " ".join(text.strip().split())


def clean_price(price):
    if price is None:
        return None
    try:
        return int(price)
    except (ValueError, TypeError):
        return None