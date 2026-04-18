'use client';

import { useState } from 'react';
import Image from 'next/image';
import SurveyForm from '@/components/SurveyForm';
import ResultsChart from '@/components/ResultsChart';

type Step = 'home' | 'survey' | 'results';

export default function Home() {
  const [step, setStep] = useState<Step>('home');
  const [surveyData, setSurveyData] = useState<any>(null);

  const handleSurveySubmit = (data: any) => {
    setSurveyData(data);
    setStep('results');
  };

  const handleReset = () => {
    setSurveyData(null);
    setStep('home');
  };

  /* ─────────────────────────────────────────
     PAGE D'ACCUEIL — vitrine Nathafty
  ───────────────────────────────────────── */
  if (step === 'home') {
    return (
      <main className="min-h-screen bg-gray-100">

        {/* ── HERO ── */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                <Image
                  src="/assets/nathafty.jpeg"
                  alt="Nathafty Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>

            {/* Nom + slogan */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Nathafty
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-300 mb-2">
              ♻️ Moins de déchets, Plus d&apos;avenir ♻️
            </p>
            <p className="text-blue-200 text-sm sm:text-base mb-10 max-w-xl mx-auto">
              Ensemble, construisons un avenir durable pour nos quartiers et notre planète.
            </p>

            {/* CTA principal */}
            <button
              onClick={() => setStep('survey')}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-blue-900 font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-xl transition-all duration-200"
            >
              Participer à l&apos;enquête
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* ── QUI SOMMES-NOUS ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="card text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3">
              Qui sommes-nous ?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              <strong className="text-blue-800">Nathafty</strong> est une entreprise mauritanienne spécialisée dans la{' '}
              <strong>collecte et la gestion des déchets ménagers</strong>. Notre mission est simple :
              offrir un service de ramassage propre, régulier et accessible à chaque foyer,
              pour des quartiers plus sains et un environnement préservé.
            </p>
          </div>
        </section>

        {/* ── CE QU'ON PROPOSE ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 text-center mb-6">
            Ce que nous proposons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="card text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-3xl mb-3">🚛</div>
              <h3 className="font-bold text-blue-800 mb-2">Collecte à domicile</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Passage régulier devant chez vous pour ramasser vos déchets, selon un calendrier fixe adapté à votre quartier.
              </p>
            </div>

            <div className="card text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-bold text-blue-800 mb-2">Service fiable & ponctuel</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fini les déchets qui s&apos;accumulent. Notre équipe s&apos;engage sur des horaires respectés et un suivi de qualité.
              </p>
            </div>

            <div className="card text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-bold text-blue-800 mb-2">Éco-responsable</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nous orientons les déchets vers les bonnes filières pour réduire l&apos;impact environnemental dans nos villes.
              </p>
            </div>

          </div>
        </section>

        {/* ── APPEL À L'ENQUÊTE ── */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Votre avis compte pour nous
            </h2>
            <p className="text-green-100 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Nous sommes en train de construire le meilleur service possible. Répondez à notre
              enquête courte (moins de 2 minutes) pour nous aider à comprendre vos besoins.
            </p>
            <button
              onClick={() => setStep('survey')}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 active:scale-95 text-emerald-700 font-bold text-base px-8 py-3.5 rounded-full shadow-lg transition-all duration-200"
            >
              Remplir le formulaire maintenant
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-xs py-6">
          © {new Date().getFullYear()} Nathafty — Tous droits réservés
        </footer>

      </main>
    );
  }

  /* ─────────────────────────────────────────
     FORMULAIRE D'ENQUÊTE
  ───────────────────────────────────────── */
  if (step === 'survey') {
    return (
      <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">

          {/* Retour accueil */}
          <button
            onClick={() => setStep('home')}
            className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-900 mb-5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Retour à l&apos;accueil
          </button>

          {/* Header compact */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <Image
                  src="/assets/nathafty.jpeg"
                  alt="Nathafty Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">
              Enquête sur la Gestion des Déchets
            </h1>
            <p className="text-sm text-gray-500">
              Aidez-nous à comprendre vos besoins — moins de 2 minutes
            </p>
          </div>

          <SurveyForm onSubmit={handleSurveySubmit} />

          <footer className="mt-10 text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Nathafty — Tous droits réservés
          </footer>
        </div>
      </main>
    );
  }

  /* ─────────────────────────────────────────
     RÉSULTATS POST-SOUMISSION
  ───────────────────────────────────────── */
  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900">
              Merci pour votre participation ! 🎉
            </h3>
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-blue-700 underline transition-colors"
            >
              Retour à l&apos;accueil
            </button>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Vos réponses ont bien été enregistrées. Voici un aperçu de votre évaluation :
          </p>
        </div>

        <ResultsChart data={surveyData} />

        <footer className="text-center text-gray-400 text-xs pb-4">
          © {new Date().getFullYear()} Nathafty — Tous droits réservés
        </footer>
      </div>
    </main>
  );
}
