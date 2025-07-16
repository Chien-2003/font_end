import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
export function CartPageSkeleton() {
  const SkeletonItem = () => (
    <div className="flex gap-3 items-start border-b pb-4 last:border-b-0">
      <Skeleton className="h-4 w-4 mt-2" />
      <Skeleton className="w-[190px] h-[110px] rounded" />
      <div className="flex-1 space-y-2.5">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
      <Skeleton className="w-5 h-5 mt-1" />
    </div>
  );

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 animate-pulse">
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-4">
          <SkeletonItem />
          <SkeletonItem />
        </div>
        <div className="flex justify-between items-center mt-6">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-7 w-7" />
        </div>

        <div className="text-right mt-4 flex justify-end">
          <Skeleton className="h-10 w-44" />
        </div>
      </Card>
    </div>
  );
}
