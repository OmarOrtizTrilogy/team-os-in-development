"use client";

import { cn } from "@/lib/utils/cn";

interface Props {
  products: string[];
  selectedProduct: string;
  onProductChange: (product: string) => void;
  statusFilter: "active" | "all";
  onStatusFilterChange: (filter: "active" | "all") => void;
}

export function FilterBar({
  products,
  selectedProduct,
  onProductChange,
  statusFilter,
  onStatusFilterChange,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 flex-wrap">
      {/* Product pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {["All", ...products].map((product) => {
          const isActive = selectedProduct === product;
          return (
            <button
              key={product}
              onClick={() => onProductChange(product)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 active:scale-[0.96]",
                "transition-[color,background-color,transform]",
                isActive
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              )}
            >
              {product}
            </button>
          );
        })}
      </div>

      {/* Status toggle */}
      <div
        className="flex items-center gap-0.5 rounded-lg border border-neutral-200 p-0.5 dark:border-neutral-800"
        role="group"
        aria-label="Filter by status"
      >
        {(["active", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onStatusFilterChange(f)}
            className={cn(
              "rounded-md px-3 py-1 text-[12px] font-medium transition-colors duration-150",
              f === statusFilter
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            {f === "active" ? "Active" : "All"}
          </button>
        ))}
      </div>
    </div>
  );
}
