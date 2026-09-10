import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LoginForm from './LoginForm';

export default function ConnexionPage() {
  return (
    <main className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-50">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 mb-5 min-h-11">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
              <Image src="/assets/nathafty.jpeg" alt="Nathafty Logo" fill className="object-contain p-1" priority />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Mon espace client</h1>
          <p className="text-sm text-gray-500">Connectez-vous avec votre numéro de téléphone</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
