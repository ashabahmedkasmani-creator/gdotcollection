import Link from "next/link";
import { STORE_URL } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-16 text-ivory md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-4xl tracking-tight">G. Collection</p>
          <p className="mt-4 max-w-xs text-sm text-ivory/70">A full collection of stitched and unstitched ladies clothing.</p>
        </div>
        <address className="space-y-2 text-sm not-italic text-ivory/80">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ivory/50">Contact</p>
          <p>Karachi, Pakistan</p>
          <p><a className="hover:text-clay" href="mailto:support@gdotcollection.com">support@gdotcollection.com</a></p>
          <p><a className="hover:text-clay" href="tel:+923347779231">+92 334 7779231</a></p>
          <p>Support: Mon–Sat, 11:00 AM – 9:00 PM</p>
        </address>
        <nav aria-label="Footer" className="space-y-2 text-sm text-ivory/80">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ivory/50">Explore</p>
          <p><Link className="hover:text-clay" href="/shop">Shop</Link></p>
          <p><Link className="hover:text-clay" href="/wishlist">Wishlist</Link></p>
          <p><Link className="hover:text-clay" href="/about">About us</Link></p>
          <p><Link className="hover:text-clay" href="/contact">Contact us</Link></p>
          <p><a className="hover:text-clay" href={`${STORE_URL}/my-account/`}>My account</a></p>
        </nav>
      </div>
      <p aria-hidden="true" className="mx-auto mt-16 max-w-7xl select-none overflow-hidden whitespace-nowrap font-display text-[17vw] font-medium uppercase leading-[0.8] tracking-[-0.05em] text-ivory/[0.07]">G. Collection</p>
      <p className="mx-auto mt-6 max-w-7xl text-xs text-ivory/40">© 2026 G. Collection</p>
    </footer>
  );
}
