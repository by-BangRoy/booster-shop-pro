import React, { useState } from 'react';
import { Check, Copy, Sparkles, Zap, Award, Target, Info } from 'lucide-react';
import { SEOTitles } from '../types/audit';

interface SeoTitlesSectionProps {
  seoTitles: SEOTitles;
}

export const SeoTitlesSection: React.FC<SeoTitlesSectionProps> = ({ seoTitles }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const titleOptions = [
    {
      key: 'option1',
      title: 'Opsi 1: Juara Algoritma Pencarian Organik (Rekomendasi Utama)',
      text: seoTitles.option1_AlgorithmChamp,
      tag: 'Algoritma Organik',
      color: 'border-orange-500 bg-orange-50/20',
      badgeColor: 'bg-orange-500 text-white',
      desc: 'Memenuhi struktur baku kata kunci algoritma Shopee tanpa risiko penalti keyword spamming.',
      icon: <Award className="w-4 h-4 text-orange-500" />,
    },
    {
      key: 'option2',
      title: 'Opsi 2: Hook Emosional & Garansi (Tinggi CTR Klik HP)',
      text: seoTitles.option2_ViralHook,
      tag: 'Tinggi CTR Mobile',
      color: 'border-blue-500 bg-blue-50/20',
      badgeColor: 'bg-blue-600 text-white',
      desc: 'Memicu rasa penasaran dan kepercayaan instan pembeli yang browsing di beranda rekomendasi.',
      icon: <Sparkles className="w-4 h-4 text-blue-500" />,
    },
    {
      key: 'option3',
      title: 'Opsi 3: Shopee Ads Ready (Optimal ROAS Iklan Pencarian)',
      text: seoTitles.option3_AdsReady,
      tag: 'Iklan Shopee Berbiaya Hemat',
      color: 'border-emerald-500 bg-emerald-50/20',
      badgeColor: 'bg-emerald-600 text-white',
      desc: 'Dirancang khusus mencocokkan kata kunci pencarian berbayar agar Quality Score iklan tinggi dan biaya per klik murah.',
      icon: <Target className="w-4 h-4 text-emerald-500" />,
    },
  ];

  return (
    <section id="section-seo" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
              3
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              3 Formula Judul Baru Penembus Algoritma Shopee
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Ganti judul lama dengan salah satu opsi di bawah ini untuk melipatgandakan impresi pencarian dalam 24 jam.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full self-start sm:self-auto flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-orange-500" />
          1-Klik Salin ke Seller Centre
        </span>
      </div>

      {/* Formula Structure Box */}
      <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80">
        <div className="flex items-start gap-2.5">
          <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-800">
              Formula Struktur Judul Algoritma Shopee 2026:
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 font-mono bg-white/80 p-2.5 rounded-lg border border-orange-200">
              {seoTitles.recommendedFormula}
            </div>
            <p className="text-xs text-orange-900/80 mt-1.5">
              {seoTitles.whyTheseWork}
            </p>
          </div>
        </div>
      </div>

      {/* Titles Cards */}
      <div className="space-y-4">
        {titleOptions.map((opt) => {
          const charCount = opt.text.length;
          const isCopied = copiedKey === opt.key;

          return (
            <div
              key={opt.key}
              className={`rounded-xl border-2 p-4 sm:p-5 transition-all relative ${opt.color} hover:shadow-md`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <h4 className="text-sm font-bold text-slate-800">{opt.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${opt.badgeColor}`}>
                    {opt.tag}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {charCount}/255 Karakter
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border border-slate-200 text-sm sm:text-base font-semibold text-slate-900 select-all leading-relaxed shadow-inner">
                {opt.text}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                <p className="text-xs text-slate-600">{opt.desc}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(opt.text, opt.key)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-orange-600 text-white active:scale-95'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Judul Ini</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
