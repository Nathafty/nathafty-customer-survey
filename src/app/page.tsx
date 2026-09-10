import Image from 'next/image';
import Link from 'next/link';
import { Recycle, Globe, Truck, CheckCircle2, Leaf, Camera, ClipboardList } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────
   PAGE D'ACCUEIL — vitrine Nathafty
───────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-600 to-primary-500 text-white">
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
          <p className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-secondary-300 mb-2">
            <Recycle className="w-6 h-6" aria-hidden="true" />
            Moins de déchets, Plus d&apos;avenir
            <Recycle className="w-6 h-6" aria-hidden="true" />
          </p>
          <p className="text-primary-100 text-sm sm:text-base mb-10 max-w-xl mx-auto">
            Ensemble, construisons un avenir durable pour nos quartiers et notre planète.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/connexion" className={cn(buttonVariants('secondary', 'lg'), 'rounded-full')}>
              Accéder à mon compte
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center min-h-11 gap-2 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-semibold text-base px-6 py-3.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Devenir client
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUI SOMMES-NOUS ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="card text-center">
          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-primary-500" aria-hidden="true" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Qui sommes-nous ?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            <strong className="text-primary-700">Nathafty</strong> est une entreprise mauritanienne spécialisée dans la{' '}
            <strong>collecte et la gestion des déchets ménagers</strong>. Notre mission est simple :
            offrir un service de ramassage propre, régulier et accessible à chaque foyer,
            pour des quartiers plus sains et un environnement préservé.
          </p>
        </div>
      </section>

      {/* ── CE QU'ON PROPOSE ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
          Ce que nous proposons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="card text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
              <Truck className="w-5 h-5 text-primary-500" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Collecte à domicile</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Passage régulier devant chez vous pour ramasser vos déchets, selon un calendrier fixe adapté à votre quartier.
            </p>
          </div>

          <div className="card text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-5 h-5 text-primary-500" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Service fiable & ponctuel</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fini les déchets qui s&apos;accumulent. Notre équipe s&apos;engage sur des horaires respectés et un suivi de qualité.
            </p>
          </div>

          <div className="card text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-11 h-11 rounded-full bg-secondary-50 flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-5 h-5 text-secondary-600" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Éco-responsable</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nous orientons les déchets vers les bonnes filières pour réduire l&apos;impact environnemental dans nos villes.
            </p>
          </div>

        </div>
      </section>

      {/* ── LIENS PUBLICS ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/activites" className="card text-center hover:shadow-md transition-shadow duration-200">
          <div className="w-11 h-11 rounded-full bg-secondary-50 flex items-center justify-center mx-auto mb-3">
            <Camera className="w-5 h-5 text-secondary-600" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Nos activités</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Découvrez nos actions sur le terrain (nettoyages de dépôts sauvages, sensibilisation...).
          </p>
        </Link>
        <Link href="/enquete" className="card text-center hover:shadow-md transition-shadow duration-200">
          <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
            <ClipboardList className="w-5 h-5 text-primary-500" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Enquête de satisfaction</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Vous n&apos;êtes pas encore client ? Aidez-nous à comprendre vos besoins (moins de 2 minutes).
          </p>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs py-6">
        © {new Date().getFullYear()} Nathafty — Tous droits réservés
      </footer>

    </main>
  );
}
