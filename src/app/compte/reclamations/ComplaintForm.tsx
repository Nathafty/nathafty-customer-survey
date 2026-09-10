'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Send } from 'lucide-react';
import { createComplaintAction, type ComplaintActionState } from './actions';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

const initialState: ComplaintActionState = {};

const CATEGORY_LABELS: Record<string, string> = {
  missed_collection: 'Collecte manquée',
  damage: 'Dommage / dégât',
  billing: 'Facturation',
  other: 'Autre',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto sm:px-8">
      <Send className="w-4 h-4" aria-hidden="true" />
      Envoyer la réclamation
    </Button>
  );
}

export default function ComplaintForm() {
  const [state, formAction] = useFormState(createComplaintAction, initialState);

  return (
    <form action={formAction} className="card space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Nouvelle réclamation</h2>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie *
        </label>
        <select id="category" name="category" required className="input-field">
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea id="description" name="description" required rows={4} className="input-field resize-none" placeholder="Décrivez le problème rencontré..." />
      </div>

      {state.error && <Alert variant="danger">{state.error}</Alert>}
      {state.success && <Alert variant="success">Votre réclamation a été envoyée.</Alert>}

      <SubmitButton />
    </form>
  );
}
