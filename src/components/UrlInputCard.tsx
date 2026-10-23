import React, { useState } from 'react';
import { Search, Link as LinkIcon, Sparkles, Clipboard, ChevronDown, ChevronUp, AlertCircle, ArrowRight, Flame, Target, CheckCircle2 } from 'lucide-react';
import { PRESET_PRODUCTS, PresetProduct } from '../data/presets';

interface UrlInputCardProps {
  onAudit: (data: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
    currentSales?: string;
  }) => void;
  onGenerateRecipe?: (data: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
  }) => void;
  onGenerateAdsRoas?: (data: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
    currentSales?: string;
  }) => void;
  isLoading: boolean;
  isRecipeLoading?: boolean;
  isAdsLoading?: boolean;
}

export const UrlInputCard: React.FC<UrlInputCardProps> = ({
  onAudit,
  onGenerateRecipe,
  onGenerateAdsRoas,
  isLoading,
  isRecipeLoading = false,
  isAdsLoading = false,
}) => {
  const [url, setUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [rawTitle, setRawTitle] = useState('');
  const [rawCategory, setRawCategory] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentSales, setCurrentSales] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const parseInputText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const urlMatch = trimmed.match(/https?:\/\/[^\s"'<>]+/i);
    let extractedUrl = urlMatch ? urlMatch[0] : '';
    let extractedTitle = '';
    let extractedPrice = '';

    if (urlMatch) {
      const remaining = trimmed.replace(urlMatch[0], '').trim();
      if (remaining) {
        const priceMatch = remaining.match(/seharga\s*(Rp\s*[\d.,]+|\d+[\d.,]*)/i);
        if (priceMatch) {
          extractedPrice = priceMatch[1].replace(/\s+/g, ' ');
        }
        let cleaned = remaining
          .replace(/seharga\s*(Rp\s*[\d.,]+|\d+[\d.,]*)/i, '')
          .replace(/^(dapatkan|temukan|beli|cek|yuk\s*cek|diskon|promo|lihat)\s+/i, '')
          .replace(/(di\s*shopee\s*sekarang|beli\s*di\s*shopee|sekarang\s*di\s*shopee|dapatkan\s*di\s*shopee|di\s*shopee|shopee\s*indonesia|[.!?]+).*$/i, '')
          .replace(/ini\s*$/i, '')
          .trim();
        if (cleaned.length > 3) {
          extractedTitle = cleaned;
        }
      }

      try {
        const parsed = new URL(extractedUrl);
        const slugMatch = parsed.pathname.match(/\/([^\/]+)-i\.\d+\.\d+/i);
        if (slugMatch && !extractedTitle) {
          extractedTitle = decodeURIComponent(slugMatch[1]).replace(/[-_]/g, ' ').trim();
        }
      } catch {}
    } else {
      extractedTitle = trimmed;
    }

    if (extractedTitle) setRawTitle(extractedTitle);
    if (extractedPrice) setCurrentPrice(extractedPrice);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setErrorMsg('');
        parseInputText(text.trim());
      }
    } catch {
      // clipboard permission fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() && !rawTitle.trim()) {
      setErrorMsg('Silakan tempelkan link produk Shopee atau ketik judul produk Anda.');
      return;
    }
    setErrorMsg('');
    onAudit({
      url: url.trim(),
      rawTitle: rawTitle.trim(),
      rawCategory: rawCategory.trim(),
      currentPrice: currentPrice.trim(),
      currentSales: currentSales.trim(),
    });
  };

  const handleSelectPreset = (preset: PresetProduct) => {
    setUrl(preset.url);
    setRawTitle(preset.name);
    setRawCategory(preset.category);
    setCurrentPrice(preset.currentPrice);
    setCurrentSales(preset.currentSales);
    setErrorMsg('');
    // Automatically trigger audit for true 1-click experience
    onAudit({
      url: preset.url,
      rawTitle: preset.name,
      rawCategory: preset.category,
      currentPrice: preset.currentPrice,
      currentSales: preset.currentSales,
    });
  };

  const handleInstantRecipeClick = () => {
    let targetUrl = url.trim();
    let targetTitle = rawTitle.trim();
    let targetCategory = rawCategory.trim();
    let targetPrice = currentPrice.trim();

    if (!targetUrl && !targetTitle) {
      const defaultPreset = PRESET_PRODUCTS[0];
      targetUrl = defaultPreset.url;
      targetTitle = defaultPreset.name;
      targetCategory = defaultPreset.category;
      targetPrice = defaultPreset.currentPrice;
      setUrl(defaultPreset.url);
      setRawTitle(defaultPreset.name);
      setRawCategory(defaultPreset.category);
      setCurrentPrice(defaultPreset.currentPrice);
    }

    if (onGenerateRecipe) {
      onGenerateRecipe({
        url: targetUrl,
        rawTitle: targetTitle,
        rawCategory: targetCategory,
        currentPrice: targetPrice,
      });
    }
  };

  const handleAdsRoasClick = () => {
    let targetUrl = url.trim();
    let targetTitle = rawTitle.trim();
    let targetCategory = rawCategory.trim();
    let targetPrice = currentPrice.trim();
    let targetSales = currentSales.trim();

    if (!targetUrl && !targetTitle) {
      const defaultPreset = PRESET_PRODUCTS[0];
      targetUrl = defaultPreset.url;
      targetTitle = defaultPreset.name;
      targetCategory = defaultPreset.category;
      targetPrice = defaultPreset.currentPrice;
      targetSales = defaultPreset.currentSales;
      setUrl(defaultPreset.url);
      setRawTitle(defaultPreset.name);
      setRawCategory(defaultPreset.category);
      setCurrentPrice(defaultPreset.currentPrice);
      setCurrentSales(defaultPreset.currentSales);
    }

    if (onGenerateAdsRoas) {
      onGenerateAdsRoas({
        url: targetUrl,
        rawTitle: targetTitle,
        rawCategory: targetCategory,
        currentPrice: targetPrice,
        currentSales: targetSales,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-7 relative overflow-hidden transition-all">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-100/60 via-amber-50/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Tempelkan Link Produk Shopee Anda
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
              Pilih mau setting ROAS & iklan Shopee lengkap, audit listing produk, atau racikan 1.000 orderan per hari sekali klik.
            </p>
          </div>
          <span className="text-[11px] font-black text-red-600 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            Fitur 1-Klik Aktif
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col xl:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="h-5 w-5 text-orange-500" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const val = e.target.value;
                  setUrl(val);
                  if (errorMsg) setErrorMsg('');
                  parseInputText(val);
                }}
                placeholder="Tempel link produk Shopee (https://id.shp.ee/...) atau ketik nama produk..."
                disabled={isLoading || isRecipeLoading || isAdsLoading}
                className="block w-full pl-11 pr-24 py-3.5 sm:py-4 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 text-sm sm:text-base border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 rounded-xl transition-all shadow-inner outline-none font-medium"
              />
              <button
                type="button"
                onClick={handlePaste}
                title="Tempel dari Clipboard"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 bg-white hover:bg-orange-50 border border-slate-200 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Clipboard className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Tempel</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Primary 1-Click 1000 Orders Recipe Button */}
              <button
                type="button"
                onClick={handleInstantRecipeClick}
                disabled={isLoading || isRecipeLoading || isAdsLoading}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-700 hover:to-orange-700 active:scale-[0.98] text-white font-black text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isRecipeLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Meracik 1000x...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5 fill-amber-300 text-amber-300 animate-pulse" />
                    <span>⚡ 1-Klik Racikan 1000x</span>
                  </>
                )}
              </button>

              {/* Comprehensive Audit Button */}
              <button
                type="submit"
                disabled={isLoading || isRecipeLoading || isAdsLoading}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Membedah...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Audit Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {rawTitle && (
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200/90 rounded-xl text-xs text-emerald-900 shadow-2xs">
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-emerald-800">Target Analisis:</span>
                <span className="font-bold text-slate-900 truncate max-w-[260px] sm:max-w-[420px]">{rawTitle}</span>
                {currentPrice && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px] flex-shrink-0">
                    {currentPrice}
                  </span>
                )}
                {rawCategory && (
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded text-[10px] flex-shrink-0">
                    {rawCategory}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex-shrink-0"
              >
                {showAdvanced ? 'Tutup edit' : 'Ubah detail'}
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 text-rose-600 text-xs sm:text-sm bg-rose-50 border border-rose-200/80 p-2.5 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Demo Presets */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Coba 1-Klik Contoh Studi Kasus Nyata (Klik Langsung Audit):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_PRODUCTS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200/90 hover:border-orange-300 rounded-lg text-xs font-medium transition-all text-left shadow-2xs hover:shadow-sm"
                >
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 group-hover:bg-orange-200/80 transition-colors">
                    {preset.category}
                  </span>
                  <span className="truncate max-w-[200px] sm:max-w-[240px]">
                    {preset.name.slice(0, 32)}...
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Advanced Data Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <span>Atau input manual judul / harga / target (Opsional jika link dibatasi)</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Judul Produk Saat Ini (Jika tanpa link)
                  </label>
                  <input
                    type="text"
                    value={rawTitle}
                    onChange={(e) => setRawTitle(e.target.value)}
                    placeholder="Contoh: Sepatu Sneakers Pria Putih Keren Murah"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Kategori / Niche
                  </label>
                  <input
                    type="text"
                    value={rawCategory}
                    onChange={(e) => setRawCategory(e.target.value)}
                    placeholder="Contoh: Fashion Pria / Sepatu"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Harga Jual Saat Ini
                  </label>
                  <input
                    type="text"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    placeholder="Contoh: Rp 89.000"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Performa Penjualan Saat Ini
                  </label>
                  <input
                    type="text"
                    value={currentSales}
                    onChange={(e) => setCurrentSales(e.target.value)}
                    placeholder="Contoh: Hanya 5 pesanan per bulan / masih sepi"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Menu ROAS & Settingan Iklan Shopee (Ditempatkan di Bagian Bawah) */}
        <div className="mt-5 pt-4 border-t border-slate-200/80">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-orange-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/25">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                    Menu Iklan & ROAS Shopee
                  </span>
                  <span className="text-amber-300 text-xs font-bold">1-Klik Hitung Akurat</span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  Tentukan Target ROAS Terbaik & Settingan Iklan Shopee
                </h4>
                <p className="text-xs text-slate-300">
                  Hitung Break-Even ROAS, batas bid CPC aman, serta 15 kata kunci Exact Match tanpa boncos.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdsRoasClick}
              disabled={isLoading || isRecipeLoading || isAdsLoading}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0 self-stretch md:self-auto justify-center"
            >
              {isAdsLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menganalisis Iklan...</span>
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 text-amber-200 animate-pulse" />
                  <span>🎯 Buka Menu ROAS & Iklan Shopee</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
