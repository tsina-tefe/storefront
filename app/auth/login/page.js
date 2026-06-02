'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loginUser } from '@/actions/auth'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.target)
    const email = form.get('email')
    const password = form.get('password')

    const result = await loginUser({ email, password })
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-400">
          No account?{' '}
          <Link
            href="/auth/register"
            className="font-medium text-gray-900 underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
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
              placeholder="Your password"
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
            className="w-full cursor-pointer rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="mt-4 w-full cursor-pointer rounded-full border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400"
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}
