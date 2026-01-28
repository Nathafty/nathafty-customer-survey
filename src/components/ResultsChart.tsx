'use client';

import { useEffect, useRef } from 'react';

interface ResultsChartProps {
  data: any;
}

export default function ResultsChart({ data }: ResultsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current || typeof window === 'undefined') return;

    // Attendre que Chart.js soit chargé
    const initChart = () => {
      if (typeof (window as any).Chart === 'undefined') {
        setTimeout(initChart, 100);
        return;
      }

      const Chart = (window as any).Chart;
      const ctx = chartRef.current?.getContext('2d');
      
      if (!ctx) return;

      // Détruire le graphique existant s'il existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Créer le nouveau graphique - Graphique à barres pour la fréquence
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Sacs par semaine'],
          datasets: [{
            label: 'Nombre de sacs',
            data: [parseInt(data.bagsPerWeek) || 0],
            backgroundColor: 'rgba(30, 64, 175, 0.7)',
            borderColor: 'rgb(30, 64, 175)',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'bold'
                },
                color: '#374151'
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                label: function(context: any) {
                  return context.parsed.y + ' sac(s) - ' + data.bagType;
                }
              }
            }
          }
        }
      });
    };

    initChart();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-primary mb-6 text-center">
        📊 Récapitulatif de votre enquête
      </h3>
      
      <div className="mb-6">
        <canvas ref={chartRef} />
      </div>

      {/* Résumé des réponses */}
      <div className="mt-8 space-y-4 border-t pt-6">
        <h4 className="font-semibold text-gray-700 mb-4 text-lg">📋 Résumé de vos réponses :</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-xs text-gray-600 mb-1">1️⃣ Fréquence de sortie</p>
            <p className="text-lg font-semibold text-primary">{data.trashFrequency}</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-secondary">
            <p className="text-xs text-gray-600 mb-1">2️⃣ Production de déchets</p>
            <p className="text-lg font-semibold text-secondary">
              {data.bagsPerWeek} sac(s) / semaine
            </p>
            <p className="text-sm text-gray-600 mt-1">Type: {data.bagType}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-accent col-span-1 md:col-span-2">
            <p className="text-xs text-gray-600 mb-2">3️⃣ Principale préoccupation</p>
            <p className="text-gray-700 italic">&ldquo;{data.mainConcern}&rdquo;</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-xs text-gray-600 mb-1">4️⃣ Service de collecte</p>
            <p className="text-lg font-semibold text-purple-700">{data.paysService}</p>
            {data.paysService === 'Oui' && data.monthlyPayment && (
              <p className="text-sm text-gray-600 mt-1">
                Coût: {data.monthlyPayment}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
            <p className="text-xs text-gray-600 mb-1">👤 Contact</p>
            <p className="text-sm font-semibold text-gray-700">{data.name}</p>
            <p className="text-xs text-gray-600">📞 {data.phone}</p>
            <p className="text-xs text-gray-600">💬 {data.whatsapp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
