import { NextRequest, NextResponse } from 'next/server';
import { testConnection, getStatistics } from '@/services/surveyService';

/**
 * GET /api/health - Vérifier l'état de santé de l'API et Supabase
 */
export async function GET(request: NextRequest) {
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'disconnected',
    statistics: null as any,
  };

  try {
    const dbConnected = await testConnection();
    healthCheck.database = dbConnected ? 'connected' : 'disconnected';

    if (dbConnected) {
      try {
        healthCheck.statistics = await getStatistics();
      } catch (error) {
        console.warn('Impossible de récupérer les statistiques:', error);
      }
    }

    const statusCode = dbConnected ? 200 : 503;

    return NextResponse.json(healthCheck, { status: statusCode });

  } catch (error: any) {
    console.error('❌ Erreur health check:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'error',
        error: error.message,
      },
      { status: 503 }
    );
  }
}
