import type { LucideIcon } from 'lucide-react';
import { Clock, AlertTriangle, CheckCircle2, XCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'info' | 'warning' | 'success' | 'danger' | 'neutral';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  info: 'bg-blue-50 text-blue-800',
  warning: 'bg-amber-50 text-amber-800',
  success: 'bg-emerald-50 text-emerald-800',
  danger: 'bg-red-50 text-red-800',
  neutral: 'bg-gray-100 text-gray-700',
};

const DEFAULT_ICON: Record<BadgeVariant, LucideIcon> = {
  info: Clock,
  warning: AlertTriangle,
  success: CheckCircle2,
  danger: XCircle,
  neutral: Circle,
};

interface BadgeProps {
  variant: BadgeVariant;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

/**
 * Pastille de statut : couleur + icône + texte toujours combinés (la couleur
 * n'est jamais l'unique porteuse de sens — voir la règle d'accessibilité du design system).
 */
export function Badge({ variant, icon, className, children }: BadgeProps) {
  const Icon = icon ?? DEFAULT_ICON[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
