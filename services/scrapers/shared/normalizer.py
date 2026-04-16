def normalize_name(name: str | None) -> str:
    if not name:
        return ""

    text = name.lower().strip()

    replacements = [
        ("geforce", ""),
        ("radeon", ""),
        ("procesador", ""),
        ("placa de video", ""),
        ("memoria ram", "ram"),
    ]

    for old, new in replacements:
        text = text.replace(old, new)

    return " ".join(text.split())