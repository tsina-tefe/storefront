import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-7xl font-bold text-gray-100">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Go home
        </Link>
        <Link
          href="/products"
          className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}
