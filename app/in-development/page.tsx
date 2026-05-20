"use client";

import { useState } from "react";
import type { Feature } from "@/lib/types";
import { inDevelopmentData } from "@/lib/mock-data/in-development";
import { PageHeader } from "./_components/page-header";
import { FilterBar } from "./_components/filter-bar";
import { ProductSection } from "./_components/product-section";
import { FeatureDetailSheet } from "./_components/feature-detail-sheet";

export default function InDevelopmentPage() {
  const data = inDevelopmentData;
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const productNames = data.products.map((p) => p.name);

  const filteredProducts = data.products.filter(
    (p) => selectedProduct === "All" || p.name === selectedProduct
  );

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
        />
      </div>

      <div className="pt-8">
        {filteredProducts.map((product) => (
          <ProductSection
            key={product.id}
            product={product}
            onFeatureClick={handleFeatureClick}
          />
        ))}
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
