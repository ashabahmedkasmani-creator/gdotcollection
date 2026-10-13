# G. Collection — Next.js redesign

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3. CSS-only motion, no animation library.
Design direction: Mainframe-style fullscreen cinematic hero, minimal blend-mode nav, tight display type, staggered rise/fade-in, pointer-driven horizontal drift (hover devices only; disabled for touch and `prefers-reduced-motion`).

## Status — read first
This project was written in an environment with **no network access**, so these were NOT run: `npm install`, `npm run lint`, `npm run typecheck`, `npm run build`. No lockfile is included (`npm install` generates `package-lock.json`). Fix any type/lint errors you see on first run. Also untested in a browser: responsive layouts, menu behaviour, images.

## Setup
1. Extract the ZIP and `cd g-collection`.
2. `npm install`
3. `cp .env.example .env.local` and edit values.
4. `npm run dev` → http://localhost:3000
5. Checks: `npm run lint`, `npm run typecheck`, `npm run build`, then `npm start`.
6. Deploy: push to Git and import into Vercel (set the env vars), or run `npm run build && npm start` on any Node 18.17+ host. Fonts (Google) are fetched at build time, so the build machine needs internet.

## What is real vs. not
Verified from https://gdotcollection.com/ (a WooCommerce/Elementor/Woodmart site): brand name, 10 Best Seller products (names, ₨2,500 price, WooCommerce IDs, images, categories), the Stitched / Unstitched / Accessories categories, contact details, support hours, Cash on Delivery + bank transfer, free shipping over Rs. 10,000.

Not verified / not built: sizes, colours, stock levels, product descriptions, wishlist, search, account, newsletter and reviews (the live homepage shows lorem-ipsum testimonials, template blog posts and a placeholder FAQ — deliberately not copied). Pagination and sorting are omitted because only 10 products at one price were visible.

Catalogue note: many kurti/lawn sets are tagged "Accessories" on the live store; this is preserved as-is in `lib/products.ts` — likely worth fixing in WooCommerce.

## Cart & checkout
The cart is client-side (localStorage). Real orders happen on the live store: each cart line links to `https://gdotcollection.com/?add-to-cart=<id>&quantity=<n>`. This site has no payment or order backend.

## Connecting the real backend
- Catalogue: replace `getProducts()` / `getProduct()` in `lib/products.ts` with calls to the WooCommerce REST API (`/wp-json/wc/v3/products`) using `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` — server-side only, never `NEXT_PUBLIC_`. Add `export const revalidate = 300` to pages for fresh data.
- Full cart/checkout sync: use WooCommerce's Store API (`/wp-json/wc/store/v1/`) from a server route, or keep checkout on the WooCommerce domain. Needs CORS/nonce setup on the WordPress side.
- Account, wishlist, newsletter: currently link to / depend on the live store.

## Cinematic upgrade notes
- Home sequence: hero → editorial collections (parallax + mask reveals) → pinned horizontal "edit" (swipe row on mobile / reduced motion) → layered campaign moment → overlapping-photo feature → staggered best sellers → service info → footer wordmark.
- New: wishlist (heart on cards, `/wishlist`, saved in localStorage — local only, not synced to any account), product search on `/shop` (filters the catalogue snapshot), single magnetic hero CTA, hover-only tilt, parallax on desktop only.
- Not added: newsletter (no verified backend on the live store — a form without a real endpoint would fake success), second product images (only one verified per product), video.
- The catalogue only has 10 products, so pieces repeat across sections. Source images are ~533×800, hence layered portrait compositions instead of one stretched full-bleed photo.
- Still untested (no network here): install, lint, type-check, build, browser/mobile checks.

## Production pass notes
- Images: all photography goes through `components/SafeImage.tsx` — optimizer → direct browser load → branded placeholder (same box, no layout collapse). Dev builds log failing URLs. If images still fail, the likely cause is hotlink protection on the source host; copy the files into `public/` and update `lib/products.ts`.
- Routing audit: About / Contact now local (`/about`, `/contact`) in navbar, mobile menu and footer. Still external on purpose: Account (no local account system), per-item "Order on store" links and the "View full details" link (checkout/product pages live on the WooCommerce store), remote product image host.
- Added: liquid-glass scrolled navbar + scroll progress, BlurText, masked headings, slow marquee, sticky crossfade collection story, drag/arrow/keyboard rail, film-grain on campaign section, loading + error states, motion tokens.
- Not implemented: Framer Motion (CSS/IO only), custom cursor, mega menu, search overlay, cart drawer, newsletter, shop-the-look, product gallery/zoom (single real image per product), filters beyond category + text search.
- Nothing here has been installed, built, linted or browser-tested.
