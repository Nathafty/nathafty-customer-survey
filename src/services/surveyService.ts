import { supabaseAdmin } from '../lib/supabase';

export interface SurveyData {
  name: string;
  phone: string;
  whatsapp?: string;
  trash_frequency: string;
  bags_per_week: number;
  bag_type: string;
  main_concern: string;
  pays_service: boolean;
  monthly_payment?: string;
}

export interface SurveyRecord extends SurveyData {
  id: number;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Créer une nouvelle enquête dans Supabase
 */
export async function createSurvey(
  data: SurveyData,
  ipAddress?: string,
  userAgent?: string
): Promise<number> {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase non configuré');
    return 0;
  }
  
  try {
    const surveyData = {
      ...data,
      ip_address: ipAddress || null,
      user_agent: userAgent || null,
    };

    const { data: result, error } = await supabaseAdmin
      .from('household_surveys')
      .insert([surveyData])
      .select('id')
      .single();

    if (error) {
      console.error('❌ Erreur Supabase lors de l\'insertion:', error);
      throw new Error(`Erreur base de données: ${error.message}`);
    }

    return result.id;
  } catch (error: any) {
    console.error('❌ Erreur lors de la création de l\'enquête:', error);
    throw new Error(`Erreur: ${error.message}`);
  }
}

/**
 * Récupérer toutes les enquêtes
 */
export async function getAllSurveys(limit = 100, offset = 0): Promise<SurveyRecord[]> {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase non configuré');
    return [];
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('household_surveys')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Erreur Supabase lors de la récupération:', error);
      throw new Error(`Erreur base de données: ${error.message}`);
    }

    return data as SurveyRecord[];
  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération des enquêtes:', error);
    throw new Error(`Erreur: ${error.message}`);
  }
}

/**
 * Récupérer une enquête par ID
 */
export async function getSurveyById(id: number): Promise<SurveyRecord | null> {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase non configuré');
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('household_surveys')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Aucun résultat trouvé
      }
      console.error('❌ Erreur Supabase lors de la récupération:', error);
      throw new Error(`Erreur base de données: ${error.message}`);
    }

    return data as SurveyRecord;
  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération de l\'enquête:', error);
    throw new Error(`Erreur: ${error.message}`);
  }
}

/**
 * Vérifier si un téléphone existe déjà (détecter les doublons)
 */
export async function checkDuplicatePhone(phone: string): Promise<boolean> {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase non configuré');
    return false;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('household_surveys')
      .select('id')
      .eq('phone', phone)
      .limit(1);

    if (error) {
      console.error('❌ Erreur Supabase lors de la vérification:', error);
      throw new Error(`Erreur base de données: ${error.message}`);
    }

    return (data && data.length > 0);
  } catch (error: any) {
    console.error('❌ Erreur lors de la vérification du doublon:', error);
    throw new Error(`Erreur: ${error.message}`);
  }
}

/**
 * Obtenir les statistiques globales
 */
export async function getStatistics() {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase non configuré');
    return {
      total_surveys: 0,
      unique_households: 0,
      avg_bags_per_week: 0,
      paying_customers: 0,
      paying_percentage: 0
    };
  }

  try {
    // Compter le total d'enquêtes
    const { count: totalSurveys, error: countError } = await supabaseAdmin
      .from('household_surveys')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // Compter les téléphones uniques
    const { data: uniquePhones, error: phonesError } = await supabaseAdmin
      .from('household_surveys')
      .select('phone');

    if (phonesError) throw phonesError;

    const uniqueCount = new Set(uniquePhones?.map(p => p.phone)).size;

    // Calculer la moyenne des sacs par semaine
    const { data: bagsData, error: bagsError } = await supabaseAdmin
      .from('household_surveys')
      .select('bags_per_week');

    if (bagsError) throw bagsError;

    const avgBags = bagsData && bagsData.length > 0
      ? bagsData.reduce((sum, item) => sum + item.bags_per_week, 0) / bagsData.length
      : 0;

    // Compter ceux qui paient un service
    const { count: payingCount, error: payingError } = await supabaseAdmin
      .from('household_surveys')
      .select('*', { count: 'exact', head: true })
      .eq('pays_service', true);

    if (payingError) throw payingError;

    return {
      total_surveys: totalSurveys || 0,
      unique_households: uniqueCount,
      avg_bags_per_week: parseFloat(avgBags.toFixed(2)),
      paying_customers: payingCount || 0,
      paying_percentage: totalSurveys ? parseFloat(((payingCount || 0) / totalSurveys * 100).toFixed(2)) : 0,
    };
  } catch (error: any) {
    console.error('❌ Erreur lors de la récupération des statistiques:', error);
    throw new Error(`Erreur: ${error.message}`);
  }
}


