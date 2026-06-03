'use server'

import { auth } from '@/lib/auth'
import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(items) {
  const session = await auth()
  if (!session) redirect('/auth/login')

  if (!items || items.length === 0) {
    return { error: 'Your cart is empty.' }
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    metadata: {
      userId: session.user.id,
    },
  })

  redirect(checkoutSession.url)
}
