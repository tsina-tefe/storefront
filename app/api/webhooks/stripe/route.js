export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    console.error('No stripe-signature header')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 },
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json(
      { error: `Invalid signature: ${err.message}` },
      { status: 400 },
    )
  }

  console.log(`✅ Webhook received: ${event.type}`)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.userId

    if (!userId) {
      console.error('No userId in session metadata')
      return NextResponse.json(
        { error: 'No userId in metadata' },
        { status: 400 },
      )
    }

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ['data.price.product'] },
      )

      const orderItems = await Promise.all(
        lineItems.data.map(async (item) => {
          const product = await prisma.product.findFirst({
            where: { name: item.description },
          })

          if (!product) {
            console.error(`Product not found: ${item.description}`)
            return null
          }

          return {
            productId: product.id,
            quantity: item.quantity,
            price: item.price.unit_amount / 100,
          }
        }),
      )

      const validItems = orderItems.filter(Boolean)

      if (validItems.length === 0) {
        console.error('No valid order items found')
        return NextResponse.json({ error: 'No valid items' }, { status: 400 })
      }

      const order = await prisma.order.create({
        data: {
          userId,
          total: session.amount_total / 100,
          status: 'paid',
          stripeId: session.id,
          items: { create: validItems },
        },
      })

      console.log(`✅ Order created: ${order.id}`)
    } catch (err) {
      console.error('Error creating order:', err)
      return NextResponse.json(
        { error: 'Order creation failed' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
