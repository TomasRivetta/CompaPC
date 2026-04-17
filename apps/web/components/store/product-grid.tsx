import Link from "next/link";
import { Product } from "@/types/store";
import { getCategoryBySlug } from "@/lib/neon-store-utils";

export function ProductGrid({ products }: { products: Product[] }) {
  // Estado vacío
  if (products.length === 0) {
    return (
      <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => {
        const category = getCategoryBySlug(product.category);

        return (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
          >
            {/* Badges */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
              <span className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm backdrop-blur-md">
                {product.brand}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md ${
                  product.inStock
                    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                    : "border border-rose-500/20 bg-rose-500/10 text-rose-600"
                }`}
              >
                {product.inStock ? "Disponible" : "Sin stock"}
              </span>
            </div>

            {/* Imagen */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
              <img
                alt={product.name}
                src={product.image}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-6 pt-5 pb-4">
              {/* Categoría */}
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <span className="material-symbols-outlined text-[14px]">
                    {category?.icon ?? "inventory_2"}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  {category?.name ?? "Categoría"}
                </span>
              </div>

              {/* Nombre */}
              <h3 className="mb-4 line-clamp-2 min-h-[2.8rem] font-headline text-[1.1rem] font-bold leading-tight tracking-tight text-slate-800 transition-colors group-hover:text-blue-600">
                {product.name}
              </h3>

              {/* Footer */}
              <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100/80 pt-4">
                {/* Precio */}
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Precio final
                  </span>

                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-blue-600">$</span>

                    <span className="font-headline text-2xl font-black tracking-tighter text-slate-900">
                      {product.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                {/* Botón corregido */}
                <Link
                  href={`/producto/${product.id}`}
                  aria-label={`Ver más sobre ${product.name}`}
                  className="group/btn flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-white transition-all duration-300 hover:bg-blue-600 shadow-lg shadow-slate-200"
                >
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover/btn:translate-x-1">
                    arrow_forward
                  </span>

                  <span className="text-xs font-bold opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100">
                    Ver más
                  </span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}