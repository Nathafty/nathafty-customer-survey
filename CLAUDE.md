# nathafty-customer-survey

## Description du projet

Application web de **prospection client** pour **Nathafty**, une entreprise de gestion des déchets. L'objectif est de collecter des données auprès des ménages pour mesurer leurs habitudes de gestion des déchets et leur appétence à payer pour un service de collecte.

Le slogan : *"Moins de déchets, Plus d'avenir"*

Marché cible : Mauritanie (numéros au format `+222`, devise MRU — Ouguiya mauritanien).

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 18 + Tailwind CSS 3 |
| Backend/DB | Supabase (PostgreSQL) |
| Hébergement | (à définir) |

---

## Fonctionnalités

1. **Formulaire d'enquête** (`SurveyForm`) — collecte :
   - Nom complet, téléphone, WhatsApp (optionnel)
   - Fréquence de sortie des poubelles
   - Nombre de sacs/barils produits par semaine + type de contenant
   - Principale préoccupation en matière de gestion des déchets
   - Si le ménage paie déjà un service de collecte (et combien)

2. **Résultats post-soumission** (`ResultsChart`) — affichage d'un récapitulatif après envoi du formulaire.

3. **API Route** `POST /api/surveys` — reçoit les données du formulaire et les insère dans Supabase.

---

## Structure des fichiers clés

```
src/
  app/
    page.tsx              # Page principale (affiche SurveyForm ou ResultsChart)
    layout.tsx            # Layout global
    api/surveys/          # API Route Next.js — insertion en base
  components/
    SurveyForm.tsx        # Formulaire d'enquête
    ResultsChart.tsx      # Affichage des résultats
  lib/
    supabase.ts           # Clients Supabase (anon + admin)
  services/
    surveyService.ts      # CRUD Supabase : household_surveys
```

---

## Base de données Supabase

Table : **`household_surveys`**

| Colonne | Type | Description |
|---|---|---|
| id | int | Clé primaire |
| name | text | Nom du répondant |
| phone | text | Téléphone (utilisé comme clé anti-doublon) |
| whatsapp | text | WhatsApp optionnel |
| trash_frequency | text | Fréquence de sortie des poubelles |
| bags_per_week | int | Nombre de sacs/barils par semaine |
| bag_type | text | Type de contenants |
| main_concern | text | Principale préoccupation |
| pays_service | bool | Paie déjà un service ? |
| monthly_payment | text | Montant estimé par collecte |
| ip_address | text | IP du répondant |
| user_agent | text | User-agent du navigateur |
| created_at | timestamp | Date de création |

---

## Variables d'environnement requises

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Fichier de référence : `.env.local.example`

---

## Commandes utiles

```bash
npm run dev     # Lancer en développement
npm run build   # Build de production
npm run lint    # Linter
```
