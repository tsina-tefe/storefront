import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import resend from '@/lib/resend'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata.userId

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    })

    const orderItems = await Promise.all(
      lineItems.data.map(async (item) => {
        const product = await prisma.product.findFirst({
          where: { name: item.description },
        })
        return {
          productId: product.id,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        }
      }),
    )

    await prisma.order.create({
      data: {
        userId,
        total: session.amount_total / 100,
        status: 'paid',
        stripeId: session.id,
        items: {
          create: orderItems,
        },
      },
    })

    console.log(`✅ Order created for session ${session.id}`)

    // Send confirmation email
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user?.email) {
      await resend.emails.send({
        from: 'Storefront <onboarding@resend.dev>',
        to: user.email,
        subject: 'Your order is confirmed!',
        html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Thanks for your order, ${user.name ?? 'there'}!</h2>
        <p>Your payment of <strong>$${(session.amount_total / 100).toFixed(2)}</strong> was successful.</p>
        <p>You can view your order history anytime in your account.</p>
        <a href="${process.env.NEXTAUTH_URL}/profile"
           style="display:inline-block;margin-top:16px;padding:12px 24px;background:#111;color:#fff;border-radius:999px;text-decoration:none;font-size:14px;">
          View my orders
        </a>
        <p style="margin-top:32px;font-size:12px;color:#999;">Storefront — powered by Next.js & Stripe</p>
      </div>
    `,
      })
    }
  }

  return NextResponse.json({ received: true })
}
