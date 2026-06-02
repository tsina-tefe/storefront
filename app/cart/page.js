'use client'

import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-3 text-gray-400">Add some products to get started.</p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items list */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-5">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-200">{item.name}</p>
                      <p className="mt-0.5 text-sm text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer text-gray-300 transition-colors hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 px-3 py-1.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="cursor-pointer text-gray-500 transition-colors hover:text-gray-900"
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="cursor-pointer text-gray-500 transition-colors hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={clearCart}
            className="mt-4 cursor-pointer text-sm text-gray-400 underline underline-offset-2 transition-colors hover:text-red-400"
          >
            Clear cart
          </button>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 font-semibold text-gray-900">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-gray-900 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Proceed to checkout
          </Link>
          <Link
            href="/products"
            className="mt-3 block w-full rounded-full border border-gray-200 py-3.5 text-center text-sm font-medium text-gray-600 transition-colors hover:border-gray-400"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
