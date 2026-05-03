export default function HotelCardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800">
      <div className="aspect-4/3 skeleton" />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-10 rounded-md" />
          <div className="skeleton h-3 w-24 rounded-full" />
        </div>
        <div className="flex gap-3">
          <div className="skeleton h-3 w-10 rounded-full" />
          <div className="skeleton h-3 w-10 rounded-full" />
          <div className="skeleton h-3 w-10 rounded-full" />
        </div>
        <div className="skeleton h-px w-full rounded-full mt-1" />
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="skeleton h-2.5 w-8 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-lg" />
          </div>
          <div className="skeleton h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}