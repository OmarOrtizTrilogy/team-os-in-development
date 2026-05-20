"use client";

import type { Feature, FeatureStatus, FeatureType } from "@/lib/types";
import { formatARR } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ExternalLink } from "lucide-react";

interface Props {
  feature: Feature | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function FeatureDetailSheet({ feature, open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        {feature && (
          <>
            <SheetHeader>
              <SheetTitle className="pr-8 text-[18px] leading-snug">
                {feature.featureName}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Feature details for {feature.featureName}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={statusVariant[feature.status]}>{feature.status}</Badge>
                <Badge variant={typeVariant[feature.type]}>{feature.type}</Badge>
              </div>

              {/* ARR */}
              <div>
                <p className="text-[11px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-1">
                  ARR from requesting customers
                </p>
                <p className="text-[28px] font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {formatARR(feature.requestingCustomers.reduce((sum, c) => sum + c.arr, 0))}
                </p>
              </div>

              {/* Ownership */}
              <div>
                <p className="text-[11px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-1">
                  Owner
                </p>
                <p className="text-[14px] text-neutral-800 dark:text-neutral-200">
                  {feature.ownership}
                </p>
              </div>

              {/* Requesting customers */}
              <div>
                <p className="text-[11px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-2">
                  Requested by
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {feature.requestingCustomers.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[12px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Latest update */}
              {feature.latestUpdate && (
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500 mb-1">
                    Latest update
                  </p>
                  <p className="text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {feature.latestUpdate}
                  </p>
                </div>
              )}

              {/* External links */}
              {(feature.strategyDocUrl || feature.specsUrl || feature.marketingMaterialsUrl) && (
                <div className="space-y-2">
                  {feature.strategyDocUrl && (
                    <div>
                      <a
                        href={feature.strategyDocUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-[#0C447C] dark:text-[#90C4F5] hover:underline"
                      >
                        View strategy doc <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                  {feature.specsUrl && (
                    <div>
                      <a
                        href={feature.specsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-[#0C447C] dark:text-[#90C4F5] hover:underline"
                      >
                        View spec <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                  {feature.marketingMaterialsUrl && (
                    <div>
                      <a
                        href={feature.marketingMaterialsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] text-[#0C447C] dark:text-[#90C4F5] hover:underline"
                      >
                        Marketing materials <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
