export type CategorySlug =
  | "desktop-pc"
  | "notebooks"
  | "gpu"
  | "cpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "cooling"
  | "cases"
  | "psu"
  | "monitor"
  | "peripherals"
  | "gaming-chairs"
  | "robots"
  | "connectivity"
  | "ups"
  | "consoles"
  | "cables"
  | "mobile"
  | "printers"
  | "tv"
  | "hdd"
  | "mouse"
  | "headset"
  | "ssd"
  | "keyboard";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  category: CategorySlug;
  brand: string;
  price: number;
  inStock: boolean;
  image?: string;
  store?: string;
  url?: string;
}

export interface ApiOffer {
  id: number;
  store: string;
  external_id: number;
  title: string;
  normalized_title: string;
  price: number | null;
  price_list: number | null;
  stock: number;
  category: string | null;
  marca: string | null;
  url: string;
  image: string | null;
}
