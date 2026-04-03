export default function SkeletonCard() {
  return (
    <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-6 space-y-4">
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
      <div className="flex gap-3 mt-4">
        <div className="skeleton h-10 w-20" />
        <div className="skeleton h-10 w-24" />
      </div>
    </div>
  );
}
