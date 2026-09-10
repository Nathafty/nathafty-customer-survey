import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Spinner({ className, label = 'Chargement...' }: { className?: string; label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2">
      <Loader2 className={cn('w-5 h-5 animate-spin text-primary-500', className)} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
