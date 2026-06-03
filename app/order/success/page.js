import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import stripe from '@/lib/stripe'
import ClearCart from './ClearCart'

export default async function OrderSuccessPage({ searchParams }) {
  const { session_id } = await searchParams

  let session = null
  if (session_id) {
    session = await stripe.checkout.sessions.retrieve(session_id)
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <ClearCart />
      <div className="flex justify-center">
        <CheckCircle size={64} strokeWidth={1.5} className="text-green-500" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-400">
        Order confirmed!
      </h1>
      <p className="mt-3 text-gray-400">
        Thanks for your purchase. Your order has been received and is being
        processed.
      </p>

      {session && (
        <div className="mt-8 space-y-2 rounded-2xl border border-gray-200 bg-white p-6 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount paid</span>
            <span className="font-semibold text-gray-900">
              ${(session.amount_total / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-900">
              {session.customer_details?.email}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="font-medium text-green-600 capitalize">
              {session.payment_status}
            </span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/profile"
          className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          View my orders
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-gray-200 px-8 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
