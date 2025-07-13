"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProductCard() {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 px-3 py-3 mb-6">
      <Card className="flex flex-col h-full border shadow-none py-0 rounded-none">
        <CardHeader className="p-0 relative h-[431px] overflow-hidden">
          <Skeleton className="absolute top-0 left-0 w-full h-full object-cover z-10" />
        </CardHeader>

        <CardContent className="p-3 flex flex-col flex-grow">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex justify-between items-end mt-auto">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
