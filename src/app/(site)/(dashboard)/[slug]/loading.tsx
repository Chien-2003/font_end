import LoadingProductCard from '@/components/skeleton/CardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="">
      <div className="relative w-full h-[300px] mb-3">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="mx-auto max-w-full md:px-4 xl:px-12 2xl:px-16 px-2 sm:px-2 lg:px-8 w-full h-full">
        <div className="flex flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
