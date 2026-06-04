export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-square bg-gray-100" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-16 rounded-full bg-gray-100" />
        <div className="h-4 w-full rounded-full bg-gray-100" />
        <div className="h-4 w-2/3 rounded-full bg-gray-100" />
        <div className="mt-2 h-5 w-20 rounded-full bg-gray-100" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-gray-100" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-3 w-24 rounded-full bg-gray-100" />
          <div className="h-8 w-3/4 rounded-full bg-gray-100" />
          <div className="h-8 w-28 rounded-full bg-gray-100" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded-full bg-gray-100" />
            <div className="h-4 w-full rounded-full bg-gray-100" />
            <div className="h-4 w-2/3 rounded-full bg-gray-100" />
          </div>
          <div className="mt-4 h-12 w-full rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  )
}
