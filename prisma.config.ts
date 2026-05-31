import { config } from 'dotenv'
config()
import path from 'node:path'
import { defineConfig } from 'prisma/config'

console.log(process.env.DATABASE_URL)
export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // @ts-ignore
  migrate: {
    async adapter() {
      const { PrismaNeon } = await import('@prisma/adapter-neon')
      return new PrismaNeon({ connectionString: process.env.DATABASE_URL })
    },
  },
})
