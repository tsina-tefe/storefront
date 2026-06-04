import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-bold text-gray-900">Storefront</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Quality products delivered to your door.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-gray-600"
                >
                  All products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/electronics"
                  className="transition-colors hover:text-gray-600"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/clothing"
                  className="transition-colors hover:text-gray-600"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/products/category/books"
                  className="transition-colors hover:text-gray-600"
                >
                  Books
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/auth/login"
                  className="transition-colors hover:text-gray-600"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="transition-colors hover:text-gray-600"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="transition-colors hover:text-gray-600"
                >
                  My orders
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="transition-colors hover:text-gray-600"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Built with</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>Next.js 15</li>
              <li>Prisma + Neon</li>
              <li>Stripe</li>
              <li>NextAuth v5</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Storefront. Built with Next.js.
        </div>
      </div>
    </footer>
  )
}
