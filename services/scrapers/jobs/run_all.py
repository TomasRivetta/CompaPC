from stores.compra_gamer import get_compragamer_products


def run():
    all_products = []

    print("Scraping Compra Gamer...")
    all_products.extend(get_compragamer_products())

    #print("Scraping Maximus...")
    #all_products.extend(get_maximus_products())

    print(f"Total general: {len(all_products)}")

    for p in all_products[:10]:
        print(p)

if __name__ == "__main__":
    run()