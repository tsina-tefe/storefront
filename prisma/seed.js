import pkg from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const { PrismaClient } = pkg

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
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
      // Electronics (15 products)
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
        name: 'Wireless Charging Pad',
        slug: 'wireless-charging-pad',
        description:
          'Fast 15W Qi wireless charger compatible with all Qi-enabled devices. Slim and minimalist design.',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
        stock: 80,
        categoryId: electronics.id,
      },
      {
        name: 'Smart LED Desk Lamp',
        slug: 'smart-led-desk-lamp',
        description:
          'Touch-controlled LED lamp with adjustable color temperature, USB charging port, and memory function.',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
        stock: 55,
        categoryId: electronics.id,
      },
      {
        name: 'USB-C Hub 7-in-1',
        slug: 'usb-c-hub-7-in-1',
        description:
          'Expand your laptop with HDMI 4K, 3x USB-A, SD card reader, and 100W PD charging.',
        price: 59.99,
        image:
          'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=800',
        stock: 45,
        categoryId: electronics.id,
      },
      {
        name: 'Ergonomic Mouse',
        slug: 'ergonomic-mouse',
        description:
          'Vertical ergonomic mouse that reduces wrist strain. Silent clicks, 6 buttons, 2.4GHz wireless.',
        price: 44.99,
        image:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
        stock: 70,
        categoryId: electronics.id,
      },
      {
        name: 'Portable SSD 1TB',
        slug: 'portable-ssd-1tb',
        description:
          'Ultra-fast USB-C portable SSD with read speeds up to 1050MB/s. Shock and drop resistant.',
        price: 109.99,
        image:
          'https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?w=800',
        stock: 30,
        categoryId: electronics.id,
      },
      {
        name: 'Smart Watch',
        slug: 'smart-watch',
        description:
          'Feature-rich smartwatch with health tracking, GPS, 5-day battery life, and water resistance.',
        price: 199.99,
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
        stock: 25,
        categoryId: electronics.id,
      },
      {
        name: 'Noise-Cancelling Earbuds',
        slug: 'noise-cancelling-earbuds',
        description:
          'True wireless earbuds with active noise cancellation, 8-hour playtime, and IPX4 water resistance.',
        price: 149.99,
        image:
          'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800',
        stock: 50,
        categoryId: electronics.id,
      },
      {
        name: 'Mechanical Numpad',
        slug: 'mechanical-numpad',
        description:
          'Compact wireless numpad with hot-swappable switches, RGB backlight, and rechargeable battery.',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800',
        stock: 40,
        categoryId: electronics.id,
      },
      {
        name: 'Webcam Privacy Cover',
        slug: 'webcam-privacy-cover',
        description:
          'Ultra-thin aluminum webcam cover that slides open and closed. Fits most laptops and monitors.',
        price: 9.99,
        image:
          'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800',
        stock: 200,
        categoryId: electronics.id,
      },
      {
        name: 'Cable Management Kit',
        slug: 'cable-management-kit',
        description:
          '50-piece cable management kit with clips, ties, sleeves, and mounting anchors for a clean desk.',
        price: 19.99,
        image:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        stock: 120,
        categoryId: electronics.id,
      },
      {
        name: 'Monitor Light Bar',
        slug: 'monitor-light-bar',
        description:
          'Asymmetric LED light bar that sits on your monitor. No glare on screen, USB powered, touch control.',
        price: 39.99,
        image:
          'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800',
        stock: 65,
        categoryId: electronics.id,
      },

      // Clothing (15 products)
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
        name: 'Relaxed Fit T-Shirt',
        slug: 'relaxed-fit-t-shirt',
        description:
          'Premium 180gsm cotton t-shirt with a relaxed fit and reinforced collar. Pre-shrunk.',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        stock: 150,
        categoryId: clothing.id,
      },
      {
        name: 'Puffer Jacket',
        slug: 'puffer-jacket',
        description:
          'Lightweight packable puffer jacket with 600-fill down insulation. Water-resistant shell.',
        price: 149.99,
        image:
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
        stock: 45,
        categoryId: clothing.id,
      },
      {
        name: 'Wool Blend Overcoat',
        slug: 'wool-blend-overcoat',
        description:
          'Classic single-breasted overcoat in a premium wool blend. Fully lined with satin.',
        price: 229.99,
        image:
          'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
        stock: 30,
        categoryId: clothing.id,
      },
      {
        name: 'Jogger Pants',
        slug: 'jogger-pants',
        description:
          'Comfortable tapered joggers in French terry fabric. Elastic waistband with drawstring.',
        price: 59.99,
        image:
          'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
        stock: 95,
        categoryId: clothing.id,
      },
      {
        name: 'Oxford Button-Down Shirt',
        slug: 'oxford-button-down-shirt',
        description:
          'Classic Oxford cloth button-down shirt. Slightly relaxed fit, perfect for smart casual looks.',
        price: 79.99,
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
        stock: 70,
        categoryId: clothing.id,
      },
      {
        name: 'Canvas Sneakers',
        slug: 'canvas-sneakers',
        description:
          'Low-top canvas sneakers with vulcanized rubber sole. Clean, minimal design in 6 colors.',
        price: 64.99,
        image:
          'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
        stock: 110,
        categoryId: clothing.id,
      },
      {
        name: 'Leather Belt',
        slug: 'leather-belt',
        description:
          'Full-grain leather belt with a brushed nickel buckle. 35mm width. Sizes 28–44.',
        price: 44.99,
        image:
          'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800',
        stock: 130,
        categoryId: clothing.id,
      },
      {
        name: 'Wool Scarf',
        slug: 'wool-scarf',
        description:
          'Oversized wool scarf in a classic herringbone pattern. 180cm x 35cm.',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
        stock: 75,
        categoryId: clothing.id,
      },
      {
        name: 'Crew Neck Sweater',
        slug: 'crew-neck-sweater',
        description:
          'Fine-knit merino wool crew neck sweater. Lightweight enough for layering, warm enough for winter.',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800',
        stock: 60,
        categoryId: clothing.id,
      },
      {
        name: 'Denim Jacket',
        slug: 'denim-jacket',
        description:
          'Classic trucker-style denim jacket in 12oz selvedge denim. Slightly relaxed fit.',
        price: 119.99,
        image:
          'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=800',
        stock: 40,
        categoryId: clothing.id,
      },
      {
        name: 'Leather Gloves',
        slug: 'leather-gloves',
        description:
          'Touchscreen-compatible lambskin leather gloves with cashmere lining. Sizes XS–XL.',
        price: 59.99,
        image:
          'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800',
        stock: 55,
        categoryId: clothing.id,
      },
      {
        name: 'Slim Fit Jeans',
        slug: 'slim-fit-jeans',
        description:
          'Classic 5-pocket slim fit jeans in 11oz stretch denim. Mid-rise with tapered leg.',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
        stock: 100,
        categoryId: clothing.id,
      },

      // Books (10 products)
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
        name: 'The Design of Everyday Things',
        slug: 'the-design-of-everyday-things',
        description:
          'Don Norman explores the principles of good design and why some products frustrate us.',
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
        stock: 65,
        categoryId: books.id,
      },
      {
        name: 'Deep Work',
        slug: 'deep-work',
        description:
          'Cal Newport makes the case for focused, distraction-free work as a superpower in the modern economy.',
        price: 18.99,
        image:
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
        stock: 80,
        categoryId: books.id,
      },
      {
        name: 'Zero to One',
        slug: 'zero-to-one',
        description:
          'Peter Thiel shares his contrarian views on startups and building companies that create new things.',
        price: 22.99,
        image:
          'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800',
        stock: 70,
        categoryId: books.id,
      },
      {
        name: 'Designing Data-Intensive Applications',
        slug: 'designing-data-intensive-applications',
        description:
          'Martin Kleppmann covers the architecture of modern data systems including databases and distributed systems.',
        price: 59.99,
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        stock: 35,
        categoryId: books.id,
      },
      {
        name: 'The Lean Startup',
        slug: 'the-lean-startup',
        description:
          'Eric Ries introduces the lean methodology for building and scaling startups efficiently.',
        price: 17.99,
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        stock: 85,
        categoryId: books.id,
      },
      {
        name: 'Thinking Fast and Slow',
        slug: 'thinking-fast-and-slow',
        description:
          'Daniel Kahneman explores the two systems that drive the way we think and make decisions.',
        price: 21.99,
        image:
          'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800',
        stock: 75,
        categoryId: books.id,
      },
      {
        name: 'A Philosophy of Software Design',
        slug: 'a-philosophy-of-software-design',
        description:
          'John Ousterhout presents a clear framework for reducing complexity in software systems.',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        stock: 50,
        categoryId: books.id,
      },

      // Home & Kitchen (10 products)
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
      {
        name: 'Cast Iron Skillet',
        slug: 'cast-iron-skillet',
        description:
          'Pre-seasoned 12-inch cast iron skillet. Even heat distribution, oven safe to 500°F.',
        price: 49.99,
        image:
          'https://images.unsplash.com/photo-1588543385566-8e9a43e26d64?w=800',
        stock: 60,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Bamboo Cutting Board Set',
        slug: 'bamboo-cutting-board-set',
        description:
          'Set of 3 organic bamboo cutting boards in small, medium, and large. Juice groove on one side.',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?w=800',
        stock: 90,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'French Press Coffee Maker',
        slug: 'french-press-coffee-maker',
        description:
          'Double-walled stainless steel French press. Keeps coffee hot for 2 hours. 1 litre capacity.',
        price: 44.99,
        image:
          'https://images.unsplash.com/photo-1519082274554-1ca37f3e9e92?w=800',
        stock: 55,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Knife Set with Block',
        slug: 'knife-set-with-block',
        description:
          '6-piece high-carbon stainless steel knife set with solid wood block. Full tang construction.',
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800',
        stock: 40,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Airtight Food Storage Set',
        slug: 'airtight-food-storage-set',
        description:
          '10-piece borosilicate glass food storage containers with airtight snap-lock lids.',
        price: 54.99,
        image:
          'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800',
        stock: 70,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Silicone Utensil Set',
        slug: 'silicone-utensil-set',
        description:
          '7-piece heat-resistant silicone cooking utensil set with stainless steel handles.',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        stock: 100,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Digital Kitchen Scale',
        slug: 'digital-kitchen-scale',
        description:
          'Precise digital scale with 0.1g accuracy, tare function, and 5kg capacity. Slim profile.',
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800',
        stock: 85,
        categoryId: homeAndKitchen.id,
      },
      {
        name: 'Spice Rack Organizer',
        slug: 'spice-rack-organizer',
        description:
          'Wall-mounted magnetic spice rack with 12 stainless steel tins and chalkboard labels.',
        price: 39.99,
        image:
          'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
        stock: 65,
        categoryId: homeAndKitchen.id,
      },
    ],
  })

  console.log('✅ Seeded 4 categories and 50 products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
