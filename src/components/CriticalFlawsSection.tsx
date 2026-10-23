import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Filter, Lightbulb, ShieldAlert } from 'lucide-react';
import { CriticalFlaw } from '../types/audit';

interface CriticalFlawsSectionProps {
  flaws: CriticalFlaw[];
}

export const CriticalFlawsSection: React.FC<CriticalFlawsSectionProps> = ({ flaws }) => {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'OPPORTUNITY'>('ALL');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFlaws = flaws.filter((f) => {
    if (filterSeverity === 'ALL') return true;
    return f.severity === filterSeverity;
  });

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return {
          bg: 'bg-orange-100 text-orange-900 border-orange-300',
          label: 'PRIORITAS UTAMA (HIGH IMPACT)',
          icon: <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />,
        };
      case 'WARNING':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          label: 'POTENSI SCALE ORDER',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
        };
      default:
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          label: 'PELUANG KONVERSI',
          icon: <Lightbulb className="w-3.5 h-3.5 text-blue-600" />,
        };
    }
  };

  return (
    <section id="section-flaws" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
              2
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Peluang Optimasi Kunci Menuju 1.000+ Orderan
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Ditemukan {flaws.length} titik pertumbuhan strategis pada algoritma pencarian, visual foto, dan psikologi pembeli.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterSeverity('ALL')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterSeverity === 'ALL' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({flaws.length})
          </button>
          <button
            onClick={() => setFilterSeverity('CRITICAL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterSeverity === 'CRITICAL' ? 'bg-orange-600 text-white shadow-xs' : 'text-orange-700 hover:bg-orange-50'
            }`}
          >
            Prioritas ({flaws.filter((f) => f.severity === 'CRITICAL').length})
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterSeverity === 'WARNING' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Potensi ({flaws.filter((f) => f.severity === 'WARNING').length})
          </button>
        </div>
      </div>

      {/* Flaws list */}
      <div className="mt-5 space-y-3.5">
        {filteredFlaws.map((flaw, idx) => {
          const badge = getSeverityBadge(flaw.severity);
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                flaw.severity === 'CRITICAL'
                  ? 'border-rose-200/90 bg-rose-50/20 hover:border-rose-300'
                  : flaw.severity === 'WARNING'
                  ? 'border-amber-200/90 bg-amber-50/20 hover:border-amber-300'
                  : 'border-blue-200/90 bg-blue-50/20 hover:border-blue-300'
              }`}
            >
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">{badge.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide uppercase border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        • {flaw.pillar}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800">
                      {flaw.issue}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-semibold text-orange-600 sm:text-slate-500 flex items-center gap-1">
                    {isExpanded ? 'Tutup Solusi' : 'Lihat Solusi Cepat'}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-200/60 bg-white/60 space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm mt-2">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-4 h-4 text-slate-500" />
                        Mengapa Ini Merugikan di Shopee:
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {flaw.explanation}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200">
                      <div className="font-bold text-rose-800 flex items-center gap-1.5 mb-1">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        Dampak Terhadap Orderan:
                      </div>
                      <p className="text-rose-900 leading-relaxed font-medium">
                        {flaw.salesImpact}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Solusi Cepat 1-Langkah:
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-semibold">
                      {flaw.quickFix}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
