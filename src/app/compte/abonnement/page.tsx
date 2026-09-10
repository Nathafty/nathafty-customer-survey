import { Repeat } from 'lucide-react';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice } from '@/lib/backofficeClient';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import RenewalForm from './RenewalForm';

export const dynamic = 'force-dynamic';

interface Plan {
  id: number;
  code: string;
  name: string;
  description: string | null;
  price_mru: number;
  duration_days: number;
  collections_per_week: number;
}

interface SubscriptionRow {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  subscription_plans: { name: string; price_mru: number } | null;
}

interface SubscriptionResponse {
  current: SubscriptionRow | null;
  history: SubscriptionRow[];
}

function statusBadge(status: string): { variant: BadgeVariant; label: string } {
  if (status === 'active') return { variant: 'success', label: 'Actif' };
  if (status === 'pending') return { variant: 'warning', label: 'En attente' };
  return { variant: 'neutral', label: status };
}

export default async function AbonnementPage() {
  const token = await requireAccessToken();

  const [subscription, plans] = await Promise.all([
    fetchBackoffice<SubscriptionResponse>('/subscription', { token }),
    fetchBackoffice<Plan[]>('/subscription-plans', { token }),
  ]);

  const current = subscription.current;
  const currentBadge = current ? statusBadge(current.status) : null;

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Mon abonnement</h1>

      {current && currentBadge ? (
        <Card>
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-gray-900">{current.subscription_plans?.name}</p>
            <Badge variant={currentBadge.variant}>{currentBadge.label}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Du {current.start_date} au {current.end_date}
          </p>
        </Card>
      ) : (
        <EmptyState icon={Repeat} title="Aucun abonnement actif" description="Choisissez un plan ci-dessous pour vous abonner." />
      )}

      <RenewalForm plans={plans} />

      {subscription.history.length > 0 && (
        <Card>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Historique</h2>
          <ul className="space-y-2 text-sm">
            {subscription.history.map((s) => (
              <li key={s.id} className="flex justify-between text-gray-600">
                <span>{s.subscription_plans?.name}</span>
                <span className="text-gray-400">{s.start_date} → {s.end_date}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
