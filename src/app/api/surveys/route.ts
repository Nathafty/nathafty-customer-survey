import { NextRequest, NextResponse } from 'next/server';
import { createSurvey, checkDuplicatePhone, getAllSurveys } from '@/services/surveyService';

// Types pour la validation
interface SurveyRequestBody {
  name: string;
  phone: string;
  whatsapp?: string;
  trashFrequency: string;
  bagsPerWeek: string | number;
  bagType: string;
  mainConcern: string;
  paysService: 'Oui' | 'Non';
  monthlyPayment?: string;
}

/**
 * Validation des données du formulaire
 */
function validateSurveyData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Le nom est requis');
  }

  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length === 0) {
    errors.push('Le numéro de téléphone est requis');
  }

  if (!data.trashFrequency || typeof data.trashFrequency !== 'string') {
    errors.push('La fréquence de sortie des poubelles est requise');
  }

  if (!data.bagsPerWeek || isNaN(Number(data.bagsPerWeek)) || Number(data.bagsPerWeek) < 0) {
    errors.push('Le nombre de sacs par semaine doit être un nombre positif');
  }

  if (!data.bagType || typeof data.bagType !== 'string') {
    errors.push('Le type de contenant est requis');
  }

  if (!data.mainConcern || typeof data.mainConcern !== 'string' || data.mainConcern.trim().length === 0) {
    errors.push('La principale préoccupation est requise');
  }

  if (!data.paysService || !['Oui', 'Non'].includes(data.paysService)) {
    errors.push('Veuillez indiquer si vous payez un service de collecte');
  }

  if (data.paysService === 'Oui' && (!data.monthlyPayment || data.monthlyPayment.trim().length === 0)) {
    errors.push('Le montant mensuel est requis si vous payez un service');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * POST /api/surveys - Créer une nouvelle enquête
 */
export async function POST(request: NextRequest) {
  try {
    const body: SurveyRequestBody = await request.json();

    // Validation des données
    const validation = validateSurveyData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Vérifier les doublons (optionnel)
    const isDuplicate = await checkDuplicatePhone(body.phone);
    if (isDuplicate) {
      console.warn(`⚠️ Tentative de soumission en double pour le téléphone: ${body.phone}`);
    }

    // Récupérer les métadonnées
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Préparer les données pour Supabase
    const surveyData = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      whatsapp: body.whatsapp?.trim() || undefined,
      trash_frequency: body.trashFrequency,
      bags_per_week: Number(body.bagsPerWeek),
      bag_type: body.bagType,
      main_concern: body.mainConcern.trim(),
      pays_service: body.paysService === 'Oui',
      monthly_payment: body.monthlyPayment?.trim() || undefined,
    };

    // Insérer dans Supabase
    const surveyId = await createSurvey(surveyData, ipAddress, userAgent);

    console.log(`✅ Enquête créée avec succès - ID: ${surveyId}, Téléphone: ${body.phone}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Enquête enregistrée avec succès',
        data: {
          id: surveyId,
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('❌ Erreur lors de la création de l\'enquête:', error);

    if (error.message.includes('Erreur base de données')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur de connexion à la base de données',
          message: 'Impossible d\'enregistrer l\'enquête. Veuillez réessayer plus tard.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        message: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/surveys - Récupérer la liste des enquêtes
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get('limit')) || 100;
    const offset = Number(searchParams.get('offset')) || 0;

    const surveys = await getAllSurveys(limit, offset);

    return NextResponse.json(
      {
        success: true,
        data: surveys,
        pagination: {
          limit,
          offset,
          total: surveys.length,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération des enquêtes:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        message: 'Impossible de récupérer les enquêtes.',
      },
      { status: 500 }
    );
  }
}
