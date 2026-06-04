import Link from 'next/link'
import prisma from '@/lib/prisma'
import ProductCard from '../components/product/ProductCard'

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Shop the latest
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Quality products across electronics, clothing, books, and more.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Browse all products
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-gray-400">
          Featured products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
