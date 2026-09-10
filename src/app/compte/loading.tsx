import { Skeleton, CardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="space-y-4" role="status" aria-label="Chargement en cours">
      <CardSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
