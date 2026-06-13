import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safe™ — Precision Mineral Nutrition by Health Science Nutritionals, PBC",
  description: "The only seasoning engineered for your Na:K protocol. Precision nutrition formulated by a physician who helped crack the genetic code.",
};

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
