'use client'

import Link from 'next/link'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import CartDrawer from './CartDrawer'
import { useCartStore } from '@/store/cart'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/products', label: 'All Products' },
  { href: '/products/category/electronics', label: 'Electronics' },
  { href: '/products/category/clothing', label: 'Clothing' },
  { href: '/products/category/books', label: 'Books' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()
  const { data: session, status, update } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    update()
  }, [pathname])

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  const renderUserSection = () => {
    if (status === 'loading') {
      return <div className="h-8 w-24 animate-pulse rounded-full bg-gray-100" />
    }

    if (status === 'authenticated') {
      return (
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
      )
    }

    return (
      <Link
        href="/auth/login"
        className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
      >
        Sign in
      </Link>
    )
  }

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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-gray-900 ${
                  pathname === link.href ? 'text-gray-900' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative cursor-pointer p-2 text-gray-500 transition-colors hover:text-gray-900"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop user section */}
            <div className="hidden md:block">{renderUserSection()}</div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="cursor-pointer p-2 text-gray-500 transition-colors hover:text-gray-900 md:hidden"
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {mobileNavOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${
                    pathname === link.href
                      ? 'bg-gray-50 text-gray-900'
                      : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-gray-100 pt-4">
              {status === 'authenticated' ? (
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <User size={16} />
                    My orders
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-gray-50"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="block rounded-full bg-gray-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
