'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice, BackofficeApiError } from '@/lib/backofficeClient';

const CATEGORIES = ['missed_collection', 'damage', 'billing', 'other'] as const;

const complaintSchema = z.object({
  category: z.enum(CATEGORIES),
  description: z.string().min(1, 'La description est requise').max(5000),
});

export interface ComplaintActionState {
  error?: string;
  success?: boolean;
}

export async function createComplaintAction(
  _prevState: ComplaintActionState,
  formData: FormData,
): Promise<ComplaintActionState> {
  const parsed = complaintSchema.safeParse({
    category: formData.get('category'),
    description: formData.get('description'),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Formulaire invalide' };
  }

  const token = await requireAccessToken();

  try {
    await fetchBackoffice('/complaints', { method: 'POST', token, body: parsed.data });
  } catch (err) {
    if (err instanceof BackofficeApiError) return { error: err.message };
    return { error: "Erreur lors de l'envoi de la réclamation." };
  }

  revalidatePath('/compte/reclamations');
  return { success: true };
}
