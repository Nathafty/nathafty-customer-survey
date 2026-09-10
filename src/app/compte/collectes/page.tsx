import { Truck, User as UserIcon } from 'lucide-react';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice } from '@/lib/backofficeClient';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

export const dynamic = 'force-dynamic';

interface CollectionRow {
  id: number;
  status: string;
  collection_date: string | null;
  completed_at: string | null;
  proof_photo_url: string | null;
  driver_note: string | null;
  skip_reason: string | null;
  collections: {
    title: string;
    zone: string | null;
    scheduled_date: string | null;
    status: string;
    drivers: { name: string } | null;
  } | null;
}

function offsetIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function statusBadge(row: CollectionRow): { variant: BadgeVariant; label: string } {
  if (row.status === 'done') return { variant: 'success', label: 'Effectuée' };
  if (row.status === 'skipped') return { variant: 'danger', label: 'Non collectée' };
  if (row.collections?.status === 'PROGRESS') return { variant: 'warning', label: 'En cours' };
  return { variant: 'info', label: 'Prévue' };
}

export default async function CollectesPage() {
  const token = await requireAccessToken();

  const rows = await fetchBackoffice<CollectionRow[]>('/collections', {
    token,
    searchParams: { from: offsetIso(-90), to: offsetIso(30) },
  });

  const sorted = [...rows].sort((a, b) =>
    (b.collection_date ?? '').localeCompare(a.collection_date ?? ''),
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Mes collectes</h1>

      {sorted.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="Aucune collecte prévue pour le moment"
          description="Vos prochaines collectes apparaîtront ici une fois planifiées."
        />
      ) : (
        <div className="space-y-3">
          {sorted.map((row) => {
            const badge = statusBadge(row);
            return (
              <Card key={row.id}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900">{row.collections?.title ?? 'Collecte'}</p>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">{row.collection_date}</p>
                {row.collections?.drivers?.name && (
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    Collecteur : {row.collections.drivers.name}
                  </p>
                )}
                {row.status === 'skipped' && row.skip_reason && (
                  <p className="text-xs text-amber-700 mt-1">Motif : {row.skip_reason}</p>
                )}
                {row.driver_note && (
                  <p className="text-xs text-gray-500 mt-1">Note : {row.driver_note}</p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
