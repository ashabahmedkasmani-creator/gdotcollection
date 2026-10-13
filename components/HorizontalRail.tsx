"use client";
import { ReactNode, useRef } from "react";

// Swipe / mouse-drag / arrow-key / button rail. Never captures vertical page scroll.
export default function HorizontalRail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const by = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  const end = () => { drag.current.down = false; if (ref.current) ref.current.style.scrollSnapType = ""; };
  return (
    <div className="relative">
      <div ref={ref} role="region" aria-label={label} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") by(1); if (e.key === "ArrowLeft") by(-1); }}
        onPointerDown={(e) => { if (e.pointerType === "mouse" && ref.current) drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false }; }}
        onPointerMove={(e) => {
          const d = drag.current, el = ref.current;
          if (!d.down || !el) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) { d.moved = true; el.style.scrollSnapType = "none"; }
          el.scrollLeft = d.left - dx;
        }}
        onPointerUp={end} onPointerLeave={end} onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
        className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:cursor-grab md:active:cursor-grabbing">
        {children}
      </div>
      <div className="mt-6 hidden gap-3 md:flex">
        <button type="button" onClick={() => by(-1)} aria-label="Previous" className="grid h-12 w-12 place-items-center border border-ink transition hover:bg-ink hover:text-ivory">←</button>
        <button type="button" onClick={() => by(1)} aria-label="Next" className="grid h-12 w-12 place-items-center border border-ink transition hover:bg-ink hover:text-ivory">→</button>
      </div>
    </div>
  );
}
