import React, { useState } from 'react';
import { Copy, Check, Sparkles, Shield, Hash, FileText, CheckCircle2 } from 'lucide-react';
import { OptimizedDescription } from '../types/audit';

interface CopywritingSectionProps {
  desc: OptimizedDescription;
}

export const CopywritingSection: React.FC<CopywritingSectionProps> = ({ desc }) => {
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const handleCopyFull = () => {
    navigator.clipboard.writeText(desc.fullFormattedText);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(desc.shopeeTags.join(' '));
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <section id="section-copywriting" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
              4
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Copywriting Deskripsi Produk Hipnotik Penjualan
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Diformulasikan memicu pembeli langsung klik tombol "Beli Sekarang" tanpa ragu atau meninggalkan keranjang.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyFull}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md self-start sm:self-auto ${
            copiedFull
              ? 'bg-emerald-600 text-white'
              : 'bg-orange-500 hover:bg-orange-600 active:scale-95 text-white'
          }`}
        >
          {copiedFull ? (
            <>
              <Check className="w-4 h-4" />
              <span>Deskripsi Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Seluruh Deskripsi</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Breakdown Anatomy */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Anatomi Konversi Deskripsi:
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1. Hook Pembuka (Attention 3 Detik):
            </div>
            <p className="text-xs text-amber-800 italic font-medium leading-relaxed">
              "{desc.attentionHook}"
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              2. Keresahan & Solusi Nyata:
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {desc.problemAgitation}
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              3. Garansi Anti-Rugi (Risk Reversal):
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              {desc.riskReversalGuarantee}
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Hash className="w-3.5 h-3.5 text-blue-600" />
                18 Hashtag SEO Shopee:
              </div>
              <button
                type="button"
                onClick={handleCopyTags}
                className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1"
              >
                {copiedTags ? 'Tersalin!' : 'Salin Tag'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {desc.shopeeTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white text-blue-800 border border-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ready to Paste Preview */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Format Teks Lengkap (Siap Paste ke Shopee):
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {desc.fullFormattedText.length} Karakter
            </span>
          </div>

          <div className="flex-1 bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-y-auto max-h-[380px] border border-slate-700 whitespace-pre-wrap select-all shadow-inner">
            {desc.fullFormattedText}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Sudah termasuk emotikon rapi & struktur Shopee Mobile
            </span>
            <button
              onClick={handleCopyFull}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              Salin Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
