'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateProfileAction, type ProfileActionState } from './actions';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface HouseholdProfile {
  name: string;
  phone: string;
  type: 'MAISON' | 'ETABLISSEMENT';
  address: string | null;
  address_details: string | null;
  whatsapp: string | null;
}

const initialState: ProfileActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto sm:px-8">
      Enregistrer
    </Button>
  );
}

export default function ProfileForm({ household }: { household: HouseholdProfile }) {
  const [state, formAction] = useFormState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="card space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input value={household.phone} disabled className="input-field bg-gray-100 text-gray-500" />
        <p className="text-xs text-gray-400 mt-1">Le téléphone ne peut pas être modifié ici.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
        <input id="name" name="name" defaultValue={household.name} className="input-field" />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
        <input id="whatsapp" name="whatsapp" defaultValue={household.whatsapp ?? ''} className="input-field" />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
        <input id="address" name="address" defaultValue={household.address ?? ''} className="input-field" />
      </div>

      <div>
        <label htmlFor="address_details" className="block text-sm font-medium text-gray-700 mb-1">
          Précisions d&apos;adresse
        </label>
        <textarea id="address_details" name="address_details" rows={2} defaultValue={household.address_details ?? ''} className="input-field resize-none" />
      </div>

      {state.error && <Alert variant="danger">{state.error}</Alert>}
      {state.success && <Alert variant="success">Profil mis à jour.</Alert>}

      <SubmitButton />
    </form>
  );
}
