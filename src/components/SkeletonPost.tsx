export default function SkeletonPost() {
  return (
    <div className="mb-2 p-4" style={{ background: 'var(--fb-bg-secondary)', borderRadius: 8 }}>
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full animate-skeleton" style={{ background: 'var(--fb-bg-tertiary)' }} />
        <div className="flex-1">
          <div className="h-4 w-32 rounded animate-skeleton mb-1.5" style={{ background: 'var(--fb-bg-tertiary)' }} />
          <div className="h-3 w-16 rounded animate-skeleton" style={{ background: 'var(--fb-bg-tertiary)' }} />
        </div>
      </div>
      {/* Text skeleton */}
      <div className="h-4 w-full rounded animate-skeleton mb-1.5" style={{ background: 'var(--fb-bg-tertiary)' }} />
      <div className="h-4 w-3/4 rounded animate-skeleton mb-3" style={{ background: 'var(--fb-bg-tertiary)' }} />
      {/* Media skeleton */}
      <div className="w-full h-48 rounded animate-skeleton" style={{ background: 'var(--fb-bg-tertiary)' }} />
    </div>
  );
}
