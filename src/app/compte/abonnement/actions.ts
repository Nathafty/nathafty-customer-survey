'use server';

import { revalidatePath } from 'next/cache';
import { requireAccessToken } from '@/lib/session';
import { fetchBackoffice, BackofficeApiError } from '@/lib/backofficeClient';

export interface RenewalActionState {
  error?: string;
  success?: boolean;
}

export async function requestRenewalAction(
  _prevState: RenewalActionState,
  formData: FormData,
): Promise<RenewalActionState> {
  const planId = Number(formData.get('plan_id'));
  if (!planId || planId <= 0) {
    return { error: 'Veuillez choisir un plan' };
  }

  const token = await requireAccessToken();

  try {
    await fetchBackoffice('/renewal-request', {
      method: 'POST',
      token,
      body: { plan_id: planId },
    });
  } catch (err) {
    if (err instanceof BackofficeApiError) {
      if (err.code === 'RENEWAL_ALREADY_PENDING') {
        return { error: 'Une demande de renouvellement est déjà en attente de traitement.' };
      }
      return { error: err.message };
    }
    return { error: 'Erreur lors de la demande de renouvellement.' };
  }

  revalidatePath('/compte/abonnement');
  return { success: true };
}
