import prisma from '@/lib/prisma'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/product/AddToCartButton'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } })
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} — Storefront`,
    description: product.description,
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  })

  if (!product) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium tracking-wide text-gray-400 uppercase">
            {product.category.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-500">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-gray-400">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 leading-relaxed text-gray-500">
            {product.description}
          </p>
          <p className="mt-4 text-sm text-gray-400">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
