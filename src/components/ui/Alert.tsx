import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'success' | 'danger';

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  success: 'bg-emerald-50 border-emerald-500 text-emerald-800',
  danger: 'bg-red-50 border-red-500 text-red-800',
};

const VARIANT_ICON = {
  success: CheckCircle2,
  danger: AlertCircle,
};

export function Alert({
  variant,
  children,
  className,
}: {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = VARIANT_ICON[variant];
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={cn('flex items-start gap-2 border-l-4 p-3 rounded-lg text-sm', VARIANT_CLASSES[variant], className)}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
