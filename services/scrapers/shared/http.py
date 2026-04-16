import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
}


def get_json(url: str, params: dict | None = None):
    try:
        response = requests.get(url, headers=HEADERS, params=params, timeout=15)
        response.raise_for_status()
        response.encoding = "utf-8"
        return response.json()
    except Exception as e:
        print(f"[HTTP ERROR] {e}")
        return None