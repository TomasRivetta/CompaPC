import { getCategoryIcon, mapOfferToProduct } from "@/lib/store-utils";
import { ApiCategory, ApiOffer, Category, Product } from "@/types/store";

const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const internalApiUrl = process.env.INTERNAL_API_URL ?? publicApiUrl;

export function getApiBaseUrl() {
  return typeof window === "undefined" ? internalApiUrl : publicApiUrl;
}

export async function getApiHealth() {
  try {
    const response = await fetch(`${getApiBaseUrl()}/health`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false };
    }

    const data = (await response.json()) as { status?: string };
    return { ok: data.status === "ok" };
  } catch {
    return { ok: false };
  }
}

export async function getOffers(limit = 500) {
  const response = await fetch(`${getApiBaseUrl()}/offers?limit=${limit}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las ofertas desde la API.");
  }

  return (await response.json()) as ApiOffer[];
}

export async function getProductsByCategoryFromApi(slug: string) {
  const response = await fetch(
    `${getApiBaseUrl()}/offers?limit=500&category_slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos de la categoría.");
  }

  const offers = (await response.json()) as ApiOffer[];

  return offers.map(mapOfferToProduct).filter((product): product is Product => product !== null);
}

export async function getCategories() {
  const response = await fetch(`${getApiBaseUrl()}/categories?only_with_products=true`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las categorías desde la API.");
  }

  const categories = (await response.json()) as ApiCategory[];
  return categories.map<Category>((category) => {
    const normalizedCategory = {
      id: category.id,
      store: category.store,
      externalId: category.external_id,
      slug: category.slug,
      name: category.name,
      image: category.image ?? undefined,
      sortOrder: category.sort_order,
      productCount: category.product_count,
      icon: "category",
    };

    return {
      ...normalizedCategory,
      icon: getCategoryIcon(normalizedCategory),
    };
  });
}
