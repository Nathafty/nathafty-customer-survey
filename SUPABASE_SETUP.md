# Configuration Supabase

## 📋 Étapes de Configuration

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet :
   - **Nom**: nathafty-surveys
   - **Base de données password**: (choisissez un mot de passe sécurisé)
   - **Région**: Choisissez la plus proche (ex: Europe West)

### 2. Créer la table

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Copiez et exécutez le contenu du fichier `database/schema.sql`
3. Vérifiez que la table `household_surveys` est créée dans **Table Editor**

### 3. Configurer les variables d'environnement

1. Dans Supabase, allez dans **Settings** > **API**
2. Copiez les informations suivantes :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret!)

3. Créez le fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

4. Remplissez avec vos valeurs :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Tester la connexion

Lancez le serveur :

```bash
npm run dev
```

Testez l'API :

```bash
curl http://localhost:3000/api/health
```

Vous devriez voir :
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T...",
  "database": "connected",
  "statistics": {...}
}
```

## 🔒 Sécurité Row Level Security (RLS)

Les politiques RLS sont déjà configurées dans le schéma :

- ✅ **INSERT** : Tout le monde peut insérer (anon)
- ✅ **SELECT** : Tout le monde peut lire (anon)
- ❌ **UPDATE/DELETE** : Désactivé par défaut

### Modifier les politiques (optionnel)

Pour protéger l'accès en lecture, modifiez la policy :

```sql
-- Supprimer la policy publique
DROP POLICY "Enable read for all users" ON household_surveys;

-- Créer une policy pour service_role uniquement
CREATE POLICY "Enable read for service_role only" ON household_surveys
    FOR SELECT USING (auth.role() = 'service_role');
```

## 📊 Visualiser les données

### Option 1 : Dashboard Supabase
1. Allez dans **Table Editor**
2. Sélectionnez `household_surveys`
3. Visualisez et filtrez les données

### Option 2 : API
```bash
# Liste des enquêtes
curl http://localhost:3000/api/surveys

# Avec pagination
curl http://localhost:3000/api/surveys?limit=10&offset=0
```

## 🧪 Tester l'insertion

```bash
curl -X POST http://localhost:3000/api/surveys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+222 99999999",
    "whatsapp": "",
    "trashFrequency": "Tous les jours",
    "bagsPerWeek": "3",
    "bagType": "Moyens sacs",
    "mainConcern": "Test enquête",
    "paysService": "Non",
    "monthlyPayment": ""
  }'
```

## 📈 Statistiques et Analytics

Supabase fournit :
- 📊 Dashboard Analytics (SQL)
- 🔍 Logs des requêtes
- ⚡ Performances des requêtes
- 📦 Taille de la base de données

Accès : **Database** > **SQL Editor** > Créez vos requêtes custom

## 🚀 Déploiement

Les variables d'environnement doivent être configurées sur votre plateforme :

### Vercel
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### Netlify
Dans **Site settings** > **Environment variables**

## 🔧 Troubleshooting

### Erreur de connexion
- Vérifiez les variables d'environnement
- Vérifiez que le projet Supabase est actif
- Consultez les logs Supabase dans le dashboard

### Erreur d'insertion
- Vérifiez que la table existe
- Vérifiez les politiques RLS
- Consultez l'onglet **Logs** dans Supabase

### Erreur CORS
- Les requêtes client-side utilisent `supabase` (anon key)
- Les requêtes server-side utilisent `supabaseAdmin` (service role)

## 📚 Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
