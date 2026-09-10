import Image from 'next/image';
import Link from 'next/link';

/**
 * Bandeau haut simple (logo + nom) pour l'espace client. Volontairement sans icône
 * de notifications : aucune UI de notifications n'est branchée côté PWA aujourd'hui
 * (l'infra backend existe mais pas ici) — un pictogramme non fonctionnel serait un
 * faux affordance. À ajouter si/quand la fonctionnalité est réellement implémentée.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        <Link href="/compte" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-100">
            <Image src="/assets/nathafty.jpeg" alt="Nathafty" fill className="object-contain p-0.5" />
          </div>
          <span className="font-bold text-primary-500">Nathafty</span>
        </Link>
      </div>
    </header>
  );
}
