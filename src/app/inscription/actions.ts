'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { deriveEmail, normalizeMrPhone, InvalidPhoneError } from '@/lib/phone';
import { fetchBackoffice, BackofficeApiError } from '@/lib/backofficeClient';

const registerSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  password: z.string().min(6, 'Mot de passe trop court (min 6 caractères)'),
  household_type: z.enum(['MAISON', 'ETABLISSEMENT']),
  address: z.string().optional(),
  whatsapp: z.string().optional(),
  district_id: z.coerce.number().int().positive().optional(),
  family_size: z.coerce.number().int().positive().optional(),
  latitude: z.coerce.number().min(-90).max(90).optional(),
  longitude: z.coerce.number().min(-180).max(180).optional(),
});

export interface RegisterActionState {
  error?: string;
}

function optionalField(value: FormDataEntryValue | null): string | undefined {
  const str = (value as string) ?? '';
  return str.trim() === '' ? undefined : str;
}

export async function registerAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    household_type: formData.get('household_type'),
    address: optionalField(formData.get('address')),
    whatsapp: optionalField(formData.get('whatsapp')),
    district_id: optionalField(formData.get('district_id')),
    family_size: optionalField(formData.get('family_size')),
    latitude: optionalField(formData.get('latitude')),
    longitude: optionalField(formData.get('longitude')),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Formulaire invalide' };
  }

  const dto = parsed.data;

  try {
    await fetchBackoffice('/register', { method: 'POST', body: dto });
  } catch (err) {
    if (err instanceof BackofficeApiError) {
      if (err.code === 'PHONE_ALREADY_USED') {
        return { error: 'Ce numéro est déjà enregistré. Essayez de vous connecter.' };
      }
      return { error: err.message };
    }
    return { error: "Erreur d'inscription. Réessayez plus tard." };
  }

  // Inscription réussie côté backoffice → on établit la session Supabase directement.
  let email: string;
  try {
    email = deriveEmail(normalizeMrPhone(dto.phone));
  } catch (err) {
    if (err instanceof InvalidPhoneError) {
      return { error: err.message };
    }
    throw err;
  }

  const supabase = await createSupabaseServerClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: dto.password,
  });
  if (signInError) {
    return {
      error:
        'Compte créé, mais la connexion automatique a échoué. Essayez de vous connecter manuellement.',
    };
  }

  redirect('/compte');
}
