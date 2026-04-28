"use client";

import Link from "next/link";
import { useState } from "react";
import { groupCategories } from "@/lib/store-utils";
import { Category } from "@/types/store";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const groupedCategories = groupCategories(categories);
  const [openGroup, setOpenGroup] = useState(groupedCategories[0]?.name ?? "");

  return (
    <div className="space-y-8">
      {groupedCategories.map((group) => {
        const isOpen = openGroup === group.name;

        return (
          <section key={group.name} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenGroup((current) => (current === group.name ? "" : group.name))}
              className="flex w-full items-center justify-between gap-4 bg-white px-6 py-5 text-left transition-colors hover:bg-slate-50"
            >
              <h2 className="font-headline text-2xl font-bold tracking-tight text-slate-900">
                {group.order + 1}. {group.name}
              </h2>
              <span
                className={`material-symbols-outlined text-[24px] text-slate-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                {isOpen ? "expand_less" : "expand_more"}
              </span>
            </button>
            <div
              className={`grid overflow-hidden border-t border-slate-200 transition-all duration-300 ease-out ${
                isOpen
                  ? "max-h-[2000px] grid-rows-[1fr] opacity-100"
                  : "max-h-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div className="grid grid-cols-2 gap-px md:grid-cols-3 xl:grid-cols-5">
                {group.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="group flex min-h-[160px] flex-col items-center justify-center gap-4 bg-white p-6 text-center transition-all hover:bg-slate-50"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <span className="material-symbols-outlined text-[36px] transition-transform duration-300 group-hover:scale-110">
                        {category.icon}
                      </span>
                    </div>
                    <span className="font-headline text-lg font-bold tracking-tight text-slate-900">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
