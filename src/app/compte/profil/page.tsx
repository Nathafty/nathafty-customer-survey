import { Home, Building2, LogOut } from 'lucide-react';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice } from '@/lib/backofficeClient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { logoutAction } from '../actions';
import ProfileForm from './ProfileForm';

export const dynamic = 'force-dynamic';

interface HouseholdProfile {
  name: string;
  phone: string;
  type: 'MAISON' | 'ETABLISSEMENT';
  address: string | null;
  address_details: string | null;
  whatsapp: string | null;
}

export default async function ProfilPage() {
  const token = await requireAccessToken();
  const household = await fetchBackoffice<HouseholdProfile>('/household', { token });
  const TypeIcon = household.type === 'MAISON' ? Home : Building2;

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Mon compte</h1>

      <Card className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
          <TypeIcon className="w-5 h-5 text-primary-500" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{household.name}</p>
          <p className="text-sm text-gray-500">
            {household.type === 'MAISON' ? 'Maison' : 'Établissement'} · +222 {household.phone}
          </p>
        </div>
      </Card>

      <ProfileForm household={household} />

      <form action={logoutAction}>
        <Button type="submit" variant="outline" className="w-full">
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Se déconnecter
        </Button>
      </form>
    </>
  );
}
