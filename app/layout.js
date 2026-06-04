import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Providers from '@/components/layout/Providers'
import Footer from '@/components/layout/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Storefront',
    template: '%s — Storefront',
  },
  description:
    'Quality products across electronics, clothing, books, and more.',
  openGraph: {
    title: 'Storefront',
    description:
      'Quality products across electronics, clothing, books, and more.',
    url: process.env.NEXTAUTH_URL,
    siteName: 'Storefront',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storefront',
    description:
      'Quality products across electronics, clothing, books, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
