import { ProductGridSkeleton } from '@/components/ui/Skeleton'

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-9 w-40 animate-pulse rounded-full bg-gray-100" />
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 animate-pulse rounded-full bg-gray-100"
          />
        ))}
      </div>
      <div className="mt-8">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  )
}
