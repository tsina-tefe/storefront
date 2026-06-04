import pkg from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const { PrismaClient } = pkg

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const electronics = await prisma.category.create({
    data: { name: 'Electronics', slug: 'electronics' },
  })
  const clothing = await prisma.category.create({
    data: { name: 'Clothing', slug: 'clothing' },
  })
  const books = await prisma.category.create({
    data: { name: 'Books', slug: 'books' },
  })
  const homeAndKitchen = await prisma.category.create({
    data: { name: 'Home & Kitchen', slug: 'home-kitchen' },
  })

  await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        slug: 'wireless-noise-cancelling-headphones',
        description:
          'Premium over-ear headphones with 30-hour battery life and industry-leading noise cancellation.',
        price: 299.99,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        stock: 42,
        categoryId: electronics.id,
      },
      {
        name: 'Mechanical Keyboard',
        slug: 'mechanical-keyboard',
        description:
          'Compact TKL mechanical keyboard with RGB backlighting and tactile brown switches.',
        price: 129.99,
        image:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
        stock: 18,
        categoryId: electronics.id,
      },
      {
        name: '4K Webcam',
        slug: '4k-webcam',
        description:
          'Ultra HD webcam with autofocus, built-in mic, and low-light correction for professional calls.',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=800',
        stock: 35,
        categoryId: electronics.id,
      },
      {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        description:
          'Waterproof speaker with 360° sound, 20-hour battery, and rugged build for outdoor use.',
        price: 79.99,
        image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
        stock: 60,
        categoryId: electronics.id,
      },

      {
        name: 'Classic Crewneck Sweatshirt',
        slug: 'classic-crewneck-sweatshirt',
        description:
          'Heavyweight 100% cotton sweatshirt with a relaxed fit. Available in 8 colors.',
        price: 54.99,
        image:
          'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800',
        stock: 120,
        categoryId: clothing.id,
      },
      {
        name: 'Slim Fit Chino Pants',
        slug: 'slim-fit-chino-pants',
        description:
          'Versatile slim-fit chinos made from stretch cotton blend. Perfect for work or casual wear.',
        price: 69.99,
        image:
          'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
        stock: 85,
        categoryId: clothing.id,
      },
      {
        name: 'Merino Wool Beanie',
        slug: 'merino-wool-beanie',
        description:
          'Soft and warm merino wool beanie with a classic ribbed design. One size fits all.',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800',
        stock: 200,
        categoryId: clothing.id,
      },

      {
        name: 'The Pragmatic Programmer',
        slug: 'the-pragmatic-programmer',
        description:
          'A classic guide to software craftsmanship covering best practices, tools, and career advice.',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800',
        stock: 55,
        categoryId: books.id,
      },
      {
        name: 'Atomic Habits',
        slug: 'atomic-habits',
        description:
          'Proven framework for building good habits and breaking bad ones by James Clear.',
        price: 19.99,
        image:
          'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?w=800',
        stock: 90,
        categoryId: books.id,
      },
      {
        name: 'Clean Code',
        slug: 'clean-code',
        description:
          "Robert C. Martin's definitive guide to writing readable, maintainable software.",
        price: 44.99,
        image:
          'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800',
        stock: 40,
        categoryId: books.id,
      },

      {
        name: 'Pour Over Coffee Maker',
        slug: 'pour-over-coffee-maker',
        description:
          'Borosilicate glass pour over with a stainless steel filter. Brews 600ml per batch.',
        price: 39.99,
        image:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        stock: 75,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Ceramic Dinner Set',
        slug: 'ceramic-dinner-set',
        description:
          '16-piece hand-glazed ceramic dinner set. Dishwasher and microwave safe.',
        price: 119.99,
        image:
          'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800',
        stock: 30,
        categoryId: homeAndKitchen.id,
      },
    ],
  })

  console.log('✅ Seeded 4 categories and 12 products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
