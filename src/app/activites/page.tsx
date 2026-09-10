import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export const dynamic = 'force-dynamic';

interface ActivityPost {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  zone: string | null;
  event_date: string | null;
}

async function getPublishedActivities(): Promise<ActivityPost[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('activity_posts')
    .select('id, title, description, cover_image_url, zone, event_date')
    .eq('is_published', true)
    .order('event_date', { ascending: false });
  if (error) {
    console.error('Erreur chargement activity_posts:', error);
    return [];
  }
  return data as ActivityPost[];
}

export default async function ActivitesPage() {
  const activities = await getPublishedActivities();

  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-5 min-h-11">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Nos activités</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Nettoyages de quartiers, sensibilisation... suivez nos actions sur le terrain.
          </p>
        </div>

        {activities.length === 0 ? (
          <EmptyState
            icon={Camera}
            title="Aucune publication pour le moment"
            description="Revenez bientôt pour suivre nos actions sur le terrain."
          />
        ) : (
          <div className="space-y-5">
            {activities.map((activity) => (
              <Card key={activity.id} as="article">
                {activity.cover_image_url && (
                  <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden mb-4 bg-gray-200">
                    <Image
                      src={activity.cover_image_url}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{activity.title}</h2>
                <p className="text-xs text-gray-500 mb-3">
                  {[activity.zone, activity.event_date].filter(Boolean).join(' · ')}
                </p>
                {activity.description && (
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {activity.description}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
