-- Table pour enregistrer les enquêtes des ménages (Supabase PostgreSQL)
-- À créer dans Supabase SQL Editor

CREATE TABLE household_surveys (
    -- Identifiant unique
    id BIGSERIAL PRIMARY KEY,
    
    -- Informations de contact
    name VARCHAR(255) NOT NULL COMMENT 'Nom du ménage',
    phone VARCHAR(20) NOT NULL COMMENT 'Numéro de téléphone',
    whatsapp VARCHAR(20) NULL COMMENT 'Numéro WhatsApp (optionnel)',
    
    -- Question 1: Fréquence de sortie des poubelles
    trash_frequency VARCHAR(50) NOT NULL COMMENT 'Fréquence de sortie: Tous les jours, 2-3 fois par semaine, etc.',
    
    -- Question 2: Production de déchets
    bags_per_week INT NOT NULL COMMENT 'Nombre de sacs/barils par semaine',
    bag_type VARCHAR(50) NOT NULL COMMENT 'Type: Petits sacs, Moyens sacs, Grands sacs, Barile, Mixte',
    
    -- Question 3: Principale préoccupation
    main_concern TEXT NOT NULL COMMENT 'Description de la principale préoccupation',
    
    -- Question 4: Service de collecte
    pays_service BOOLEAN NOT NULL DEFAULT FALSE,
    monthly_payment VARCHAR(50),
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    
);

-- Index pour optimisation
CREATE INDEX idx_phone ON household_surveys(phone);
CREATE INDEX idx_created_at ON household_surveys(created_at);
CREATE INDEX idx_trash_frequency ON household_surveys(trash_frequency);
CREATE INDEX idx_bag_type ON household_surveys(bag_type);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_household_surveys_updated_at 
    BEFORE UPDATE ON household_surveys 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE household_surveys ENABLE ROW LEVEL SECURITY;
SERIAL PRIMARY KEY,
    survey_id BIGINT NOT NULL REFERENCES household_surveys(id) ON DELETE CASCADE,
    phone VARCHAR(20) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_phone_submitted ON submission_log(phone, submitted_at)

-- Vue pour statistiques rapides
CREATE VIEW survey_statistics AS
SELECT 
    COUNT(*) as total_surveys,
    trash_frequency,
    AVG(bags_per_week) as avg_bags_per_week,
    bag_type,
    SUM(CASE WHEN pays_service = 'Oui' THEN 1 ELSE 0 END) as paying_customers,
    DATE(created_at) as survey_date
FROM household_surveys
GROUP BY trash_frequency, bag_type, DATE(created_at);


-- Table pour suivre les soumissions multiples (optionnel)
CREATE TABLE submission_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    survey_id BIGINT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (survey_id) REFERENCES household_surveys(id) ON DELETE CASCADE,
    INDEX idx_phone_submitted (phone, submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Log des soumissions pour détecter les doublons';
