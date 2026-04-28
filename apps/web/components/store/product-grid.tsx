import Image from "next/image";
import { Product } from "@/types/store";

// Helper para formatear moneda
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
};

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-slate-500">
        <div className="space-y-2">
          <span className="material-symbols-outlined text-4xl text-slate-300">inventory_2</span>
          <p className="text-sm font-medium">No se encontraron productos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const productUrl = product.url ?? "#";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5">
      {/* Badges */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4">
        <span className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 backdrop-blur-sm shadow-sm">
          {product.store ?? product.brand}
        </span>

        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            product.inStock
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {product.inStock ? "Disponible" : "Sin stock"}
        </span>
      </div>

      {/* Imagen Container */}
      <a
        href={productUrl}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-square w-full overflow-hidden bg-slate-50 transition-colors group-hover:bg-white"
        aria-label={`Ver ${product.name}`}
      >
        {product.image ? (
          <div className="relative h-full w-full p-6">
            <Image
              alt={product.name}
              src={product.image}
              fill
              unoptimized={product.image.endsWith(".gif")} // Solo si usas gifs
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-200">
            <span className="material-symbols-outlined text-6xl">image_not_supported</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent" />
      </a>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1.5 text-slate-400">
          <span className="material-symbols-outlined text-base">storefront</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">{product.brand}</span>
        </div>

        <h3 className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-blue-600">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Precio Efectivo
            </span>
            <div className="text-xl font-black tracking-tight text-slate-900">
              {formatPrice(product.price)}
            </div>
          </div>

          <a
            href={productUrl}
            target="_blank"
            rel="noreferrer"
            className="relative z-20 flex items-center gap-1 text-[11px] font-bold text-blue-600 transition-transform group-hover:translate-x-1"
          >
            <span>Tienda</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </article>
  );
}
