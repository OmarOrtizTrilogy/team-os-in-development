"use client";

import { cn } from "@/lib/utils/cn";

interface Props {
  products: string[];
  selectedProduct: string;
  onProductChange: (product: string) => void;
}

export function FilterBar({ products, selectedProduct, onProductChange }: Props) {
  return (
    <div className="flex items-center gap-1.5 py-3 flex-wrap">
      {["All", ...products].map((product) => {
        const isActive = selectedProduct === product;
        return (
          <button
            key={product}
            onClick={() => onProductChange(product)}
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-medium transition-[color,background-color,transform] duration-150 active:scale-[0.96]",
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
  );
}
