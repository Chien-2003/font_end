import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function ProfilePageSkeleton() {
  return (
    <div className="mx-auto max-w-full md:px-4 lg:py-4 xl:px-12 2xl:px-16 px-4 sm:px-6 lg:px-8 w-full h-full animate-pulse">
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-32 h-6" />
          </div>
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col w-full items-start space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-6 w-32" />
          </div>
        </Card>
        <div className="md:col-span-3 space-y-2">
          <Card className="p-3 space-y-3">
            <div className="flex items-center flex-col justify-center space-y-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="">
                <Skeleton className="h-6 w-[230px]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              </div>
            </div>
            <div className="text-center m2-6">
              <Skeleton className="h-10 w-40 mx-auto rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
