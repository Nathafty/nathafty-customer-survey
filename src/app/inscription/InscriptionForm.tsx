'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Home, Building2, MapPin, UserPlus } from 'lucide-react';
import { registerAction, type RegisterActionState } from './actions';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';

interface District {
  id: number;
  name: string;
}

const initialState: RegisterActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto sm:px-12">
      <UserPlus className="w-4 h-4" aria-hidden="true" />
      M&apos;inscrire
    </Button>
  );
}

export default function InscriptionForm({ districts }: { districts: District[] }) {
  const [state, formAction] = useFormState(registerAction, initialState);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const captureLocation = () => {
    setGeoError(null);
    if (!navigator.geolocation) {
      setGeoError('Géolocalisation non disponible sur cet appareil');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoError('Impossible de récupérer votre position'),
    );
  };

  return (
    <form action={formAction} className="card space-y-4 sm:space-y-6">
      {coords && (
        <>
          <input type="hidden" name="latitude" value={coords.lat} />
          <input type="hidden" name="longitude" value={coords.lng} />
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vous êtes *</label>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={cn(
              'flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors',
              'hover:bg-gray-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:ring-1 has-[:checked]:ring-primary-500',
              'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 has-[:focus-visible]:ring-offset-2',
            )}
          >
            <input type="radio" name="household_type" value="MAISON" defaultChecked className="sr-only" />
            <Home className="w-6 h-6 text-primary-500" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-900">Une maison</span>
          </label>
          <label
            className={cn(
              'flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors',
              'hover:bg-gray-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:ring-1 has-[:checked]:ring-primary-500',
              'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500 has-[:focus-visible]:ring-offset-2',
            )}
          >
            <input type="radio" name="household_type" value="ETABLISSEMENT" className="sr-only" />
            <Building2 className="w-6 h-6 text-primary-500" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-900">Un établissement</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nom complet / raison sociale *
        </label>
        <input id="name" name="name" required className="input-field" placeholder="Votre nom" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone *
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field" placeholder="Ex: +222 12 34 56 78" />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe *
        </label>
        <input id="password" name="password" type="password" required minLength={6} className="input-field" placeholder="Au moins 6 caractères" />
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          WhatsApp (optionnel)
        </label>
        <input id="whatsapp" name="whatsapp" type="tel" className="input-field" placeholder="Ex: +222 12 34 56 78" />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse
        </label>
        <input id="address" name="address" className="input-field" placeholder="Quartier, rue, repère..." />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="district_id" className="block text-sm font-medium text-gray-700 mb-1">
            Quartier
          </label>
          <select id="district_id" name="district_id" className="input-field">
            <option value="">Sélectionner...</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="family_size" className="block text-sm font-medium text-gray-700 mb-1">
            Taille du foyer
          </label>
          <input id="family_size" name="family_size" type="number" min={1} className="input-field" placeholder="Ex: 5" />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={captureLocation}
          className="inline-flex items-center gap-1.5 min-h-11 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {coords ? 'Position capturée' : 'Capturer ma position GPS (optionnel)'}
        </button>
        {geoError && <p className="mt-1 text-sm text-red-600">{geoError}</p>}
      </div>

      {state.error && <Alert variant="danger">{state.error}</Alert>}

      <div className="flex flex-col items-center gap-3 pt-2">
        <SubmitButton />
        <Link href="/connexion" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Déjà client ? Se connecter
        </Link>
      </div>
    </form>
  );
}
