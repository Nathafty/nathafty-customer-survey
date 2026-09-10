/**
 * Normalisation téléphone mauritanien → email synthétique Supabase Auth.
 * Copie intentionnelle de la logique de `nathafty-backoffice/src/core/dto/auth.ts`
 * (fonction pure, sans dépendance service-role) — garder les deux en synchronisation
 * si les règles de format changent.
 */
const EMAIL_DOMAIN = "nathafty.mr";

export class InvalidPhoneError extends Error {
  constructor() {
    super("Numéro de téléphone invalide (8 chiffres mauritaniens attendus)");
  }
}

/** Normalise un numéro mauritanien en 8 chiffres locaux. */
export function normalizeMrPhone(input: string): string {
  let digits = input.replace(/[\s.-]/g, "");
  digits = digits.replace(/^\+?00?222/, "").replace(/^\+/, "");
  if (/^222\d{8}$/.test(digits)) digits = digits.slice(3);
  if (!/^\d{8}$/.test(digits)) {
    throw new InvalidPhoneError();
  }
  return digits;
}

/** Email dédié dérivé du téléphone : <8 chiffres>@nathafty.mr. */
export function deriveEmail(phone8: string): string {
  return `${phone8}@${EMAIL_DOMAIN}`;
}
