import React from 'react';
import { Award, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, ExternalLink, Zap } from 'lucide-react';
import { AuditResult } from '../types/audit';

interface AuditScoreCardProps {
  audit: AuditResult;
  onNavigateToSection: (sectionId: string) => void;
}

export const AuditScoreCard: React.FC<AuditScoreCardProps> = ({ audit, onNavigateToSection }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'S':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-700',
          border: 'border-emerald-300',
          lightBg: 'bg-emerald-50',
          badge: 'Superstar (Siap Banjir Orderan)',
        };
      case 'A':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-700',
          border: 'border-blue-300',
          lightBg: 'bg-blue-50',
          badge: 'Potensial Tinggi (Butuh Sedikit Poles)',
        };
      case 'B':
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-700',
          border: 'border-amber-300',
          lightBg: 'bg-amber-50',
          badge: 'Performa Menengah (Banyak Bocor Trafik)',
        };
      case 'C':
        return {
          bg: 'bg-orange-500',
          text: 'text-orange-700',
          border: 'border-orange-300',
          lightBg: 'bg-orange-50',
          badge: 'Rentan Terbenam (Perlu Rombak Judul & Cover)',
        };
      default:
        return {
          bg: 'bg-orange-600',
          text: 'text-orange-700',
          border: 'border-orange-300',
          lightBg: 'bg-orange-50',
          badge: 'Potensi Tinggi (Siap Dioptimalkan Menuju 1.000+ Order)',
        };
    }
  };

  const gradeInfo = getGradeColor(audit.healthGrade);
  const criticalCount = audit.criticalFlaws.filter((f) => f.severity === 'CRITICAL').length;
  const warningCount = audit.criticalFlaws.filter((f) => f.severity === 'WARNING').length;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-orange-500 text-white">
                Hasil Audit Shopee
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-slate-200">
                {audit.category || 'Kategori Terdeteksi'}
              </span>
              {audit.originalLink && (
                <a
                  href={audit.originalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 underline decoration-dotted"
                >
                  <ExternalLink className="w-3 h-3" />
                  Buka Link Asli
                </a>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {audit.productName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
              <div className="text-right">
                <div className="text-[11px] text-slate-300 font-medium">Tingkat Kesehatan</div>
                <div className="text-xs font-bold text-amber-300">{audit.statusLabel}</div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500 font-black text-2xl text-white shadow-inner">
                {audit.healthGrade}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Body */}
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Score Circular Metric */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-orange-50/40 rounded-2xl border border-slate-200/80 text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={
                    audit.auditScore >= 75
                      ? 'text-emerald-500'
                      : audit.auditScore >= 55
                      ? 'text-amber-500'
                      : 'text-rose-500'
                  }
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * audit.auditScore) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {audit.auditScore}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  / 100 SKOR
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${gradeInfo.lightBg} ${gradeInfo.text} border ${gradeInfo.border}`}
              >
                Grade {audit.healthGrade} • {gradeInfo.badge}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-semibold text-orange-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                {criticalCount} Prioritas Utama
              </span>
              <span>•</span>
              <span className="font-semibold text-amber-600">
                {warningCount} Potensi Scale
              </span>
            </div>
          </div>

          {/* Diagnostic & Action Plan */}
          <div className="md:col-span-8 space-y-4">
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    Diagnosa Pakar Algoritma Shopee:
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
                    {audit.executiveSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Target 1000 Orders Funnel Snapshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <div className="text-[11px] text-slate-500 font-medium">Target Impresi Harian</div>
                <div className="text-base sm:text-lg font-black text-slate-800 mt-0.5">
                  {audit.ordersForecast.dailyImpressionsNeeded.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-slate-400">Pencarian + Iklan</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <div className="text-[11px] text-slate-500 font-medium">Target CTR Foto</div>
                <div className="text-base sm:text-lg font-black text-orange-600 mt-0.5">
                  {audit.ordersForecast.targetCTR}
                </div>
                <div className="text-[10px] text-slate-400">Rasio Klik Pembeli</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                <div className="text-[11px] text-slate-500 font-medium">Target Konversi</div>
                <div className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">
                  {audit.ordersForecast.targetConversionRate}
                </div>
                <div className="text-[10px] text-slate-400">Tingkat Checkout</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-3 rounded-xl text-center shadow-md">
                <div className="text-[11px] text-orange-100 font-medium">Proyeksi Orderan</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5 flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {audit.ordersForecast.projectedMonthlyOrders.toLocaleString('id-ID')}+
                </div>
                <div className="text-[10px] text-amber-200">Pesanan / Bulan</div>
              </div>
            </div>

            {/* Quick Navigation Action Pills */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onNavigateToSection('section-flaws')}
                className="px-3 py-1.5 text-xs font-bold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Lihat Semua Poin Optimasi ({audit.criticalFlaws.length})
              </button>

              <button
                onClick={() => onNavigateToSection('section-seo')}
                className="px-3 py-1.5 text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Formula Judul SEO Baru
              </button>

              <button
                onClick={() => onNavigateToSection('section-copywriting')}
                className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                Salin Deskripsi Hipnotik
              </button>

              <button
                onClick={() => onNavigateToSection('section-automation')}
                className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sistem Otomasi Chat & Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
