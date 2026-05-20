"use client";

import type { Feature, Product } from "@/lib/types";
import { FeatureCard } from "./feature-card";

interface Props {
  product: Product;
  onFeatureClick: (feature: Feature) => void;
}

export function ProductSection({ product, onFeatureClick }: Props) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[16px] font-medium text-neutral-800 dark:text-neutral-200">
          {product.name}
        </h2>
        <span className="text-[13px] text-neutral-400 dark:text-neutral-500 tabular-nums">
          {product.features.length} {product.features.length === 1 ? "feature" : "features"}
        </span>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
        {product.features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onClick={onFeatureClick}
          />
        ))}
      </div>
    </section>
  );
}
