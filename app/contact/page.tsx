import type { Metadata } from "next";
import BlurText from "@/components/BlurText";

export const metadata: Metadata = { title: "Contact", description: "Contact G. Collection in Karachi, Pakistan.", alternates: { canonical: "/contact" } };

export default function Contact() {
  const rows: [string, string, string?][] = [
    ["Email", "support@gdotcollection.com", "mailto:support@gdotcollection.com"],
    ["Phone", "+92 334 7779231", "tel:+923347779231"],
    ["Location", "Karachi, Pakistan"],
    ["Support hours", "Monday to Saturday, 11:00 AM – 9:00 PM"],
  ];
  return (
    <div className="mx-auto max-w-4xl px-5 pb-28 pt-36 md:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-clay">Customer care</p>
      <BlurText as="h1" text="Contact" className="mt-4 font-display text-7xl tracking-tight md:text-9xl" />
      <dl className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
        {rows.map(([k, v, h]) => (
          <div key={k} className="grid gap-1 py-6 md:grid-cols-3"><dt className="text-xs uppercase tracking-[0.2em] text-stone">{k}</dt><dd className="md:col-span-2 text-xl">{h ? <a className="underline-offset-4 hover:underline" href={h}>{v}</a> : v}</dd></div>
        ))}
      </dl>
    </div>
  );
}
