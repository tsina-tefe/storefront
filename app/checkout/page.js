'use client'

import { useCartStore } from '@/store/cart'
import { createCheckoutSession } from '@/actions/checkout'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    await createCheckoutSession(items)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <ShoppingBag
          size={48}
          strokeWidth={1}
          className="mx-auto text-gray-300"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Nothing to checkout
        </h1>
        <p className="mt-2 text-gray-400">
          Add some products to your cart first.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-400">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-400">
            Order items ({items.length})
          </h2>
          <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white px-6">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="flex-shrink-0 text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/cart"
            className="inline-block text-sm text-gray-400 underline underline-offset-2 transition-colors hover:text-gray-600"
          >
            ← Edit cart
          </Link>
        </div>

        {/* Summary + pay button */}
        <div className="h-fit space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span>Calculated by Stripe</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 font-semibold text-gray-900">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full cursor-pointer rounded-full bg-gray-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Secured by Stripe.
            {/* Test with card{' '}
            <span className="font-mono font-medium text-gray-600">
              4242 4242 4242 4242
            </span> */}
          </p>
        </div>
      </div>
    </div>
  )
}
