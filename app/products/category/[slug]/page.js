import prisma from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } })
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }) {
  const { slug } = await params

  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: true },
  })

  if (!category) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
      <p className="mt-1 text-gray-400">{category.products.length} products</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={{ ...product, category }} />
        ))}
      </div>
    </div>
  )
}
