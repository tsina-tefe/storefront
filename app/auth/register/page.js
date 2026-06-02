'use client'

import { useState } from 'react'
import Link from 'next/link'
import { registerUser } from '@/actions/auth'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.target)
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const result = await registerUser({ name, email, password })
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-400">
          Already have one?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Tsina Tefe"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="tsina@gmail.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Min. 8 characters"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="hover:bg-gray-700m w-full cursor-pointer rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
