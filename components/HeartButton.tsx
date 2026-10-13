"use client";
import { useWishlist } from "@/lib/wishlist";

export default function HeartButton({ id, name }: { id: number; name: string }) {
  const { has, toggle } = useWishlist();
  const on = has(id);
  return (
    <button type="button" aria-pressed={on} aria-label={`${on ? "Remove" : "Add"} ${name} ${on ? "from" : "to"} wishlist`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id); }}
      className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-ivory/90 text-ink transition active:scale-90">
      <svg viewBox="0 0 24 24" width="20" height="20" className={on ? "scale-110 transition-transform" : "transition-transform"} fill={on ? "#9a6b4f" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 20.5s-7.5-4.6-9.2-9.2C1.7 8 3.6 5 6.7 5c2 0 3.4 1.1 5.3 3 1.9-1.9 3.3-3 5.3-3 3.100 0 5 3 3.900 6.300C19.500 15.900 12 20.500 12 20.500z" />
      </svg>
    </button>
  );
}
