// Catalogue snapshot taken from the homepage of https://gdotcollection.com/ (Best Sellers block).
// IDs match the live WooCommerce product IDs (used by ?add-to-cart=ID).
// Replace getProducts() with a WooCommerce REST call to keep this live (see README).
export type CategorySlug = "stitched" | "unstitched" | "accessories";
export type Product = {
  id: number; slug: string; name: string; price: number;
  categories: CategorySlug[]; image: string;
};

export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL ?? "https://gdotcollection.com";
const U = "https://gdotcollection.com/wp-content/uploads/2026/09/";
const P = (id: number, slug: string, name: string, categories: CategorySlug[], file: string): Product =>
  ({ id, slug, name, price: 2500, categories, image: U + file });

const S = "ChatGPT-Image-Sep-12-2026-";
const products: Product[] = [
  P(29065, "baby-pink-embroidered-tunic-set-with-schiffli-lace-sleeves-fringed-hem", "Baby Pink Embroidered Tunic Set with Schiffli Lace Sleeves & Fringed Hem", ["stitched"], S + "04_51_35-PM-1-533x800.png"),
  P(29032, "beige-plum-contrast-embroidered-3-piece-lawn-suit-with-dupatta", "Beige & Plum Contrast Embroidered 3-Piece Lawn Suit with Dupatta", ["accessories", "stitched"], S + "04_51_25-PM-533x800.png"),
  P(29067, "black-chikankari-embroidered-kurti-set-with-scalloped-cutwork-borders", "Black Chikankari Embroidered Kurti Set with Scalloped Cutwork Borders", ["accessories", "stitched"], S + "04_51_33-PM-533x800.png"),
  P(29027, "black-ethnic-printed-lawn-tunic-with-lace-trims-wide-leg-trousers", "Black Ethnic Printed Lawn Tunic with Lace Trims & Wide-Leg Trousers", ["accessories", "stitched"], S + "04_51_13-PM-533x800.png"),
  P(29030, "deep-magenta-embroidered-kurti-set-with-lace-sleeves-fringed-hem", "Deep Magenta Embroidered Kurti Set with Lace Sleeves & Fringed Hem", ["accessories", "stitched"], S + "04_51_20-PM-1-533x800.png"),
  P(29072, "jet-black-embroidered-tunic-shalwar-set-with-scalloped-cutwork-borders", "Jet Black Embroidered Tunic & Shalwar Set with Scalloped Cutwork Borders", ["unstitched"], S + "04_51_39-PM-1-533x800.png"),
  P(29024, "mint-green-floral-printed-2-piece-suit", "Mint Green Floral Printed 2-Piece Suit", ["accessories", "stitched"], S + "03_12_23-PM-645x800.png"),
  P(29026, "mint-green-floral-printed-kurti-with-pastel-pink-grid-trousers", "Mint Green Floral Printed Kurti with Pastel Pink Grid Trousers", ["accessories", "stitched"], S + "04_51_11-PM-533x800.png"),
  P(29029, "monochrome-abstract-printed-co-ord-set-with-button-down-tunic-wide-leg-trousers", "Monochrome Abstract Printed Co-Ord Set with Button-Down Tunic & Wide-Leg Trousers", ["accessories", "stitched"], S + "04_51_18-PM-1-533x800.png"),
  P(29033, "off-white-embroidered-long-kurta-with-black-geometric-floral-threadwork", "Off-White Embroidered Long Kurta with Black Geometric & Floral Threadwork", ["accessories", "stitched"], S + "04_51_28-PM-533x800.png"),
];

export const collections: { slug: CategorySlug; title: string; blurb: string; image: string }[] = [
  { slug: "stitched", title: "Stitched", blurb: "Ready-to-wear sets", image: U + "ChatGPT-Image-Sep-14-2026-12_40_32-PM-633x800.png" },
  { slug: "unstitched", title: "Unstitched", blurb: "Fabric, tailored your way", image: U + "ChatGPT-Image-Sep-14-2026-12_37_55-PM-633x800.png" },
  { slug: "accessories", title: "Accessories", blurb: "Pieces filed under Accessories", image: products[1].image },
];

export async function getProducts(): Promise<Product[]> { return products; }
export async function getProduct(slug: string) { return products.find((p) => p.slug === slug); }
export const formatPrice = (n: number) => "₨" + n.toLocaleString("en-PK");
