'use client'

import { useCartStore } from '@/store/cart'
import { X, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Your cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-sm font-medium text-gray-900 underline underline-offset-2"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 text-gray-300 transition-colors hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-5 text-center text-gray-500 transition-colors hover:text-gray-900"
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
                          className="w-5 text-center text-gray-500 transition-colors hover:text-gray-900"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-gray-200 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-900">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full rounded-full bg-gray-900 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              View cart & checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
