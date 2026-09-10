import { Skeleton, ListSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <ListSkeleton count={3} />
    </div>
  );
}
