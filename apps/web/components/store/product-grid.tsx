import Image from "next/image";
import { Product } from "@/types/store";

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
        return (
          <article
            key={product.id}
            className="group relative flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <a
              href={product.url ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-20"
              aria-label={`Ver oferta de ${product.name}`}
            />
            {/* Badges */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-5">
              <span className="border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-800 shadow-sm backdrop-blur-sm rounded-full">
                {product.store ?? product.brand}
              </span>

              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] shadow-sm rounded-full ${
                  product.inStock
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {product.inStock ? "Disponible" : "Sin stock"}
              </span>
            </div>

            {/* Imagen */}
            <div className="relative aspect-square overflow-hidden border-b border-slate-100 bg-slate-50 grayscale-[0.2] transition-all duration-500 group-hover:grayscale-0">
              {product.image ? (
                <div className="relative h-full w-full p-3">
                  <Image
                    alt={product.name}
                    src={product.image}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white text-slate-300 transition-transform duration-700 ease-out group-hover:scale-105">
                  <span className="material-symbols-outlined text-[72px]">
                    inventory_2
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Contenido */}
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-blue-500 transition-colors">
                  storefront
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {product.brand}
                </span>
              </div>

              <h3 className="mb-4 line-clamp-2 min-h-[2.75rem] font-headline text-base font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                {product.name}
              </h3>

              <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Precio Efectivo
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black text-blue-600">$</span>
                    <span className="font-headline text-xl font-black tracking-tighter text-slate-900">
                      {product.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <a
                  href={product.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-30 mb-1 flex items-center gap-1 text-[11px] font-bold text-blue-600"
                >
                  <span>Ir a tienda</span>
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                    arrow_right_alt
                  </span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
