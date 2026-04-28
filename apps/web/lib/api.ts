import { getCategoryGrouping, getCategoryIcon, mapOfferToProduct } from "@/lib/store-utils";
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
    `${getApiBaseUrl()}/offers?limit=5000&canonical_category_slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos de la categoría.");
  }

  const offers = (await response.json()) as ApiOffer[];

  return offers
    .map(mapOfferToProduct)
    .filter((product): product is Product => product !== null);
}

export async function getCategories() {
  const response = await fetch(`${getApiBaseUrl()}/categories?only_with_products=true`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener las categorías desde la API.");
  }

  const categories = (await response.json()) as ApiCategory[];
  const dedupedCategories = new Map<string, Category>();

  for (const category of categories) {
    const grouping = getCategoryGrouping(category);
    const normalizedCategory = {
      id: category.id,
      store: category.store,
      externalId: category.external_id,
      slug: grouping.canonicalSlug,
      name: grouping.canonicalName,
      groupName: grouping.groupName,
      groupOrder: grouping.groupOrder,
      itemOrder: grouping.itemOrder,
      image: category.image ?? undefined,
      sortOrder: category.sort_order,
      productCount: category.product_count,
      icon: "category",
    };

    const mappedCategory = {
      ...normalizedCategory,
      icon: getCategoryIcon(normalizedCategory),
    };
    const dedupeKey = grouping.canonicalSlug;
    const existingCategory = dedupedCategories.get(dedupeKey);

    if (!existingCategory) {
      dedupedCategories.set(dedupeKey, mappedCategory);
      continue;
    }

    dedupedCategories.set(dedupeKey, {
      ...existingCategory,
      image: existingCategory.image ?? mappedCategory.image,
      productCount: (existingCategory.productCount ?? 0) + (mappedCategory.productCount ?? 0),
      groupName: existingCategory.groupOrder <= mappedCategory.groupOrder
        ? existingCategory.groupName
        : mappedCategory.groupName,
      groupOrder: Math.min(existingCategory.groupOrder, mappedCategory.groupOrder),
      itemOrder: Math.min(existingCategory.itemOrder, mappedCategory.itemOrder),
      sortOrder:
        existingCategory.sortOrder == null
          ? mappedCategory.sortOrder
          : mappedCategory.sortOrder == null
            ? existingCategory.sortOrder
            : Math.min(existingCategory.sortOrder, mappedCategory.sortOrder),
    });
  }

  return [...dedupedCategories.values()].sort(
    (left, right) =>
      left.groupOrder - right.groupOrder ||
      left.itemOrder - right.itemOrder ||
      (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER) ||
      left.name.localeCompare(right.name)
  );
}
