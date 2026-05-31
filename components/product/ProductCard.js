import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product, priority = false }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
          {product.category?.name}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-gray-600">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}
