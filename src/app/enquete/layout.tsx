import Script from 'next/script';

/** Chart.js n'est nécessaire que pour l'écran de résultats de l'enquête. */
export default function EnqueteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
