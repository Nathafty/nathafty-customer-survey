'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { loginAction, type LoginActionState } from './actions';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

const initialState: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending} className="w-full sm:w-auto sm:px-12">
      <LogIn className="w-4 h-4" aria-hidden="true" />
      Se connecter
    </Button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="card space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Téléphone
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field" placeholder="Ex: +222 12 34 56 78" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input id="password" name="password" type="password" required className="input-field" />
      </div>

      {state.error && <Alert variant="danger">{state.error}</Alert>}

      <div className="flex flex-col items-center gap-3 pt-2">
        <SubmitButton />
        <Link href="/inscription" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Pas encore client ? S&apos;inscrire
        </Link>
      </div>
    </form>
  );
}
