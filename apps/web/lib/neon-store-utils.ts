import { categories } from "@/data/store-data";
import { ApiOffer, CategorySlug, Product } from "@/types/store";

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

function normalizeCategoryName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const categoryAliases: Record<CategorySlug, string[]> = {
  "desktop-pc": ["pc de escritorio", "desktop pc", "computadoras"],
  notebooks: ["notebooks", "notebook"],
  gpu: ["placas de video", "placa de video", "gpu"],
  cpu: ["procesadores", "procesador", "cpu"],
  motherboard: ["mothers", "motherboards", "mother"],
  ram: ["memorias ram", "ram", "memorias"],
  storage: ["almacenamiento", "storage"],
  cooling: ["refrigeracion", "refrigeracion liquida", "coolers", "cooler"],
  cases: ["gabinetes", "gabinete"],
  psu: ["fuentes", "fuente"],
  monitor: ["monitores", "monitor"],
  peripherals: ["perifericos", "periferico"],
  "gaming-chairs": ["sillas gamers", "sillas gamer", "chairs"],
  robots: ["robots", "robot"],
  connectivity: ["conectividad", "redes"],
  ups: ["estabilizadores y ups", "ups", "estabilizadores"],
  consoles: ["consolas de video juego", "consolas", "consola"],
  cables: ["cables y adaptadores", "cables", "adaptadores"],
  mobile: ["celulares y smartwatch", "celulares", "smartwatch", "telefonia"],
  printers: ["impresoras e insumos", "impresoras", "insumos"],
  tv: ["televisores", "televisor", "tv"],
  hdd: ["discos rigidos", "hdd"],
  mouse: ["mouses", "mouse"],
  headset: ["auriculares", "headset"],
  ssd: ["ssd"],
  keyboard: ["teclados", "teclado", "keyboard"],
};

const titleMatchers: Array<{ slug: CategorySlug; keywords: string[] }> = [
  { slug: "gpu", keywords: ["rtx ", "gtx ", "radeon", "rx ", "placa de video", "geforce"] },
  { slug: "cpu", keywords: ["procesador", "ryzen", "core i", "core ultra", "athlon", "threadripper"] },
  { slug: "motherboard", keywords: ["mother ", "motherboard", "b650", "b760", "z790", "z890", "a620", "x670", "lga1700", "am5"] },
  { slug: "ram", keywords: ["memoria ", "ddr4", "ddr5", "sodimm"] },
  { slug: "ssd", keywords: ["ssd", "nvme", "m.2", "solid state"] },
  { slug: "hdd", keywords: ["disco rigido", "hdd", "barracuda", "wd blue"] },
  { slug: "psu", keywords: ["fuente ", "80 plus", "atx 3.0", "psu"] },
  { slug: "cases", keywords: ["gabinete", "case ", "mid tower", "mini itx"] },
  { slug: "cooling", keywords: ["cooler", "water cooler", "liquid cooler", "refrigeracion", "ventilador"] },
  { slug: "monitor", keywords: ["monitor", "ultragear", "odyssey", "144hz", "240hz", "ips ", "curvo"] },
  { slug: "notebooks", keywords: ["notebook", "laptop", "macbook"] },
  { slug: "mouse", keywords: ["mouse ", "mousepad", "superlight", "deathadder", "viper "] },
  { slug: "keyboard", keywords: ["teclado", "keyboard", "switch ", "keychron"] },
  { slug: "headset", keywords: ["auricular", "headset", "kraken", "cloud iii", "g733"] },
  { slug: "connectivity", keywords: ["wifi", "wi-fi", "bluetooth", "placa de red", "router", "adaptador usb", "pcie wifi"] },
  { slug: "mobile", keywords: ["celular", "smartphone", "smartwatch", "iphone", "samsung a", "funda celular"] },
  { slug: "printers", keywords: ["impresora", "multifuncion", "toner"] },
  { slug: "gaming-chairs", keywords: ["silla gamer", "nitro concepts", "dxracer"] },
  { slug: "robots", keywords: ["robot", "robosen"] },
  { slug: "consoles", keywords: ["playstation", "xbox", "nintendo switch", "ps5"] },
  { slug: "cables", keywords: ["cable ", "displayport", "hdmi", "adaptador"] },
  { slug: "peripherals", keywords: ["stream deck", "webcam", "microfono"] },
  { slug: "storage", keywords: ["almacenamiento", "pendrive", "memoria micro sd", "sd card"] },
  { slug: "ups", keywords: ["ups", "estabilizador"] },
  { slug: "tv", keywords: ["televisor", "smart tv", "android tv"] },
  { slug: "desktop-pc", keywords: ["pc armada", "armado de pc", "desktop"] },
];

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
  if (offer.price == null || offer.price <= 0) {
    return null;
  }

  const category = inferCategorySlug({
    title: offer.title,
    category: offer.category,
    brand: offer.marca,
  });
  if (!category) {
    return null;
  }

  return {
    id: offer.id,
    name: offer.title,
    category,
    brand: offer.marca?.trim() || offer.store,
    price: offer.price,
    inStock: offer.stock > 0,
    image: offer.image ?? undefined,
    store: offer.store,
    url: offer.url,
  };
}

export function inferCategorySlug(input: {
  title?: string | null;
  category?: string | null;
  brand?: string | null;
}) {
  const normalizedTitle = normalizeCategoryName(
    `${input.title ?? ""} ${input.brand ?? ""}`
  );

  for (const matcher of titleMatchers) {
    if (
      matcher.keywords.some((keyword) =>
        normalizedTitle.includes(normalizeCategoryName(keyword))
      )
    ) {
      return matcher.slug;
    }
  }

  if (!input.category) {
    return null;
  }

  const normalized = normalizeCategoryName(input.category);

  return (
    (Object.entries(categoryAliases).find(([, aliases]) =>
      aliases.some((alias) => normalized.includes(normalizeCategoryName(alias)))
    )?.[0] as CategorySlug | undefined) ?? null
  );
}
