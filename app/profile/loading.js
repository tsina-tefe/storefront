export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 py-10">
      <div className="h-9 w-48 rounded-full bg-gray-100" />
      <div className="mt-2 h-4 w-40 rounded-full bg-gray-100" />
      <div className="mt-10 h-7 w-36 rounded-full bg-gray-100" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-full bg-gray-100" />
                <div className="h-3 w-24 rounded-full bg-gray-100" />
              </div>
              <div className="space-y-2 text-right">
                <div className="h-4 w-16 rounded-full bg-gray-100" />
                <div className="h-5 w-12 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
