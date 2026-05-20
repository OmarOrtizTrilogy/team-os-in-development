import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "error" | "warn" | "neutral" | "product";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  success: "bg-[#EAF3DE] text-[#27500A] dark:bg-[#173404] dark:text-[#C0DD97]",
  error: "bg-[#FCEBEB] text-[#791F1F] dark:bg-[#501313] dark:text-[#F7C1C1]",
  warn: "bg-[#FAEEDA] text-[#633806] dark:bg-[#3D2200] dark:text-[#F5C97A]",
  neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  product: "bg-[#E6F1FB] text-[#0C447C] dark:bg-[#0C2744] dark:text-[#90C4F5]",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[12px] font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
