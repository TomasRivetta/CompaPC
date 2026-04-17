import Link from "next/link";
import { Product } from "@/types/store";
import { getCategoryBySlug } from "@/lib/neon-store-utils";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => {
        const category = getCategoryBySlug(product.category);

        return (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            {/* Badges */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5">
              <span className="border border-slate-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm">
                {product.brand}
              </span>

              <span
                className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] shadow-sm ${
                  product.inStock
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {product.inStock ? "Disponible" : "Sin stock"}
              </span>
            </div>

            {/* Imagen */}
            <div className="relative aspect-square overflow-hidden border-b border-slate-100 bg-slate-50 px-6 pt-14 pb-6">
              <img
                alt={product.name}
                src={product.image}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-6 pb-5">
              {/* Tienda */}
              <div className="mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  storefront
                </span>

                <span className="text-[11px] font-medium text-slate-500">
                  {product.brand}
                </span>
              </div>

              {/* Nombre */}
              <h3 className="min-h-[3.2rem] text-[1rem] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                {product.name}
              </h3>

              {/* Footer */}
              <div className="mt-auto pt-6 pb-1">
                <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                  {/* Precio */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Precio final
                    </span>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm font-bold text-blue-600">$</span>
                      <span className="font-headline text-2xl font-bold tracking-tight text-slate-900">
                        {product.price.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  {/* CTA tipo link */}
                  <Link
                    href={`/producto/${product.id}`}
                    aria-label={`Visitar la página de ${product.name}`}
                    className="group/link mb-1 inline-flex items-center text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-blue-600"
                  >
                    Visitar la página
                    <span className="ml-1 transition-transform duration-200 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}