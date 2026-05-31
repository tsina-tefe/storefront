import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'Storefront',
  description: 'A Next.js e-commerce store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
