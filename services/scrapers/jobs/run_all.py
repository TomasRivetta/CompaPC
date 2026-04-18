from stores.compra_gamer import get_compragamer_products
from shared.persistence import save_products


def run():
    all_products = []

    print("Scraping Compra Gamer...")
    all_products.extend(get_compragamer_products())

    #print("Scraping Maximus...")
    #all_products.extend(get_maximus_products())

    print(f"Total general: {len(all_products)}")

    if not all_products:
        print("No se obtuvieron productos para persistir.")
        return

    save_products(all_products)
    print("Scraping persistido en la base de datos.")

if __name__ == "__main__":
    run()
