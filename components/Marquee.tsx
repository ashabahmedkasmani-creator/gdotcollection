// Slow editorial ticker. Static when the user prefers reduced motion (see .marquee in globals.css).
const words = ["Stitched", "Unstitched", "Lawn", "Embroidered", "Kurti sets", "Co-ords", "Lace"];
export default function Marquee() {
  const row = words.map((w) => <span key={w} className="mx-8 font-display text-5xl uppercase tracking-tight md:text-7xl">{w} <span className="text-clay">✦</span></span>);
  return (
    <div className="overflow-hidden border-y border-ivory/15 bg-ink py-6 text-ivory" aria-hidden="true">
      <div className="marquee flex w-max whitespace-nowrap">{row}{row}</div>
    </div>
  );
}
