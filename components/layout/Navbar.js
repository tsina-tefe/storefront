'use client'

import Link from 'next/link'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import CartDrawer from './CartDrawer'
import { useCartStore } from '@/store/cart'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()
  const { data: session } = useSession()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
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

          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative cursor-pointer p-2 text-gray-400 transition-colors hover:text-gray-600"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User menu */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
                >
                  <User size={16} />
                  {session.user.name?.split(' ')[0]}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      My orders
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setMenuOpen(false)
                      }}
                      className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-gray-50"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
