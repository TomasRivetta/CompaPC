import { ApiOffer, CategorySlug } from "@/types/store";
import { inferCategorySlug, mapOfferToProduct } from "@/lib/neon-store-utils";

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

export async function getProductsByCategoryFromApi(slug: CategorySlug) {
  const offers = await getOffers();

  return offers
    .filter(
      (offer) =>
        inferCategorySlug({
          title: offer.title,
          category: offer.category,
          brand: offer.marca,
        }) === slug
    )
    .map(mapOfferToProduct)
    .filter((product) => product !== null);
}
