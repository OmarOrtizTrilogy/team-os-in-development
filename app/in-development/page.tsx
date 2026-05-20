"use client";

import { useState } from "react";
import type { Feature, Product } from "@/lib/types";
import { inDevelopmentData } from "@/lib/mock-data/in-development";
import { PageHeader } from "./_components/page-header";
import { FilterBar } from "./_components/filter-bar";
import { ProductSection } from "./_components/product-section";
import { FeatureDetailSheet } from "./_components/feature-detail-sheet";

const ACTIVE_STATUSES = new Set(["In Progress", "Planning Done", "Partial"]);

export default function InDevelopmentPage() {
  const data = inDevelopmentData;
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"active" | "all">("active");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const productNames = data.products.map((p) => p.name);

  const filteredProducts: Product[] = data.products
    .filter((p) => selectedProduct === "All" || p.name === selectedProduct)
    .map((p) => ({
      ...p,
      features: p.features.filter((f) =>
        statusFilter === "active" ? ACTIVE_STATUSES.has(f.status) : true
      ),
    }))
    .filter((p) => p.features.length > 0);

  function handleFeatureClick(feature: Feature) {
    setSelectedFeature(feature);
    setSheetOpen(true);
  }

  return (
    <main className="max-w-[960px] mx-auto px-6 py-10">
      <PageHeader data={data} />

      <div className="sticky top-0 z-10 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-sm -mx-6 px-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <FilterBar
          products={productNames}
          selectedProduct={selectedProduct}
          onProductChange={setSelectedProduct}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <div className="pt-8">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[14px] text-neutral-400 dark:text-neutral-500">
              No features match the current filter.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductSection
              key={product.id}
              product={product}
              onFeatureClick={handleFeatureClick}
            />
          ))
        )}
      </div>

      <FeatureDetailSheet
        feature={selectedFeature}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelectedFeature(null);
        }}
      />
    </main>
  );
}
