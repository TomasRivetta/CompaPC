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
  image: string;
}
