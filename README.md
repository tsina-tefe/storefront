# Storefront

A full-stack e-commerce application built with Next.js 15, featuring product catalog pages with ISR, a Zustand-powered cart, NextAuth authentication, and Stripe checkout.

---

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — JavaScript
- **Styling** — Tailwind CSS v4
- **Database** — PostgreSQL via [Neon](https://neon.tech)
- **ORM** — Prisma 7
- **Auth** — NextAuth.js v5 (Credentials + Google OAuth)
- **Payments** — Stripe Checkout
- **Email** — Resend
- **State** — Zustand (cart with localStorage persistence)
- **Deployment** — Vercel

---

## Features

- Product listing with filtering, sorting, and search via URL params
- ISR (Incremental Static Regeneration) on product and category pages
- Slide-in cart drawer with real-time item count badge
- Full cart page with quantity controls
- Email/password registration and login
- Google OAuth sign-in
- Protected routes via proxy (middleware)
- User profile with order history
- Stripe-hosted checkout
- Webhook-driven order creation
- Order confirmation email via Resend
- Responsive mobile navigation
- Custom 404 and error pages
- SEO — sitemap.xml, robots.txt, Open Graph metadata
- Loading skeletons with Suspense boundaries

---

## Project Structure

```
storefront/
├── app/
│   ├── layout.js                  # Root layout with Navbar and Providers
│   ├── page.js                    # Homepage with featured products
│   ├── not-found.js               # Custom 404 page
│   ├── error.js                   # Global error boundary
│   ├── sitemap.js                 # Dynamic sitemap
│   ├── robots.js                  # Robots.txt
│   ├── auth/
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   └── error/page.js
│   ├── products/
│   │   ├── page.js                # Product listing with filters (ISR)
│   │   ├── loading.js             # Skeleton loading UI
│   │   ├── [slug]/
│   │   │   ├── page.js            # Product detail page (ISR)
│   │   │   └── loading.js
│   │   └── category/[slug]/page.js
│   ├── cart/page.js
│   ├── checkout/page.js
│   ├── profile/page.js
│   ├── order/success/
│   │   ├── page.js
│   │   └── ClearCart.js
│   └── api/
│       ├── auth/[...nextauth]/route.js
│       └── webhooks/stripe/route.js
├── components/
│   ├── layout/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── CartDrawer.js
│   │   └── Providers.js
│   ├── product/
│   │   ├── ProductCard.js
│   │   └── AddToCartButton.js
│   ├── cart/
│   └── ui/
│       └── Skeleton.js
├── lib/
│   ├── prisma.js                  # Prisma singleton
│   ├── auth.js                    # NextAuth config
│   ├── stripe.js                  # Stripe instance
│   └── resend.js                  # Resend instance
├── store/
│   └── cart.js                    # Zustand cart store
├── actions/
│   ├── auth.js                    # Register and login server actions
│   └── checkout.js                # Stripe checkout server action
├── prisma/
│   ├── schema.prisma
│   └── seed.js
└── proxy.js                       # Route protection
```

---

## Database Schema

| Model       | Description                                          |
| ----------- | ---------------------------------------------------- |
| `User`      | Registered users with hashed passwords               |
| `Account`   | OAuth provider accounts (NextAuth)                   |
| `Session`   | Active user sessions (NextAuth)                      |
| `Category`  | Product categories with slugs                        |
| `Product`   | Products with price, stock, image, and slug          |
| `Order`     | Completed orders linked to a user and Stripe session |
| `OrderItem` | Individual line items within an order                |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Stripe](https://stripe.com) account (test mode)
- A [Resend](https://resend.com) account
- [Stripe CLI](https://stripe.com/docs/stripe-cli) for local webhook testing

### 1 — Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/storefront.git
cd storefront
npm install
```

### 2 — Set up environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```env
DATABASE_URL=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""          # openssl rand -base64 32
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""    # from stripe listen output
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
RESEND_API_KEY=""
```

### 3 — Set up the database

```bash
npx prisma db push
npx prisma generate
npm run seed
```

### 4 — Run the dev server

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000)

### 5 — Run the Stripe webhook listener (separate terminal)

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` value printed by the CLI and set it as `STRIPE_WEBHOOK_SECRET` in your `.env`. Restart the dev server after updating `.env`.

---

## Available Scripts

| Script          | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Start the development server                   |
| `npm run build` | Build for production                           |
| `npm run start` | Start the production server                    |
| `npm run seed`  | Seed the database with categories and products |
| `npm run lint`  | Run ESLint                                     |

---

## Stripe Test Cards

| Card number           | Description             |
| --------------------- | ----------------------- |
| `4242 4242 4242 4242` | Payment always succeeds |
| `4000 0000 0000 0002` | Payment always declined |

Use any future expiry date, any 3-digit CVC, and any 5-digit ZIP.

---

## Deployment

This app is deployed on [Vercel](https://vercel.com).

1. Push the repo to GitHub
2. Import the project in Vercel
3. Add all environment variables in Vercel → Settings → Environment Variables
4. Set `NEXTAUTH_URL` to your production Vercel URL
5. Register a production webhook in the [Stripe dashboard](https://dashboard.stripe.com/webhooks):
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Event: `checkout.session.completed`
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel with the production `whsec_` value
7. Redeploy

---

## Key Concepts Practiced

- **App Router** — nested layouts, route groups, loading and error UI per segment
- **Server vs Client Components** — data fetching on the server, interactivity on the client
- **ISR** — `revalidate = 60` on product and category pages for fast static pages that stay fresh
- **Server Actions** — form submissions and mutations without API routes
- **Zustand with persist** — client-side cart state that survives page refreshes
- **NextAuth v5** — credentials and OAuth, JWT sessions, protected routes via proxy
- **Stripe Checkout + Webhooks** — hosted payment page, server-side order creation on payment success
- **Prisma 7 with Neon adapter** — type-safe database queries with a serverless PostgreSQL database

---

## License

MIT
