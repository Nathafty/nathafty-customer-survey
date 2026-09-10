'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { deriveEmail, normalizeMrPhone, InvalidPhoneError } from '@/lib/phone';

const loginSchema = z.object({
  phone: z.string().min(1, 'Le téléphone est requis'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export interface LoginActionState {
  error?: string;
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    phone: formData.get('phone'),
    password: formData.get('password'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Formulaire invalide' };
  }

  let email: string;
  try {
    email = deriveEmail(normalizeMrPhone(parsed.data.phone));
  } catch (err) {
    if (err instanceof InvalidPhoneError) {
      return { error: err.message };
    }
    throw err;
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: 'Numéro ou mot de passe incorrect' };
  }

  redirect('/compte');
}
