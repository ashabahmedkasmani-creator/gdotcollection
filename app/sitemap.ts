import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [{ url: site }, { url: `${site}/shop` }, { url: `${site}/about` }, { url: `${site}/contact` }, ...products.map((p) => ({ url: `${site}/product/${p.slug}` }))];
}
