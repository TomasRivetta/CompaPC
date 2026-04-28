"use client";

import Link from "next/link";
import { useState } from "react";
import { groupCategories } from "@/lib/store-utils";
import { Category } from "@/types/store";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const groupedCategories = groupCategories(categories);
  const [openGroup, setOpenGroup] = useState(groupedCategories[0]?.name ?? "");

  return (
    <div className="space-y-6 sm:space-y-8">
      {groupedCategories.map((group) => {
        const isOpen = openGroup === group.name;

        return (
          <section key={group.name} className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenGroup((current) => (current === group.name ? "" : group.name))}
              className="flex w-full items-center justify-between gap-3 bg-white px-3.5 py-3.5 text-left transition-colors hover:bg-slate-50 sm:px-6 sm:py-5"
            >
              <h2 className="font-headline text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">
                {group.order + 1}. {group.name}
              </h2>
              <span
                className={`material-symbols-outlined text-[22px] text-slate-400 transition-transform duration-300 sm:text-[24px] ${
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
                <div className="grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                {group.categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="group flex min-h-[116px] flex-col items-center justify-center gap-2.5 bg-white p-3.5 text-center transition-all hover:bg-slate-50 sm:min-h-[160px] sm:gap-4 sm:p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white sm:h-16 sm:w-16">
                      <span className="material-symbols-outlined text-[26px] transition-transform duration-300 group-hover:scale-110 sm:text-[36px]">
                        {category.icon}
                      </span>
                    </div>
                    <span className="font-headline text-[15px] font-bold tracking-tight text-slate-900 sm:text-lg">
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
