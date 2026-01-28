'use client';

import { useState } from 'react';
import Image from 'next/image';
import SurveyForm from '@/components/SurveyForm';
import ResultsChart from '@/components/ResultsChart';

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [surveyData, setSurveyData] = useState<any>(null);

  const handleSurveySubmit = (data: any) => {
    setSurveyData(data);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setSurveyData(null);
  };

  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header avec Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/assets/nathafty.jpeg"
                alt="Nathafty Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 px-4">
            Nathafty
          </h1>
          
          {/* Slogan attrayant */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-secondary rounded-2xl p-4 sm:p-6 mb-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              ♻️ Moins de déchets, Plus d&apos;avenir ♻️
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Ensemble, construisons un avenir durable
            </p>
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-1 px-4 font-semibold">
            Enquête sur la Gestion des Déchets
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Aidez-nous à comprendre vos besoins en gestion des déchets
          </p>
        </div>

        {/* Formulaire ou Résultats */}
        {!showResults ? (
          <SurveyForm onSubmit={handleSurveySubmit} />
        ) : (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary">
                  Merci pour votre participation ! 🎉
                </h3>
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-600 hover:text-primary underline"
                >
                  Nouvelle réponse
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                Vos réponses ont été enregistrées avec succès. Voici un aperçu de votre évaluation :
              </p>
            </div>
            
            <ResultsChart data={surveyData} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Nathafty - Tous droits réservés</p>
        </div>
      </div>
    </main>
  );
}
