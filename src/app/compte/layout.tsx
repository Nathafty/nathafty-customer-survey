import { Header } from '@/components/nav/Header';
import { BottomNav } from '@/components/nav/BottomNav';

export default function CompteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-4 sm:py-6 px-3 sm:px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-4">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
