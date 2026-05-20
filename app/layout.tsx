import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "In Development",
  description: "What we're building now and why",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
