import Link from 'next/link'

export default function AuthErrorPage({ searchParams }) {
  const error = searchParams?.error

  const messages = {
    OAuthAccountNotLinked:
      'This email is already registered with a different sign-in method.',
    CredentialsSignin: 'Invalid email or password.',
    default: 'Something went wrong. Please try again.',
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Authentication error</h1>
      <p className="mt-3 text-gray-500">
        {messages[error] ?? messages.default}
      </p>
      <Link
        href="/auth/login"
        className="mt-8 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
      >
        Back to login
      </Link>
    </div>
  )
}
