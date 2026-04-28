import { ApiOffer, Category, GroupedCategory, Product } from "@/types/store";

function normalizeCategoryName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

const categoryGroups = [
  {
    name: "Componentes de PC",
    items: [
      { name: "Procesadores AMD", keywords: ["procesadores amd", "ryzen"] },
      { name: "Procesadores Intel", keywords: ["procesadores intel", "core i", "intel cpu"] },
      { name: "Mothers AMD", keywords: ["mothers amd", "mother amd"] },
      { name: "Mothers Intel", keywords: ["mothers intel", "mother intel"] },
      { name: "Memorias", keywords: ["memorias", "ram", "ddr4", "ddr5"] },
      { name: "Placas de Video GeForce", keywords: ["placas de video geforce", "geforce", "rtx", "gtx"] },
      { name: "Placas de Video Radeon AMD", keywords: ["placas de video radeon amd", "radeon amd", "radeon"] },
      { name: "Placas de Video Intel ARC", keywords: ["placas de video intel arc", "intel arc", "arc"] },
      { name: "Discos Solidos SSD", keywords: ["ssd", "discos solidos ssd", "nvme", "m.2"] },
      { name: "Discos Externos", keywords: ["discos externos", "disco externo"] },
      { name: "Fuentes de alimentacion", keywords: ["fuentes de alimentacion", "fuente", "psu"] },
      { name: "Gabinetes", keywords: ["gabinetes", "gabinete"] },
      { name: "Coolers CPU", keywords: ["coolers cpu", "cpu cooler"] },
      { name: "Coolers Fan", keywords: ["coolers fan", "fans", "fan"] },
      { name: "Pasta Termica", keywords: ["pasta termica"] },
    ],
  },
  {
    name: "Perifericos",
    items: [
      { name: "Teclados", keywords: ["teclados", "teclado usb"] },
      { name: "Mouses", keywords: ["mouses", "mouse gamer", "mouse inalambrico", "mouse optico usb"] },
      { name: "Mouse Pads", keywords: ["mouse pads", "mouse pad"] },
      { name: "Auriculares", keywords: ["auriculares"] },
      { name: "Microfonos", keywords: ["microfonos", "microfono"] },
      { name: "Webcam", keywords: ["webcam"] },
      { name: "Joysticks", keywords: ["joysticks"] },
      { name: "Stream Deck", keywords: ["stream deck"] },
      { name: "Parlantes", keywords: ["parlantes", "parlantes 2.0", "parlantes portatiles"] },
      { name: "Teclado y mouse", keywords: ["teclado y mouse"] },
    ],
  },
  {
    name: "Equipos",
    items: [
      { name: "Notebooks", keywords: ["notebooks", "notebook", "laptops", "ultrabooks"] },
      { name: "PC de Escritorio", keywords: ["pc de escritorio", "equipos armados", "mini pcs", "armados"] },
      { name: "Consolas", keywords: ["consolas"] },
    ],
  },
  {
    name: "Accesorios y Conectividad",
    items: [
      { name: "Cables y adaptadores", keywords: ["cables", "adaptadores"] },
      { name: "Routers WiFi", keywords: ["routers", "wifi", "conectividad", "red", "router hogar", "access point", "antenas"] },
      { name: "Kits de actualizacion", keywords: ["kits de actualizacion"] },
      {
        name: "Combos de Teclados, Mouses y otros",
        keywords: ["combos de teclados", "combos de mouses", "combos", "teclado y mouse"],
      },
    ],
  },
  {
    name: "Modding y Extras",
    items: [
      {
        name: "Modding | Cables, Iluminacion y otros",
        keywords: ["modding", "iluminacion"],
      },
      { name: "Estabilizadores", keywords: ["estabilizadores"] },
      { name: "UPS", keywords: ["ups"] },
      { name: "Volantes - Simuladores de manejo", keywords: ["volantes", "simuladores de manejo"] },
    ],
  },
  {
    name: "Gaming y Setup",
    items: [{ name: "Sillas Gamers", keywords: ["sillas", "sillas gamers"] }],
  },
  {
    name: "Otros",
    items: [
      { name: "Monitores", keywords: ["monitores y pantallas", "monitores", "pantallas"] },
      { name: "Televisores", keywords: ["televisores", "tv"] },
      { name: "Proyectores", keywords: ["proyectores"] },
      { name: "Capturadoras y sintonizadoras de TV", keywords: ["capturadoras", "sintonizadoras de tv"] },
      { name: "Impresoras y Multifunciones", keywords: ["impresoras", "impresoras laser", "impresoras multifuncion", "impresoras y multifunciones"] },
      { name: "Plotter", keywords: ["plotter"] },
      { name: "Escaner", keywords: ["escaner", "scanner"] },
      { name: "Toners", keywords: ["toners", "toner"] },
      { name: "Accesorios de celulares", keywords: ["celulares", "smartwatch", "tablet"] },
      { name: "Robots", keywords: ["robots"] },
      { name: "General", keywords: ["general"] },
      { name: "Sin identificar", keywords: ["sin identificar"] },
    ],
  },
] as const;

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

export function getCategoryGrouping(category: Pick<Category, "name" | "slug">) {
  const value = normalizeCategoryName(`${category.slug} ${category.name}`);

  for (const [groupIndex, group] of categoryGroups.entries()) {
    for (const [itemIndex, item] of group.items.entries()) {
      if (item.keywords.some((keyword) => value.includes(normalizeCategoryName(keyword)))) {
        return {
          canonicalName: item.name,
          canonicalSlug: slugifyCategoryName(item.name),
          groupName: group.name,
          groupOrder: groupIndex,
          itemOrder: itemIndex,
        };
      }
    }
  }

  return {
    canonicalName: category.name,
    canonicalSlug: slugifyCategoryName(category.name),
    groupName: "Otros",
    groupOrder: categoryGroups.length - 1,
    itemOrder: categoryGroups[categoryGroups.length - 1].items.length,
  };
}

export function slugifyCategoryName(value: string) {
  return normalizeCategoryName(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function groupCategories(categories: Category[]) {
  const groups = new Map<string, { name: string; order: number; categories: GroupedCategory[] }>();

  const categoriesWithFallbackGrouping: GroupedCategory[] = categories.map((category) => {
    if (
      category.groupName != null &&
      category.groupOrder != null &&
      category.itemOrder != null
    ) {
      return category as GroupedCategory;
    }

    const grouping = getCategoryGrouping(category);
    return {
      ...category,
      groupName: grouping.groupName,
      groupOrder: grouping.groupOrder,
      itemOrder: grouping.itemOrder,
    };
  });

  for (const category of categoriesWithFallbackGrouping) {
    const existingGroup = groups.get(category.groupName);
    if (existingGroup) {
      existingGroup.categories.push(category);
      continue;
    }

    groups.set(category.groupName, {
      name: category.groupName,
      order: category.groupOrder,
      categories: [category],
    });
  }

  return [...groups.values()]
    .sort((left, right) => left.order - right.order || left.name.localeCompare(right.name))
    .map((group) => ({
      ...group,
      categories: [...group.categories].sort(
        (left, right) =>
          left.itemOrder - right.itemOrder ||
          (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
          left.name.localeCompare(right.name)
      ),
    }));
}

export function getCategoryBySlug(categories: Category[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCanonicalCategory(category: { name?: string | null; slug?: string | null }) {
  const grouping = getCategoryGrouping({
    name: category.name ?? category.slug ?? "Sin identificar",
    slug: category.slug ?? category.name ?? "sin-identificar",
  });

  return {
    name: grouping.canonicalName,
    slug: grouping.canonicalSlug,
  };
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
  if (offer.price == null || offer.price <= 0) {
    return null;
  }

  const canonicalCategory = getCanonicalCategory({
    name: offer.category_name,
    slug: offer.category_slug,
  });

  return {
    id: offer.id,
    name: offer.title,
    category: canonicalCategory.slug,
    brand: offer.marca?.trim() || offer.store,
    price: offer.price,
    inStock: offer.stock > 0,
    image: offer.image ?? undefined,
    store: offer.store,
    url: offer.url,
  };
}
