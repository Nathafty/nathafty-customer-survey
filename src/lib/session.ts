import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Jeton d'accès de la session courante, pour les appels serveur-à-serveur vers
 * nathafty-backoffice. La revalidation de session (getUser) est déjà faite par
 * le middleware pour toute route /compte/** — ici on récupère juste le token.
 */
export async function requireAccessToken(): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  if (!data.session) redirect("/connexion");
  return data.session.access_token;
}
