import "server-only";

const BACKOFFICE_API_URL = process.env.BACKOFFICE_API_URL ?? "";

export class BackofficeApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

interface FetchBackofficeOptions {
  method?: "GET" | "POST";
  token?: string;
  body?: unknown;
  searchParams?: Record<string, string>;
}

/**
 * Appel serveur-à-serveur vers les endpoints `/api/customer/*` de nathafty-backoffice.
 * Toujours appelé depuis un Server Component / Server Action de customer-survey —
 * jamais depuis le navigateur (nathafty-backoffice n'a pas de CORS configuré).
 */
export async function fetchBackoffice<T>(
  path: string,
  { method = "GET", token, body, searchParams }: FetchBackofficeOptions = {},
): Promise<T> {
  if (!BACKOFFICE_API_URL) {
    throw new Error("BACKOFFICE_API_URL manquant dans l'environnement serveur");
  }

  const url = new URL(`/api/customer${path}`, BACKOFFICE_API_URL);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const error = json?.error ?? { code: "UNKNOWN", message: "Erreur inconnue" };
    throw new BackofficeApiError(error.code, error.message, res.status);
  }

  return json.data as T;
}
