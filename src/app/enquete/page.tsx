'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import SurveyForm from '@/components/SurveyForm';
import ResultsChart from '@/components/ResultsChart';

type Step = 'survey' | 'results';

export default function EnquetePage() {
  const [step, setStep] = useState<Step>('survey');
  const [surveyData, setSurveyData] = useState<any>(null);

  const handleSurveySubmit = (data: any) => {
    setSurveyData(data);
    setStep('results');
  };

  const handleReset = () => {
    setSurveyData(null);
    setStep('survey');
  };

  if (step === 'survey') {
    return (
      <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-5 min-h-11"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>

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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
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

  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="card">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-gray-900">
              <PartyPopper className="w-5 h-5 text-secondary-600" aria-hidden="true" />
              Merci pour votre participation !
            </h3>
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-primary-600 underline transition-colors flex-shrink-0"
            >
              Nouvelle réponse
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
