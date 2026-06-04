export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/profile/', '/checkout/', '/cart/'],
    },
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
  }
}
