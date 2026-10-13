import type { Metadata } from "next";
import Link from "next/link";
import BlurText from "@/components/BlurText";

export const metadata: Metadata = { title: "About", description: "G. Collection — a full collection of stitched and unstitched ladies clothing from Karachi, Pakistan.", alternates: { canonical: "/about" } };

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-28 pt-36 md:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-clay">About</p>
      <BlurText as="h1" text="G. Collection" className="mt-4 font-display text-7xl tracking-tight md:text-9xl" />
      <p className="mt-10 max-w-xl text-lg">A full collection of stitched and unstitched ladies clothing, based in Karachi, Pakistan.</p>
      <div className="mt-10 flex flex-wrap gap-3"><Link href="/shop" className="btn-solid">Shop the collection</Link><Link href="/contact" className="btn border-ink hover:bg-ink hover:text-ivory">Contact us</Link></div>
    </div>
  );
}
