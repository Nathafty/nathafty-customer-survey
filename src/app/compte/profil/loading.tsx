import { Skeleton, CardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
