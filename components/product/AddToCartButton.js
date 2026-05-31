'use client'

import { useCartStore } from '@/store/cart'
import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        added
          ? 'bg-green-600 text-white'
          : 'bg-gray-900 text-white hover:bg-gray-700'
      }`}
    >
      {added ? (
        <>
          <Check size={18} />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          Add to cart
        </>
      )}
    </button>
  )
}
