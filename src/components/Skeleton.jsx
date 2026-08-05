// Lightweight shimmer skeleton blocks — used as Suspense fallbacks so lazy
// sections preview their shape instead of showing a plain "Loading..." text.
// Pure CSS animation (see .skeleton in index.css); zero dependencies.

export default function Skeleton({ width, height, radius = 12, style }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <Skeleton height={140} radius={0} />
      <div className="skeleton-card-body">
        <Skeleton width="72%" height={18} />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} width={`${100 - i * 14}%`} height={12} radius={6} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3, lines = 3 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={lines} />
      ))}
    </div>
  );
}

// Full-page skeleton shown while a lazy route chunk loads.
export function PageSkeleton() {
  return (
    <div className="section" style={{ paddingTop: "28px" }}>
      <Skeleton height={92} radius={24} style={{ marginBottom: 26 }} />
      <Skeleton
        width="56%"
        height={16}
        radius={8}
        style={{ marginBottom: 40 }}
      />
      <SkeletonGrid count={3} lines={3} />
    </div>
  );
}
