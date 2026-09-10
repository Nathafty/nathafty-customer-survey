'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice, BackofficeApiError } from '@/lib/backofficeClient';

const profileSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  address: z.string().max(2000).optional(),
  address_details: z.string().max(2000).optional(),
  whatsapp: z.string().max(32).optional(),
});

export interface ProfileActionState {
  error?: string;
  success?: boolean;
}

function optionalField(value: FormDataEntryValue | null): string | undefined {
  const str = (value as string) ?? '';
  return str.trim() === '' ? undefined : str;
}

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const parsed = profileSchema.safeParse({
    name: optionalField(formData.get('name')),
    address: optionalField(formData.get('address')),
    address_details: optionalField(formData.get('address_details')),
    whatsapp: optionalField(formData.get('whatsapp')),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Formulaire invalide' };
  }

  const token = await requireAccessToken();

  try {
    await fetchBackoffice('/household', { method: 'POST', token, body: parsed.data });
  } catch (err) {
    if (err instanceof BackofficeApiError) return { error: err.message };
    return { error: 'Erreur lors de la mise à jour du profil.' };
  }

  revalidatePath('/compte/profil');
  revalidatePath('/compte');
  return { success: true };
}
