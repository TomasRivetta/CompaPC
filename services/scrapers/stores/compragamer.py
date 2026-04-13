import requests

URL = "https://static.compragamer.com/productos"

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json"
}

def get_products():
    res = requests.get(URL, headers=headers)
    data = res.json()

    productos = []

    for p in data:
        producto = {
            "store": "compra_gamer",
            "id": p["id_producto"],
            "title": p["nombre"],
            "price": p["precioEspecial"],
            "price_list": p["precioLista"],
            "stock": p["stock"],
            "category": p["id_categoria"],
            "url": f"https://compragamer.com/producto/{p['id_producto']}"
        }

        productos.append(producto)

    return productos


if __name__ == "__main__":
    productos = get_products()
    print(len(productos))
    for p in productos[:5]:
        print(p)