'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Truck, Repeat, MessageCircleWarning, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/compte', label: 'Accueil', icon: Home },
  { href: '/compte/collectes', label: 'Collectes', icon: Truck },
  { href: '/compte/abonnement', label: 'Abonnement', icon: Repeat },
  { href: '/compte/reclamations', label: 'Réclamations', icon: MessageCircleWarning },
  { href: '/compte/profil', label: 'Compte', icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation principale"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-5">
        {NAV_ITEMS.map((item) => {
          // "Accueil" ne doit être actif que sur /compte exactement, pas sur ses sous-routes.
          const isActive =
            item.href === '/compte' ? pathname === '/compte' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center justify-center gap-0.5 min-h-11 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0"
            >
              <Icon
                className={cn('w-5 h-5', isActive ? 'text-primary-500' : 'text-gray-400')}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-[11px] leading-none',
                  isActive ? 'text-primary-500 font-semibold' : 'text-gray-400',
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
