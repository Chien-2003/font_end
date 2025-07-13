import LoadingProductCard from "@/components/skeleton/CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="relative w-full h-[556px] mb-8">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="flex flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingProductCard key={i} />
        ))}
      </div>
    </div>
  );
}
