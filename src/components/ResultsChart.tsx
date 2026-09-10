'use client';

import { useEffect, useRef } from 'react';
import { BarChart3, Trash2, Package, MessageSquare, Wallet, User, Phone, MessageCircle } from 'lucide-react';

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

  const rows = [
    { icon: Trash2, label: 'Fréquence de sortie', value: data.trashFrequency },
    { icon: Package, label: 'Production de déchets', value: `${data.bagsPerWeek} sac(s) / semaine — ${data.bagType}` },
    { icon: MessageSquare, label: 'Principale préoccupation', value: data.mainConcern },
    {
      icon: Wallet,
      label: 'Service de collecte',
      value: data.paysService === 'Oui' && data.monthlyPayment
        ? `${data.paysService} — ${data.monthlyPayment}`
        : data.paysService,
    },
  ];

  return (
    <div className="card">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
        <BarChart3 className="w-5 h-5 text-primary-500" aria-hidden="true" />
        Récapitulatif de votre enquête
      </h3>

      <div className="mb-6">
        <canvas ref={chartRef} />
      </div>

      <div className="space-y-3 border-t border-gray-100 pt-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <row.icon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs text-gray-500">{row.label}</p>
              <p className="text-sm font-medium text-gray-900">{row.value}</p>
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
          <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Phone className="w-3 h-3" aria-hidden="true" /> {data.phone}
            </p>
            {data.whatsapp && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MessageCircle className="w-3 h-3" aria-hidden="true" /> {data.whatsapp}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
