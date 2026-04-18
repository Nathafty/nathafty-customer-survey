-- Requêtes SQL utiles pour l'analyse des données

-- 1. Insérer une nouvelle enquête
INSERT INTO household_surveys (
    name, phone, whatsapp, trash_frequency, bags_per_week, 
    bag_type, main_concern, pays_service, monthly_payment
) VALUES (
    'Mohamed Ahmed',
    '+222 12 34 56 78',
    '+222 12 34 56 78',
    'Tous les jours',
    3,
    'Moyens sacs',
    'Manque de bacs de collecte dans le quartier',
    'Non',
    NULL
);


-- 2. Récupérer toutes les enquêtes
SELECT * FROM household_surveys ORDER BY created_at DESC;


-- 3. Statistiques par fréquence de sortie
SELECT 
    trash_frequency,
    COUNT(*) as nombre_menages,
    ROUND(AVG(bags_per_week), 2) as moyenne_sacs_semaine
FROM household_surveys
GROUP BY trash_frequency
ORDER BY nombre_menages DESC;


-- 4. Statistiques par type de contenant
SELECT 
    bag_type,
    COUNT(*) as nombre_menages,
    ROUND(AVG(bags_per_week), 2) as moyenne_sacs_semaine
FROM household_surveys
GROUP BY bag_type
ORDER BY nombre_menages DESC;


-- 5. Ménages qui paient déjà un service
SELECT 
    name,
    phone,
    monthly_payment,
    created_at
FROM household_surveys
WHERE pays_service = 'Oui'
ORDER BY created_at DESC;


-- 6. Principales préoccupations (top 10)
SELECT 
    main_concern,
    COUNT(*) as occurrences
FROM household_surveys
GROUP BY main_concern
ORDER BY occurrences DESC
LIMIT 10;


-- 7. Production totale de déchets par jour
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_menages,
    SUM(bags_per_week) as total_sacs_semaine,
    ROUND(SUM(bags_per_week) / 7, 2) as total_sacs_jour
FROM household_surveys
GROUP BY DATE(created_at)
ORDER BY date DESC;


-- 8. Rechercher un ménage par téléphone
SELECT * FROM household_surveys 
WHERE phone = '+222 12 34 56 78';


-- 9. Statistiques globales
SELECT 
    COUNT(*) as total_enquetes,
    COUNT(DISTINCT phone) as menages_uniques,
    ROUND(AVG(bags_per_week), 2) as moyenne_sacs_semaine,
    SUM(CASE WHEN pays_service = 'Oui' THEN 1 ELSE 0 END) as payant_service,
    ROUND(100.0 * SUM(CASE WHEN pays_service = 'Oui' THEN 1 ELSE 0 END) / COUNT(*), 2) as pourcentage_payant
FROM household_surveys;


-- 10. Enquêtes des 7 derniers jours
SELECT 
    name,
    phone,
    trash_frequency,
    bags_per_week,
    bag_type,
    created_at
FROM household_surveys
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY created_at DESC;


-- 11. Exporter pour analyse (format CSV-friendly)
SELECT 
    id,
    name,
    phone,
    whatsapp,
    trash_frequency as 'Fréquence',
    bags_per_week as 'Sacs/Semaine',
    bag_type as 'Type Contenant',
    main_concern as 'Préoccupation',
    pays_service as 'Paie Service',
    monthly_payment as 'Montant MRU',
    DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') as 'Date Soumission'
FROM household_surveys
ORDER BY created_at DESC;


-- 12. Détecter les doublons potentiels (même téléphone)
SELECT 
    phone,
    COUNT(*) as nombre_soumissions,
    GROUP_CONCAT(name SEPARATOR ', ') as noms,
    MIN(created_at) as premiere_soumission,
    MAX(created_at) as derniere_soumission
FROM household_surveys
GROUP BY phone
HAVING COUNT(*) > 1
ORDER BY nombre_soumissions DESC;
