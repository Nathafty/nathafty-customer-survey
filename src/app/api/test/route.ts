import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/test - Tester les routes API
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'API fonctionne correctement',
    timestamp: new Date().toISOString(),
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
  });
}
