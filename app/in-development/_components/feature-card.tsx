"use client";

import type { Feature, FeatureStatus, FeatureType } from "@/lib/types";
import { formatARRCompact } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface Props {
  feature: Feature;
  onClick: (feature: Feature) => void;
}

const statusVariant: Record<FeatureStatus, "product" | "neutral" | "success" | "warn"> = {
  "In Progress": "product",
  "Not Started": "neutral",
  "Completed": "success",
  "Planning Done": "warn",
  "Partial": "warn",
};

const typeVariant: Record<FeatureType, "neutral" | "product"> = {
  "Commitment": "neutral",
  "Stretch Goal": "product",
};

const CHIP_LIMIT = 3;

export function FeatureCard({ feature, onClick }: Props) {
  const visibleCustomers = feature.requestingCustomers.slice(0, CHIP_LIMIT);
  const overflowCount = feature.requestingCustomers.length - CHIP_LIMIT;

  return (
    <button
      className="group relative w-full text-left rounded-2xl bg-white dark:bg-neutral-900 p-5 transition-[box-shadow,transform] duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(55%_0.18_250)] focus-visible:ring-offset-2"
      style={{ boxShadow: "var(--shadow-card)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-card-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-card)")
      }
      onClick={() => onClick(feature)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(feature);
        }
      }}
      aria-label={`View details for ${feature.featureName}`}
    >
      {/* Top row: badges + ARR + chevron */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant={statusVariant[feature.status]}>{feature.status}</Badge>
          <Badge variant={typeVariant[feature.type]}>{feature.type}</Badge>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[12px] font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
            {formatARRCompact(feature.arr)}
          </span>
          {/* Contextual chevron — enters on hover */}
          <ChevronRight
            className="h-3.5 w-3.5 text-neutral-400 opacity-0 scale-[0.25] blur-[4px] group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0 transition-[opacity,scale,filter] duration-200"
            style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Feature name */}
      <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 mb-1 leading-snug">
        {feature.featureName}
      </p>

      {/* One-line summary */}
      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
        {feature.oneLineSummary}
      </p>

      {/* Requesting customers */}
      {feature.requestingCustomers.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {visibleCustomers.map((c) => (
            <span
              key={c.name}
              className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {c.name}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500">
              +{overflowCount} more
            </span>
          )}
        </div>
      )}

      {/* Ownership */}
      <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
        Owner: {feature.ownership}
      </p>
    </button>
  );
}
