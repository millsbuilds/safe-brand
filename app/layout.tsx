import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  const isHSN = host.includes("healthsciencenutritionals");

  return {
    title: isHSN
      ? "Health Science Nutritionals, PBC — Physician-Formulated Nutrition"
      : "Safe™ — Precision Mineral Nutrition by Health Science Nutritionals, PBC",
    description: isHSN
      ? "Health Science Nutritionals, PBC develops physician-formulated, clinical-grade mineral nutrition products. A science-first public benefit corporation."
      : "The only seasoning engineered for your Na:K protocol. Precision nutrition formulated by a physician who helped crack the genetic code.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
