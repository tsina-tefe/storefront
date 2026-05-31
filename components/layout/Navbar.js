import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Storefront
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link
            href="/products"
            className="transition-colors hover:text-gray-900"
          >
            All Products
          </Link>
          <Link
            href="/products/category/electronics"
            className="transition-colors hover:text-gray-900"
          >
            Electronics
          </Link>
          <Link
            href="/products/category/clothing"
            className="transition-colors hover:text-gray-900"
          >
            Clothing
          </Link>
          <Link
            href="/products/category/books"
            className="transition-colors hover:text-gray-900"
          >
            Books
          </Link>
        </nav>

        <Link
          href="/cart"
          className="relative p-2 transition-colors hover:text-gray-600"
        >
          <ShoppingCart size={22} />
        </Link>
      </div>
    </header>
  )
}
