import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl

  const isLoggedIn = !!req.auth
  const isAuthPage = pathname.startsWith('/auth')
  const isProtected =
    pathname.startsWith('/checkout') || pathname.startsWith('/profile')

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/checkout',
    '/checkout/:path*',
    '/profile',
    '/profile/:path*',
    '/auth/:path*',
  ],
}
