'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Repeat } from 'lucide-react';
import { requestRenewalAction, type RenewalActionState } from './actions';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

interface Plan {
  id: number;
  code: string;
  name: string;
  description: string | null;
  price_mru: number;
  duration_days: number;
  collections_per_week: number;
}

const initialState: RenewalActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto sm:px-8">
      <Repeat className="w-4 h-4" aria-hidden="true" />
      Demander le renouvellement
    </Button>
  );
}

export default function RenewalForm({ plans }: { plans: Plan[] }) {
  const [state, formAction] = useFormState(requestRenewalAction, initialState);

  if (state.success) {
    return <Alert variant="success">Votre demande a bien été envoyée. Notre équipe la traitera prochainement.</Alert>;
  }

  return (
    <form action={formAction} className="card space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Renouveler mon abonnement</h2>
      <div className="space-y-2">
        {plans.map((plan, i) => (
          <label
            key={plan.id}
            className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:ring-1 has-[:checked]:ring-primary-500"
          >
            <input
              type="radio"
              name="plan_id"
              value={plan.id}
              defaultChecked={i === 0}
              className="mt-1 w-4 h-4 accent-primary-500 flex-shrink-0"
            />
            <span className="flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-medium text-gray-900">{plan.name}</span>
                <span className="text-sm font-semibold text-primary-600 whitespace-nowrap">{plan.price_mru} MRU</span>
              </span>
              <span className="text-xs text-gray-500 block">
                {plan.duration_days} jours · {plan.collections_per_week}x/semaine
              </span>
              {plan.description && <span className="text-xs text-gray-400 block mt-0.5">{plan.description}</span>}
            </span>
          </label>
        ))}
      </div>

      {state.error && <Alert variant="danger">{state.error}</Alert>}

      <SubmitButton />
    </form>
  );
}
