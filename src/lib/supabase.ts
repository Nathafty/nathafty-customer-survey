import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// Lire d'abord sans préfixe (server-only, recommandé), sinon avec NEXT_PUBLIC_ (fallback legacy)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';

// Client pour le frontend (avec anon key)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Client pour le backend (avec service role key - accès complet)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Vérifier la configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables Supabase manquantes. Vérifiez votre fichier .env.local');
}

export default supabase;
