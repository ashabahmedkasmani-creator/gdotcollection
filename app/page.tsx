import Link from "next/link";
import Hero from "@/components/Hero";
import HorizontalStory from "@/components/HorizontalStory";
import MaskLines from "@/components/MaskLines";
import Parallax from "@/components/Parallax";
import ProductCard from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import StickyStory from "@/components/StickyStory";
import HorizontalRail from "@/components/HorizontalRail";
import BlurText from "@/components/BlurText";
import Tilt from "@/components/Tilt";
import Image from "@/components/SafeImage";
import { collections, formatPrice, getProducts } from "@/lib/products";

const Arrow = () => <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>;

export default async function Home() {
  const products = await getProducts();
  const feature = products[2];
  const [big, ...rest] = collections;
  return (
    <>
      <Hero images={[products[0].image, products[5].image, products[8].image]} />
      <Marquee />

      {/* Collections — continues the dark hero, then hands over to the light edit */}
      <section id="collections" className="scroll-mt-0 bg-ink px-5 pb-28 pt-12 text-ivory md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-ivory/60">Shop by category</p>
          <MaskLines lines={["Three ways", "to dress."]} className="mt-4 font-display text-6xl leading-[0.88] tracking-tight md:text-9xl" />
          <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6">
            <Reveal variant="clip" className="md:col-span-7 md:row-span-2">
              <Link href={`/shop?cat=${big.slug}`} className="group relative block aspect-[4/5] md:aspect-auto md:h-[min(120vh,980px)]">
                <Parallax src={big.image} alt={`${big.title} collection`} speed={0.08} sizes="(min-width:768px) 58vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-10"><p className="text-xs tracking-[0.3em]">01</p><h3 className="font-display text-6xl tracking-tight md:text-8xl">{big.title}</h3><p className="mt-2 text-xs uppercase tracking-[0.2em]">{big.blurb} <Arrow /></p></div>
              </Link>
            </Reveal>
            {rest.map((c, i) => (
              <Reveal key={c.slug} variant="clip" delay={150} className="md:col-span-5">
                <Link href={`/shop?cat=${c.slug}`} className="group relative block aspect-[4/5] md:aspect-[5/4]">
                  <Parallax src={c.image} alt={`${c.title} collection`} speed={0.12} sizes="(min-width:768px) 40vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-6 md:p-8"><p className="text-xs tracking-[0.3em]">0{i + 2}</p><h3 className="font-display text-5xl tracking-tight md:text-6xl">{c.title}</h3><p className="mt-2 text-xs uppercase tracking-[0.2em]">{c.blurb} <Arrow /></p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HorizontalStory items={products.slice(0, 6)} />
      <StickyStory steps={collections.map((c) => ({ slug: c.slug, title: c.title, blurb: c.blurb, image: c.image }))} />

      {/* Campaign moment: layered portraits + masked type */}
      <section className="grain relative overflow-hidden bg-ink py-24 text-ivory md:py-36" aria-label="Campaign">
        <div className="relative mx-auto h-[70vh] max-w-7xl px-5 md:h-[88vh] md:px-10">
          {[
            { p: products[7], cls: "left-5 top-0 w-[34%] md:left-10", s: 0.1, h: "h-[62%]" },
            { p: products[3], cls: "left-[36%] top-[14%] w-[30%]", s: 0.2, h: "h-[62%]" },
            { p: products[9], cls: "right-5 top-[4%] w-[28%] md:right-10", s: 0.14, h: "h-[62%]" },
          ].map(({ p, cls, s, h }) => (
            <Reveal key={p.id} variant="clip" className={`absolute ${cls} ${h}`}>
              <Tilt className="h-full"><Parallax src={p.image} alt={p.name} speed={s} sizes="34vw" /></Tilt>
            </Reveal>
          ))}
          <div className="pointer-events-none absolute inset-x-5 bottom-0 md:inset-x-10">
            <MaskLines lines={["Lace, thread", "& lawn."]} className="font-display text-[clamp(3.2rem,12vw,11rem)] font-medium uppercase leading-[0.84] tracking-[-0.05em] mix-blend-difference" />
          </div>
        </div>
      </section>

      {/* Editorial split with overlapping photographs */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-28 md:grid-cols-2 md:px-10 md:py-40">
        <div className="relative mx-auto w-full max-w-lg pb-24">
          <Reveal variant="clip"><Tilt><div className="relative aspect-[2/3] overflow-hidden"><Image src={feature.image} alt={feature.name} fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" /></div></Tilt></Reveal>
          <Reveal variant="clip" delay={200} className="absolute -bottom-0 right-[-6%] w-[46%] border-8 border-ivory shadow-2xl">
            <Tilt><div className="relative aspect-[2/3]"><Image src={products[4].image} alt={products[4].name} fill sizes="22vw" className="object-cover" /></div></Tilt>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <p className="text-xs uppercase tracking-[0.3em] text-clay">Featured piece</p>
          <BlurText text={feature.name} className="mt-4 font-display text-4xl leading-[0.95] tracking-tight md:text-6xl" />
          <p className="mt-5 text-lg">{formatPrice(feature.price)}</p>
          <div className="mt-8 max-w-xs"><AddToCart product={feature} /></div>
          <Link href={`/product/${feature.slug}`} className="group mt-8 inline-block text-xs uppercase tracking-[0.2em] underline underline-offset-8">View piece <Arrow /></Link>
        </Reveal>
      </section>

      {/* Best sellers — staggered columns for rhythm */}
      <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        <div className="flex items-end justify-between">
          <MaskLines lines={["Best sellers"]} className="font-display text-5xl tracking-tight md:text-8xl" />
          <Link href="/shop" className="group text-xs uppercase tracking-[0.2em] underline underline-offset-8">Shop all <Arrow /></Link>
        </div>
        <div className="mt-14">
          <HorizontalRail label="Best sellers">
            {products.map((p, i) => (
              <div key={p.id} className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-[26vw] lg:w-[22vw]"><ProductCard product={p} priority={i < 2} /></div>
            ))}
          </HorizontalRail>
        </div>
      </section>

      {/* Verified service information */}
      <section className="border-t border-ink/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-3 md:px-10">
          {[["Free shipping", "On orders of Rs. 10,000 and above."], ["Payment", "Cash on Delivery and bank transfer."], ["Support", "Monday to Saturday, 11:00 AM – 9:00 PM."]].map(([t, d]) => (
            <Reveal key={t}><h3 className="font-display text-4xl tracking-tight">{t}</h3><p className="mt-2 text-stone">{d}</p></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
