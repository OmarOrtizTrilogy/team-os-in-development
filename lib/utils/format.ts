export function formatARR(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function formatARRCompact(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "$" + (n / 1_000).toFixed(0) + "K";
  return "$" + n;
}

export function formatDate(iso: string, style: "short" | "long" = "short"): string {
  const date = new Date(iso + "T00:00:00");
  if (style === "short") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
