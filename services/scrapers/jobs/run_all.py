from stores.compra_gamer import get_compragamer_catalog
from shared.persistence import save_products
from stores.full_h4rd import get_full_h4rd_products

def run():
    all_categories = []
    all_products = []

    print("Scraping Compra Gamer...")
    compra_gamer_products, compra_gamer_categories = get_compragamer_catalog()
    all_products.extend(compra_gamer_products)
    all_categories.extend(compra_gamer_categories)

    print("Scraping FullH4rd...")
    all_products.extend(get_full_h4rd_products())


    print(f"Total general: {len(all_products)}")

    if not all_products:
        print("No se obtuvieron productos para persistir.")
        return

    #print(all_products[0])
    #for product in all_products [:10]:  # Mostrar solo los primeros 10 productos para evitar saturar la salida
        #print(f"{product['store']} - {product['title']} - {product['price']}")
        

    save_products(all_products, categories=all_categories)
    print("Scraping persistido en la base de datos.")

if __name__ == "__main__":
    run()
