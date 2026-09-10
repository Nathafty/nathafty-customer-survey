import { MessageCircleWarning } from 'lucide-react';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice } from '@/lib/backofficeClient';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import ComplaintForm from './ComplaintForm';

export const dynamic = 'force-dynamic';

interface ComplaintRow {
  id: string;
  ticket_number: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  response: string | null;
  submitted_date: string;
}

const STATUS_BADGE: Record<string, { variant: BadgeVariant; label: string }> = {
  open: { variant: 'info', label: 'Ouverte' },
  in_progress: { variant: 'warning', label: 'En cours' },
  resolved: { variant: 'success', label: 'Résolue' },
  closed: { variant: 'neutral', label: 'Fermée' },
};

export default async function ReclamationsPage() {
  const token = await requireAccessToken();
  const complaints = await fetchBackoffice<ComplaintRow[]>('/complaints', { token });

  const sorted = [...complaints].sort((a, b) => b.submitted_date.localeCompare(a.submitted_date));

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Mes réclamations</h1>

      <ComplaintForm />

      {sorted.length === 0 ? (
        <EmptyState
          icon={MessageCircleWarning}
          title="Aucune réclamation pour le moment"
          description="Un souci avec une collecte ? Utilisez le formulaire ci-dessus."
        />
      ) : (
        <div className="space-y-3">
          {sorted.map((c) => {
            const badge = STATUS_BADGE[c.status] ?? { variant: 'neutral' as const, label: c.status };
            return (
              <Card key={c.id}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900">{c.ticket_number}</p>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{c.description}</p>
                {c.response && (
                  <p className="text-sm text-emerald-800 mt-2 border-l-4 border-emerald-400 pl-2">
                    Réponse Nathafty : {c.response}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">{c.submitted_date}</p>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
