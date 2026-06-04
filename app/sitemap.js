import prisma from '@/lib/prisma'

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL

  const products = await prisma.product.findMany({
    select: { slug: true, createdAt: true },
  })

  const categories = await prisma.category.findMany({
    select: { slug: true },
  })

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryUrls = categories.map((c) => ({
    url: `${baseUrl}/products/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
    ...categoryUrls,
  ]
}
