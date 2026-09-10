import Link from 'next/link';
import { Home, Building2, Calendar, Repeat, MessageCircleWarning } from 'lucide-react';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice, BackofficeApiError } from '@/lib/backofficeClient';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface HouseholdProfile {
  id: string;
  name: string;
  type: 'MAISON' | 'ETABLISSEMENT';
  status: string;
  actif_remaining_days: number;
}

interface CollectionRow {
  id: number;
  status: string;
  collection_date: string | null;
  collections: { title: string; zone: string | null; scheduled_date: string | null } | null;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
function inDaysIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function subscriptionBadge(daysLeft: number): { variant: BadgeVariant; label: string } {
  if (daysLeft <= 0) return { variant: 'danger', label: 'Expiré' };
  if (daysLeft <= 7) return { variant: 'warning', label: 'Expire bientôt' };
  return { variant: 'success', label: 'Actif' };
}

export default async function CompteAccueilPage() {
  const token = await requireAccessToken();

  let household: HouseholdProfile;
  let upcoming: CollectionRow[];
  try {
    [household, upcoming] = await Promise.all([
      fetchBackoffice<HouseholdProfile>('/household', { token }),
      fetchBackoffice<CollectionRow[]>('/collections', {
        token,
        searchParams: { from: todayIso(), to: inDaysIso(30) },
      }),
    ]);
  } catch (err) {
    if (err instanceof BackofficeApiError && err.code === 'HOUSEHOLD_NOT_LINKED') {
      return (
        <EmptyState
          icon={Home}
          title="Aucun ménage rattaché"
          description="Contactez Nathafty pour régulariser votre inscription."
        />
      );
    }
    throw err;
  }

  const nextCollection = upcoming.find((c) => c.status !== 'done' && c.status !== 'skipped');
  const TypeIcon = household.type === 'MAISON' ? Home : Building2;
  const subBadge = subscriptionBadge(household.actif_remaining_days);

  return (
    <>
      <Card className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
          <TypeIcon className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Bonjour,</p>
          <h1 className="text-xl font-bold text-gray-900">{household.name}</h1>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-500">Abonnement</p>
            <Badge variant={subBadge.variant}>{subBadge.label}</Badge>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {household.actif_remaining_days}{' '}
            <span className="text-sm font-normal text-gray-500">jour(s) restant(s)</span>
          </p>
          <Link href="/compte/abonnement" className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
            Gérer mon abonnement →
          </Link>
        </Card>

        <Card>
          <p className="text-sm text-gray-500 mb-1">Prochaine collecte</p>
          {nextCollection ? (
            <>
              <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-500" aria-hidden="true" />
                {nextCollection.collections?.title ?? 'Collecte prévue'}
              </p>
              <p className="text-sm text-gray-500">{nextCollection.collection_date}</p>
            </>
          ) : (
            <p className="text-gray-400 text-sm">Aucune collecte planifiée pour le moment</p>
          )}
          <Link href="/compte/collectes" className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
            Voir toutes mes collectes →
          </Link>
        </Card>
      </div>

      <div className="flex gap-3">
        <Link href="/compte/abonnement" className={cn(buttonVariants('primary'), 'flex-1')}>
          <Repeat className="w-4 h-4" aria-hidden="true" />
          Renouveler
        </Link>
        <Link href="/compte/reclamations" className={cn(buttonVariants('outline'), 'flex-1')}>
          <MessageCircleWarning className="w-4 h-4" aria-hidden="true" />
          Réclamer
        </Link>
      </div>
    </>
  );
}
