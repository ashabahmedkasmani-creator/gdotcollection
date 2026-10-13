import Image from "@/components/SafeImage";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import AddToCart from "./AddToCart";
import HeartButton from "./HeartButton";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-[2/3] overflow-hidden bg-stone/20">
            <Image src={product.image} alt={product.name} fill priority={priority} sizes="(min-width:1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease)] group-hover:scale-[1.05]" />
          </div>
          <h3 className="mt-4 line-clamp-2 text-sm leading-snug">{product.name}</h3>
          <p className="mt-1 text-sm text-stone">{formatPrice(product.price)}</p>
        </Link>
        <HeartButton id={product.id} name={product.name} />
      </div>
      <div className="mt-3"><AddToCart product={product} /></div>
    </article>
  );
}
