export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chart skeleton */}
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>

        {/* Related data skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
