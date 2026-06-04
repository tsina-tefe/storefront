'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-gray-400">
        An unexpected error occurred. You can try again or go back home.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
