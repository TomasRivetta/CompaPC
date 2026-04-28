"use client";

import Link from "next/link";
import { useState } from "react";
import { groupCategories } from "@/lib/store-utils";
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
  const groupedCategories = groupCategories(categories);
  const defaultOpenGroup =
    groupedCategories.find((group) =>
      group.categories.some((category) => category.slug === activeCategory)
    )?.name ??
    groupedCategories[0]?.name ??
    null;
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    price: true,
    stock: true,
  });
  const [openCategoryGroup, setOpenCategoryGroup] = useState<string | null>(defaultOpenGroup);

  function toggleSection(section: "category" | "brands" | "price" | "stock") {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  }

  const range = Math.max(bounds[1] - bounds[0], 1);
  const minPercent = ((priceRange[0] - bounds[0]) / range) * 100;
  const maxPercent = ((priceRange[1] - bounds[0]) / range) * 100;

  const sectionClass =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
  const sectionButtonClass =
    "flex w-full items-center justify-between gap-3 text-left";
  const sectionTitleClass =
    "text-[11px] font-semibold uppercase tracking-[0.16rem] text-slate-500";

  return (
    <aside className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      {/* Categorías */}
      <section className={sectionClass}>
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className={sectionButtonClass}
        >
          <span className={sectionTitleClass}>Categorías</span>
          <span className="material-symbols-outlined text-[20px] text-slate-400">
            {openSections.category ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.category && (
          <div className="mt-4 space-y-5">
            {groupedCategories.map((group) => (
              <div key={group.name} className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    setOpenCategoryGroup((current) => (current === group.name ? null : group.name))
                  }
                  className="flex w-full items-center justify-between gap-3 px-1 text-left transition-colors hover:text-slate-600"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14rem] text-slate-400">
                    {group.order + 1}. {group.name}
                  </p>
                  <span
                    className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform duration-300 ${
                      openCategoryGroup === group.name ? "rotate-180" : ""
                    }`}
                  >
                    {openCategoryGroup === group.name ? "expand_less" : "expand_more"}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    openCategoryGroup === group.name
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    {group.categories.map((category) => {
                      const isActive = activeCategory === category.slug;

                      return (
                      <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        onClick={() => onClose?.()}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                          isActive
                            ? "border border-blue-100 bg-blue-50 text-blue-700 shadow-sm"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            isActive ? "text-blue-600" : "text-slate-400"
                          }`}
                        >
                          {category.icon}
                        </span>

                        <span
                          className={`text-sm ${
                            isActive ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {category.name}
                        </span>

                        {isActive && (
                          <span className="ml-auto h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </Link>
                      );
                    })
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Marcas */}
      <section className={sectionClass}>
        <button
          type="button"
          onClick={() => toggleSection("brands")}
          className={sectionButtonClass}
        >
          <span className={sectionTitleClass}>Marcas</span>
          <span className="material-symbols-outlined text-[20px] text-slate-400">
            {openSections.brands ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.brands && (
          <div className="mt-4 space-y-2">
            {brands.length === 0 ? (
              <p className="px-1 text-sm text-slate-400">
                No hay marcas disponibles.
              </p>
            ) : (
              brands.map((brand) => {
                const checked = selectedBrands.includes(brand);

                return (
                  <label
                    key={brand}
                    className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-all ${
                      checked
                        ? "border border-blue-100 bg-blue-50 text-blue-700 shadow-sm"
                        : "border border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                          checked
                            ? "border-blue-600 bg-blue-600"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <span className="material-symbols-outlined text-[13px] text-white">
                            check
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-sm ${
                          checked
                            ? "font-semibold"
                            : "font-medium text-slate-700"
                        }`}
                      >
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
      <section className={sectionClass}>
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className={sectionButtonClass}
        >
          <span className={sectionTitleClass}>Presupuesto</span>
          <span className="material-symbols-outlined text-[20px] text-slate-400">
            {openSections.price ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Desde
                </span>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  ${priceRange[0].toLocaleString("es-AR")}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Hasta
                </span>
                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  ${priceRange[1].toLocaleString("es-AR")}
                </p>
              </div>
            </div>

            <div className="relative mt-5 h-7">
              <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue-500"
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
                className="pointer-events-none absolute left-0 top-0 h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
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
                className="pointer-events-none absolute left-0 top-0 h-7 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
              />
            </div>
          </div>
        )}
      </section>

      {/* Stock */}
      <section className={sectionClass}>
        <button
          type="button"
          onClick={() => toggleSection("stock")}
          className={sectionButtonClass}
        >
          <span className={sectionTitleClass}>Stock</span>
          <span className="material-symbols-outlined text-[20px] text-slate-400">
            {openSections.stock ? "expand_less" : "expand_more"}
          </span>
        </button>

        {openSections.stock && (
          <label
            className={`mt-4 flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-all ${
              inStockOnly
                ? "border border-blue-100 bg-blue-50 text-blue-700 shadow-sm"
                : "border border-transparent hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`material-symbols-outlined text-[19px] ${
                  inStockOnly ? "text-blue-600" : "text-slate-400"
                }`}
              >
                inventory_2
              </span>

              <span
                className={`text-sm ${
                  inStockOnly ? "font-semibold" : "font-medium text-slate-700"
                }`}
              >
                Solo en stock
              </span>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                inStockOnly
                  ? "border-blue-600 bg-blue-600"
                  : "border-slate-300 bg-white"
              }`}
            >
              {inStockOnly && (
                <span className="material-symbols-outlined text-[13px] text-white">
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
    </aside>
  );
}
