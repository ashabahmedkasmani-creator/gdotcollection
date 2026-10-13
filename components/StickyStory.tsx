"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SafeImage from "./SafeImage";
import BlurText from "./BlurText";

type Step = { slug: string; title: string; blurb: string; image: string };

// Desktop: image stays pinned and crossfades as each text step scrolls past. Mobile: simple stacked image + text.
export default function StickyStory({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className="bg-ivory px-5 md:px-10" aria-label="Collection stories">
      <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:gap-16">
        <div className="relative hidden md:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden">
              {steps.map((s, i) => (
                <div key={s.slug} className={`absolute inset-0 transition-all duration-[1100ms] [transition-timing-function:var(--ease)] ${i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}>
                  <SafeImage src={s.image} alt={`${s.title} collection`} fill sizes="40vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          {steps.map((s, i) => (
            <div key={s.slug} data-i={i} ref={(el) => { refs.current[i] = el; }} className="flex min-h-[70vh] flex-col justify-center py-16 md:min-h-[90vh]">
              <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden md:hidden"><SafeImage src={s.image} alt={`${s.title} collection`} fill sizes="100vw" className="object-cover" /></div>
              <p className="text-xs uppercase tracking-[0.3em] text-clay">0{i + 1} / 0{steps.length}</p>
              <BlurText text={s.title} className="mt-4 font-display text-6xl tracking-tight md:text-8xl" />
              <p className="mt-4 max-w-sm text-stone">{s.blurb}</p>
              <Link href={`/shop?cat=${s.slug}`} className="btn-solid mt-8 self-start">Shop {s.title.toLowerCase()}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
