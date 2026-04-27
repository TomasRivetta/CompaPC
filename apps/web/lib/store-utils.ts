import { ApiOffer, Category, Product } from "@/types/store";

function normalizeCategoryName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const categoryIconMatchers: Array<{ icon: string; keywords: string[] }> = [
  { icon: "videogame_asset", keywords: ["placas de video", "geforce", "radeon", "intel arc"] },
  { icon: "memory", keywords: ["procesadores", "procesador"] },
  { icon: "developer_board", keywords: ["mother", "mothers"] },
  { icon: "memory_alt", keywords: ["memorias"] },
  { icon: "hard_drive_2", keywords: ["discos rigidos", "discos externos"] },
  { icon: "save", keywords: ["ssd"] },
  { icon: "desktop_windows", keywords: ["monitores", "pantallas"] },
  { icon: "computer", keywords: ["pc de escritorio", "equipos armados", "mini pcs"] },
  { icon: "laptop_mac", keywords: ["notebooks", "notebook", "laptops", "ultrabooks"] },
  { icon: "mouse", keywords: ["mouses", "mouse pads", "accesorios para mouse"] },
  { icon: "keyboard", keywords: ["teclados", "stream deck"] },
  { icon: "headphones", keywords: ["auriculares", "microfonos", "parlantes"] },
  { icon: "air", keywords: ["coolers", "pasta termica"] },
  { icon: "inventory_2", keywords: ["gabinetes", "modding"] },
  { icon: "bolt", keywords: ["fuentes de alimentacion"] },
  { icon: "router", keywords: ["wifi", "red", "routers", "conectividad"] },
  { icon: "battery_charging_full", keywords: ["ups", "estabilizadores"] },
  { icon: "cable", keywords: ["cables", "adaptadores", "cargadores"] },
  { icon: "devices", keywords: ["celulares", "smartwatch", "tablet"] },
  { icon: "print", keywords: ["impresoras", "insumos", "toners"] },
  { icon: "sports_esports", keywords: ["consolas", "joysticks", "playstation", "xbox", "nintendo"] },
  { icon: "chair", keywords: ["sillas", "mesas gamers"] },
  { icon: "tv", keywords: ["televisores", "tv"] },
  { icon: "smart_toy", keywords: ["robots"] },
];

export function getCategoryIcon(category: Pick<Category, "name" | "slug">) {
  const value = normalizeCategoryName(`${category.slug} ${category.name}`);

  return (
    categoryIconMatchers.find((matcher) =>
      matcher.keywords.some((keyword) => value.includes(normalizeCategoryName(keyword)))
    )?.icon ?? "category"
  );
}

export function getCategoryBySlug(categories: Category[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getBrandsForProducts(products: Product[]) {
  return [...new Set(products.map((product) => product.brand))].sort();
}

export function getPriceBounds(products: Product[]) {
  if (!products.length) {
    return [0, 0] as [number, number];
  }

  const prices = products.map((item) => item.price);
  return [Math.min(...prices), Math.max(...prices)] as [number, number];
}

export function mapOfferToProduct(offer: ApiOffer): Product | null {
  if (offer.price == null || offer.price <= 0 || !offer.category_slug) {
    return null;
  }

  return {
    id: offer.id,
    name: offer.title,
    category: offer.category_slug,
    brand: offer.marca?.trim() || offer.store,
    price: offer.price,
    inStock: offer.stock > 0,
    image: offer.image ?? undefined,
    store: offer.store,
    url: offer.url,
  };
}
