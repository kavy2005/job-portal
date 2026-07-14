export function JobCardSkeleton() {
  return (
    <div className="flex bg-white rounded-lg border border-line overflow-hidden animate-pulse">
      <div className="flex-1 p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-line/60 rounded w-2/3"></div>
            <div className="h-3.5 bg-line/40 rounded w-1/3"></div>
          </div>
          <div className="h-3 bg-line/40 rounded w-16"></div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-3.5 bg-line/40 rounded w-20"></div>
          <div className="h-3.5 bg-line/40 rounded w-24"></div>
          <div className="h-3.5 bg-line/40 rounded w-16"></div>
        </div>
      </div>
      <div className="perforated my-4"></div>
      <div className="w-28 flex items-center justify-center bg-paper">
        <div className="h-4 bg-line/40 rounded w-10"></div>
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="grid grid-cols-[1fr_140px_120px] gap-4 px-5 py-4 items-center border-t border-line animate-pulse">
      <div className="space-y-2">
        <div className="h-4 bg-line/60 rounded w-1/2"></div>
        <div className="h-3 bg-line/40 rounded w-1/3"></div>
      </div>
      <div className="h-3 bg-line/40 rounded w-16"></div>
      <div className="h-5 bg-line/40 rounded w-20"></div>
    </div>
  );
}
