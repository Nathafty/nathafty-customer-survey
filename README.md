# Nathafty Customer Survey

Application Next.js pour les enquêtes de satisfaction client Nathafty.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📋 Fonctionnalités

- ✅ Formulaire de questionnaire d'enquête complet
- ✅ Évaluation par étoiles (1-5)
- ✅ Visualisation des résultats avec Chart.js (graphique radar)
- ✅ Design responsive avec Tailwind CSS
- ✅ Logo Nathafty intégré
- ✅ Validation de formulaire
- ✅ Interface moderne et intuitive

## 🎨 Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Chart.js** (via CDN) - Visualisation de données

## 📦 Structure du projet

```
src/
├── app/
│   ├── layout.tsx      # Layout principal avec Chart.js CDN
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
└── components/
    ├── SurveyForm.tsx  # Composant du formulaire
    └── ResultsChart.tsx # Composant de visualisation
```

## 🎨 Couleurs du thème

- **Primaire (Bleu)**: #1e40af
- **Secondaire (Orange)**: #f59e0b
- **Accent (Vert)**: #10b981

## 📁 Assets

Le logo est situé dans [public/assets/nathafty.jpeg](public/assets/nathafty.jpeg)

## 💰 Devise

**MRU** (Ouguiya mauritanien)
