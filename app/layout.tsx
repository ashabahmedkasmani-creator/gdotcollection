import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "G. Collection — Stitched & Unstitched Ladies Clothing", template: "%s | G. Collection" },
  description: "G. Collection is a full collection of stitched and unstitched ladies clothing from Karachi, Pakistan.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider><WishlistProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </WishlistProvider></CartProvider>
      </body>
    </html>
  );
}
