"use client";

import Link from "next/link";
import { useState } from "react";
import { Category } from "@/types/store";

interface SidebarFiltersProps {
  categories: Category[];
  activeCategory: string;
  onClose?: () => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  priceRange: [number, number];
  bounds: [number, number];
  onPriceChange: (value: [number, number]) => void;
  inStockOnly: boolean;
  onToggleStock: () => void;
}

export function SidebarFilters({
  categories,
  onClose,
  activeCategory,
  brands,
  selectedBrands,
  onToggleBrand,
  priceRange,
  bounds,
  onPriceChange,
  inStockOnly,
  onToggleStock,
}: SidebarFiltersProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    price: true,
    stock: true,
  });

  function toggleSection(section: "category" | "brands" | "price" | "stock") {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  }

  const range = Math.max(bounds[1] - bounds[0], 1);
  const minPercent = ((priceRange[0] - bounds[0]) / range) * 100;
  const maxPercent = ((priceRange[1] - bounds[0]) / range) * 100;

  return (
    <div className="flex flex-col gap-5">
      {/* Categorías */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14rem] text-slate-500">
            Categorías
          </span>
          <span className="material-symbols-outlined text-[18px] text-slate-400">
            {openSections.category ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.category && (
          <div className="mt-3 space-y-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <Link
                  key={category.slug}
                  href={`/categoria/${category.slug}`}
                  onClick={() => onClose?.()}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[19px] ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    {category.icon}
                  </span>

                  <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                    {category.name}
                  </span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Marcas */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("brands")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14rem] text-slate-500">
            Marcas
          </span>
          <span className="material-symbols-outlined text-[18px] text-slate-400">
            {openSections.brands ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.brands && (
          <div className="mt-3 space-y-1.5">
            {brands.length === 0 ? (
              <p className="px-1 text-sm text-slate-400">No hay marcas disponibles.</p>
            ) : (
              brands.map((brand) => {
                const checked = selectedBrands.includes(brand);

                return (
                  <label
                    key={brand}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
                      checked ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                          checked
                            ? "border-blue-600 bg-blue-600"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <span className="material-symbols-outlined text-[12px] text-white">
                            check
                          </span>
                        )}
                      </div>

                      <span className={`text-sm ${checked ? "font-semibold" : "font-medium text-slate-700"}`}>
                        {brand}
                      </span>
                    </div>

                    <input
                      checked={checked}
                      onChange={() => onToggleBrand(brand)}
                      type="checkbox"
                      className="sr-only"
                    />
                  </label>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* Presupuesto */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14rem] text-slate-500">
            Presupuesto
          </span>
          <span className="material-symbols-outlined text-[18px] text-slate-400">
            {openSections.price ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Desde
                </span>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  ${priceRange[0].toLocaleString("es-AR")}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Hasta
                </span>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  ${priceRange[1].toLocaleString("es-AR")}
                </p>
              </div>
            </div>

            <div className="relative mt-4 h-6">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-slate-200" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-blue-500"
                style={{
                  left: `${minPercent}%`,
                  width: `${Math.max(maxPercent - minPercent, 0)}%`,
                }}
              />

              <input
                type="range"
                min={bounds[0]}
                max={bounds[1]}
                value={priceRange[0]}
                onChange={(event) =>
                  onPriceChange([
                    Math.min(Number(event.target.value), priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
              />

              <input
                type="range"
                min={bounds[0]}
                max={bounds[1]}
                value={priceRange[1]}
                onChange={(event) =>
                  onPriceChange([
                    priceRange[0],
                    Math.max(Number(event.target.value), priceRange[0]),
                  ])
                }
                className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
              />
            </div>
          </div>
        )}
      </section>

      {/* Stock */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection("stock")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14rem] text-slate-500">
            Stock
          </span>
          <span className="material-symbols-outlined text-[18px] text-slate-400">
            {openSections.stock ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.stock && (
          <label
            className={`mt-3 flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors ${
              inStockOnly ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  inStockOnly ? "text-blue-600" : "text-slate-400"
                }`}
              >
                inventory_2
              </span>

              <span className={`text-sm ${inStockOnly ? "font-semibold" : "font-medium text-slate-700"}`}>
                Solo en stock
              </span>
            </div>

            <div
              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                inStockOnly
                  ? "border-blue-600 bg-blue-600"
                  : "border-slate-300 bg-white"
              }`}
            >
              {inStockOnly && (
                <span className="material-symbols-outlined text-[12px] text-white">
                  check
                </span>
              )}
            </div>

            <input
              checked={inStockOnly}
              onChange={onToggleStock}
              type="checkbox"
              className="sr-only"
            />
          </label>
        )}
      </section>
    </div>
  );
}