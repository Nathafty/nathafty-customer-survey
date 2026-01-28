import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Nathafty - Enquête de Satisfaction Client",
  description: "Questionnaire d'enquête sur la gestion des déchets Nathafty",
  manifest: "/manifest.json",
  themeColor: "#1e40af",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nathafty Survey"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Chart.js via CDN */}
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"
          strategy="beforeInteractive"
        />
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Nathafty Survey" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nathafty" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/assets/nathafty.jpeg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen">
        {children}
        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker enregistré avec succès:', registration.scope);
                  },
                  function(err) {
                    console.log('Échec de l\\'enregistrement du Service Worker:', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
