# Structure de Base de Données - Enquêtes Ménages

## 📊 Table Principale: `household_surveys`

Structure pour enregistrer une ligne par ménage ayant répondu à l'enquête.

### Champs

| Champ | Type | Description |
|-------|------|-------------|
| `id` | BIGINT | Identifiant unique auto-incrémenté |
| `name` | VARCHAR(255) | Nom du ménage (obligatoire) |
| `phone` | VARCHAR(20) | Numéro de téléphone (obligatoire) |
| `whatsapp` | VARCHAR(20) | Numéro WhatsApp (optionnel) |
| `trash_frequency` | VARCHAR(50) | Fréquence de sortie des poubelles |
| `bags_per_week` | INT | Nombre de sacs/barils par semaine |
| `bag_type` | VARCHAR(50) | Type de contenant (Petits/Moyens/Grands sacs, Barile, Mixte) |
| `main_concern` | TEXT | Principale préoccupation (texte libre) |
| `pays_service` | ENUM | Paie un service ? (Oui/Non) |
| `monthly_payment` | VARCHAR(50) | Montant mensuel en MRU (si applicable) |
| `created_at` | TIMESTAMP | Date et heure de soumission |
| `updated_at` | TIMESTAMP | Date de dernière modification |
| `ip_address` | VARCHAR(45) | Adresse IP (optionnel, pour sécurité) |
| `user_agent` | TEXT | Navigateur utilisé (optionnel) |

### Index

- `idx_phone` : Recherche rapide par téléphone
- `idx_created_at` : Tri et filtrage par date
- `idx_trash_frequency` : Statistiques par fréquence
- `idx_bag_type` : Statistiques par type de contenant

## 📈 Vue: `survey_statistics`

Vue pré-calculée pour statistiques rapides.

## 🔒 Table de Log: `submission_log`

Suivi optionnel des soumissions multiples pour détecter les doublons.

## 🚀 Utilisation

### 1. Créer la base de données

```sql
CREATE DATABASE nathafty_surveys 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE nathafty_surveys;
```

### 2. Importer le schéma

```bash
mysql -u username -p nathafty_surveys < schema.sql
```

### 3. Exemple d'insertion

Voir le fichier `queries.sql` pour des exemples complets.

## 📊 Statistiques Utiles

Le fichier `queries.sql` contient 12+ requêtes prêtes à l'emploi pour :

- ✅ Insérer des enquêtes
- 📊 Générer des statistiques
- 🔍 Rechercher des ménages
- 📈 Analyser les tendances
- 🚨 Détecter les doublons
- 📤 Exporter les données

## 🔧 Backends Compatibles

Cette structure fonctionne avec :
- MySQL 5.7+
- MariaDB 10.2+
- PostgreSQL (avec adaptations mineures)
- SQLite (avec adaptations mineures)

## 💡 Recommandations

1. **Index** : Les index sont optimisés pour les requêtes fréquentes
2. **Sauvegardes** : Planifier des sauvegardes régulières
3. **RGPD** : Considérer la durée de conservation des données personnelles
4. **Sécurité** : Utiliser des requêtes préparées (prepared statements)
