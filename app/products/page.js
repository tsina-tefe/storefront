import prisma from '@/lib/prisma'
import ProductCard from '../../components/product/ProductCard'

export const revalidate = 60

export default async function ProductsPage({ searchParams }) {
  const { category, sort, search } = await searchParams

  const where = {
    ...(category && {
      category: { slug: category },
    }),
    ...(search && {
      name: { contains: search, mode: 'insensitive' },
    }),
  }

  const orderBy =
    sort === 'price-asc'
      ? { price: 'asc' }
      : sort === 'price-desc'
        ? { price: 'desc' }
        : { createdAt: 'desc' }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({ where, orderBy, include: { category: true } }),
    prisma.category.findMany(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-400">All Products</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterLink href="/products" label="All" active={!category} />
          {categories.map((cat) => (
            <FilterLink
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              label={cat.name}
              active={category === cat.slug}
            />
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <SortLink
            href="/products"
            label="Latest"
            active={!sort}
            category={category}
          />
          <SortLink
            href={`/products?sort=price-asc${category ? `&category=${category}` : ''}`}
            label="Price ↑"
            active={sort === 'price-asc'}
          />
          <SortLink
            href={`/products?sort=price-desc${category ? `&category=${category}` : ''}`}
            label="Price ↓"
            active={sort === 'price-desc'}
          />
        </div>
      </div>

      <SearchBar defaultValue={search} />

      {products.length === 0 ? (
        <p className="mt-16 text-center text-gray-400">No products found.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterLink({ href, label, active }) {
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-400'
      }`}
    >
      {label}
    </a>
  )
}

function SortLink({ href, label, active }) {
  return (
    <a
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-400'
      }`}
    >
      {label}
    </a>
  )
}

function SearchBar({ defaultValue }) {
  return (
    <form method="GET" action="/products" className="mt-4">
      <input
        type="text"
        name="search"
        defaultValue={defaultValue ?? ''}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:outline-none"
      />
    </form>
  )
}
