"use client";

import type { InDevelopmentView } from "@/lib/types";
import { formatARR, formatDate } from "@/lib/utils/format";

interface Props {
  data: InDevelopmentView;
}

export function PageHeader({ data }: Props) {
  const totalFeatures = data.products.reduce((sum, p) => sum + p.features.length, 0);
  const totalARR = data.products.reduce(
    (sum, p) => sum + p.features.reduce((s, f) => s + f.arr, 0),
    0
  );

  return (
    <div className="mb-8">
      <p className="text-[12px] font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-1">
        Product
      </p>
      <h1 className="text-[28px] font-medium text-neutral-900 dark:text-neutral-100 mb-1">
        In Development
      </h1>
      <p className="text-[14px] text-neutral-500 dark:text-neutral-400 mb-4">
        What we&rsquo;re building now and why
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <Chip label={`${data.products.length} products`} />
        <ChipDivider />
        <Chip label={`${totalFeatures} features`} />
        <ChipDivider />
        <Chip
          label={`${formatARR(totalARR)} ARR from requesting customers`}
          mono
        />
        <ChipDivider />
        <span className="text-[12px] text-neutral-400 dark:text-neutral-500 tabular-nums">
          Updated {formatDate(data.lastUpdated, "long")}
        </span>
      </div>
    </div>
  );
}

function Chip({ label, mono }: { label: string; mono?: boolean }) {
  return (
    <span
      className={`text-[12px] text-neutral-600 dark:text-neutral-400 ${mono ? "tabular-nums" : ""}`}
    >
      {label}
    </span>
  );
}

function ChipDivider() {
  return (
    <span
      className="w-px h-3 bg-neutral-300 dark:bg-neutral-700"
      aria-hidden="true"
    />
  );
}
