import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Nathafty - Enquête de Satisfaction Client",
  description: "Questionnaire d'enquête sur la gestion des déchets Nathafty",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a8a", // blue-900 — correspond au haut du hero
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
        <meta name="application-name" content="Nathafty" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nathafty" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/assets/nathafty.jpeg" />
      </head>
      <body className="antialiased bg-gray-100 min-h-screen">
        {children}
        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('SW enregistré:', registration.scope);
                  },
                  function(err) {
                    console.warn('SW non enregistré:', err);
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
