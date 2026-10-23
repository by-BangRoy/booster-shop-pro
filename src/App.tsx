import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { UrlInputCard } from './components/UrlInputCard';
import { AuditScoreCard } from './components/AuditScoreCard';
import { CriticalFlawsSection } from './components/CriticalFlawsSection';
import { SeoTitlesSection } from './components/SeoTitlesSection';
import { CopywritingSection } from './components/CopywritingSection';
import { VisualBlueprintSection } from './components/VisualBlueprintSection';
import { PricingVoucherSection } from './components/PricingVoucherSection';
import { AutomationSection } from './components/AutomationSection';
import { OrdersForecastCalculator } from './components/OrdersForecastCalculator';
import { ShopeeMockupPreview } from './components/ShopeeMockupPreview';
import { Instant1000RecipeModal } from './components/Instant1000RecipeModal';
import { VideoScriptModal } from './components/VideoScriptModal';
import { ShopeeAdsRoasModal } from './components/ShopeeAdsRoasModal';
import { PinLoginScreen } from './components/PinLoginScreen';
import { ChangePinModal } from './components/ChangePinModal';
import { AuditResult, Master1000Recipe, ShopeeAdsRoasAnalysis } from './types/audit';
import { Sparkles, AlertCircle, RefreshCw, CheckCircle, Download, Share2, Layers, ArrowUp, Flame, Target, Link2 } from 'lucide-react';

export default function App() {
  // PIN Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('shopeebooster_auth_session') !== null;
  });
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);

  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 1-Click 1000 Orders Master Recipe State
  const [instantRecipe, setInstantRecipe] = useState<Master1000Recipe | null>(null);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  // 1-Click ROAS & Shopee Ads State
  const [adsAnalysis, setAdsAnalysis] = useState<ShopeeAdsRoasAnalysis | null>(null);
  const [isAdsLoading, setIsAdsLoading] = useState(false);
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);
  const [adsCustomUrl, setAdsCustomUrl] = useState('');

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleLock = () => {
    localStorage.removeItem('shopeebooster_auth_session');
    localStorage.removeItem('shopeebooster_auth_time');
    setIsAuthenticated(false);
  };

  const runAudit = async (payload: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
    currentSales?: string;
  }) => {
    setIsLoading(true);
    setErrorMsg('');
    setLoadingStep('Memeriksa link & mengambil data listing produk Shopee...');

    // Progress animation steps
    const timer1 = setTimeout(() => {
      setLoadingStep('Membedah kelemahan algoritma pencarian Shopee & CTR foto...');
    }, 600);

    const timer2 = setTimeout(() => {
      setLoadingStep('Merumuskan 3 judul SEO, copywriting AIDA, & sistem auto-reply...');
    }, 1400);

    const timer3 = setTimeout(() => {
      setLoadingStep('Menghitung kalkulasi funnel matematis tembus 1.000+ orderan...');
    }, 2200);

    try {
      const response = await fetch('/api/audit-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.details || 'Gagal melakukan audit.');
      }

      const data: AuditResult = await response.json();
      setAuditData(data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.message || 'Terjadi gangguan saat memproses audit produk. Pastikan server terhubung.'
      );
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const runGenerate1000Recipe = async (payload: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
  }) => {
    setIsRecipeLoading(true);
    setIsRecipeModalOpen(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/generate-1000-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: payload.url,
          productName: payload.rawTitle,
          category: payload.rawCategory,
          currentPrice: payload.currentPrice,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.details || 'Gagal membuat racikan 1.000 orderan.');
      }

      const data: Master1000Recipe = await response.json();
      setInstantRecipe(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat meracik formula 1.000 orderan.');
    } finally {
      setIsRecipeLoading(false);
    }
  };

  const runGenerateAdsRoas = async (payload: {
    url: string;
    rawTitle?: string;
    rawCategory?: string;
    currentPrice?: string;
    currentSales?: string;
  }) => {
    setIsAdsLoading(true);
    setIsAdsModalOpen(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/generate-ads-roas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: payload.url,
          productName: payload.rawTitle,
          category: payload.rawCategory,
          currentPrice: payload.currentPrice,
          currentSales: payload.currentSales,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || errJson.details || 'Gagal menganalisis ROAS & iklan Shopee.');
      }

      const data: ShopeeAdsRoasAnalysis = await response.json();
      setAdsAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat menganalisis ROAS & iklan Shopee.');
    } finally {
      setIsAdsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExportSummary = () => {
    if (!auditData) return;
    const textContent = `=== LAPORAN AUDIT & SOLUSI SHOPEE 1000X ORDER ===
Produk: ${auditData.productName}
Kategori: ${auditData.category}
Skor Kesehatan: ${auditData.auditScore}/100 (Grade ${auditData.healthGrade})
Status: ${auditData.statusLabel}

RINGKASAN DIAGNOSA:
${auditData.executiveSummary}

---
FORMULA JUDUL BARU JUARA ORGANIK:
${auditData.seoTitles.option1_AlgorithmChamp}

FORMULA JUDUL VIRAL HOOK:
${auditData.seoTitles.option2_ViralHook}

FORMULA JUDUL SHOPEE ADS:
${auditData.seoTitles.option3_AdsReady}

---
DESKRIPSI LENGKAP:
${auditData.optimizedDescription.fullFormattedText}

---
TAGS SHOPEE:
${auditData.optimizedDescription.shopeeTags.join(' ')}

---
SETTING HARGA & PROMOSI:
Harga Coret: ${auditData.pricingStrategy.suggestedCorePrice}
Harga Promo: ${auditData.pricingStrategy.suggestedPromoPrice} (Diskon ${auditData.pricingStrategy.discountPercentage})
Paket Kombo: ${auditData.pricingStrategy.bundleStrategy}
Voucher Toko: ${auditData.pricingStrategy.voucherRecommendation}

---
SISTEM AUTOMASI CHAT 24/7:
Greeting: ${auditData.automationSystem.autoReplyGreeting}
Stok Ready: ${auditData.automationSystem.autoReplyStockQuery}
Broadcast Keranjang: ${auditData.automationSystem.abandonedCartBroadcast}
Kartu Review Bintang 5: ${auditData.automationSystem.packageInsertCardText}

Generated by ShopeeBooster Pro
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ShopeeBooster-ActionPlan-${auditData.productName.slice(0, 20)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return <PinLoginScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      <Header
        onLock={handleLock}
        onChangePin={() => setIsChangePinModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Input Card */}
        <UrlInputCard
          onAudit={runAudit}
          onGenerateRecipe={runGenerate1000Recipe}
          onGenerateAdsRoas={runGenerateAdsRoas}
          isLoading={isLoading}
          isRecipeLoading={isRecipeLoading}
          isAdsLoading={isAdsLoading}
        />



        {/* Loading Progress State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-8 sm:p-12 text-center animate-in fade-in duration-300">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-slate-800">
              ShopeeBooster Sedang Membedah Produk Anda
            </h3>
            <p className="text-sm font-semibold text-orange-600 mt-2 max-w-md mx-auto">
              {loadingStep}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Algoritma Search 2026
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Formula Copywriting Penjualan
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Auto-Reply & Video Hack
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {errorMsg && (
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 text-rose-800 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base text-rose-900">Gagal Melakukan Audit</h4>
              <p className="text-xs sm:text-sm mt-1">{errorMsg}</p>
              <p className="text-xs text-rose-700 mt-2">
                Tips: Anda juga dapat memilih salah satu contoh produk siap pakai di atas atau memasukkan judul produk secara langsung.
              </p>
            </div>
          </div>
        )}

        {/* Audit Results View */}
        {auditData && !isLoading && (
          <div ref={resultsRef} className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Navigation Sticky Bar */}
            <div className="sticky top-2 z-30 bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-2 px-3 shadow-xl border border-slate-700 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => scrollToSection('section-flaws')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-rose-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Kesalahan ({auditData.criticalFlaws.length})
                </button>
                <button
                  onClick={() => scrollToSection('section-seo')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-orange-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Judul SEO
                </button>
                <button
                  onClick={() => scrollToSection('section-copywriting')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-blue-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Deskripsi Lengkap
                </button>
                <button
                  onClick={() => scrollToSection('section-visuals')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-violet-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Foto 9-Slide
                </button>
                <button
                  onClick={() => scrollToSection('section-pricing')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-emerald-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Harga & Voucher
                </button>
                <button
                  onClick={() => scrollToSection('section-automation')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-amber-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Automasi Chat
                </button>
                <button
                  onClick={() => scrollToSection('section-forecast')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-teal-300 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Kalkulator 1000x
                </button>
                <button
                  onClick={() => scrollToSection('section-mockup')}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-amber-200 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  Simulasi Shopee
                </button>
                <button
                  onClick={() => scrollToSection('section-roas-menu')}
                  className="px-2.5 py-1.5 rounded-lg bg-orange-600/80 hover:bg-orange-600 text-white font-extrabold transition-colors cursor-pointer flex-shrink-0 flex items-center gap-1"
                >
                  <Target className="w-3.5 h-3.5 text-amber-300" />
                  ROAS & Iklan
                </button>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() =>
                    runGenerateAdsRoas({
                      url: auditData.originalLink || '',
                      rawTitle: auditData.productName,
                      rawCategory: auditData.category,
                      currentPrice: auditData.pricingStrategy.suggestedPromoPrice,
                    })
                  }
                  className="px-3 py-1.5 bg-gradient-to-r from-slate-900 to-orange-950 hover:from-black hover:to-orange-900 text-white rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm border border-orange-500/40"
                >
                  <Target className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span className="hidden sm:inline">ROAS & Iklan</span>
                </button>
                <button
                  onClick={() =>
                    runGenerate1000Recipe({
                      url: auditData.originalLink || '',
                      rawTitle: auditData.productName,
                      rawCategory: auditData.category,
                      currentPrice: auditData.pricingStrategy.suggestedPromoPrice,
                    })
                  }
                  className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
                  <span className="hidden sm:inline">Paket Racikan 1000x</span>
                </button>
                <button
                  onClick={handleExportSummary}
                  title="Unduh Laporan Action Plan TXT"
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unduh Action Plan</span>
                </button>
              </div>
            </div>

            {/* Score & Diagnostic Card */}
            <AuditScoreCard audit={auditData} onNavigateToSection={scrollToSection} />

            {/* Section 2: Critical Flaws */}
            <CriticalFlawsSection flaws={auditData.criticalFlaws} />

            {/* Section 3: 3 SEO Title Formulas */}
            <SeoTitlesSection seoTitles={auditData.seoTitles} />

            {/* Section 4: AIDA Copywriting */}
            <CopywritingSection desc={auditData.optimizedDescription} />

            {/* Section 5: 9-Slide Visual Blueprint */}
            <VisualBlueprintSection blueprint={auditData.visualBlueprint} />

            {/* Section 6: Pricing Psychology & Vouchers */}
            <PricingVoucherSection pricing={auditData.pricingStrategy} />

            {/* Section 7: 24/7 Automation System */}
            <AutomationSection
              automation={auditData.automationSystem}
              productName={auditData.productName}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
            />

            {/* Section 8: Orders Forecast Funnel */}
            <OrdersForecastCalculator
              forecast={auditData.ordersForecast}
              suggestedPrice={auditData.pricingStrategy.suggestedPromoPrice}
            />

            {/* Section 9: Live Simulated Shopee Mockup */}
            <ShopeeMockupPreview audit={auditData} />

            {/* Section 10: Menu ROAS & Settingan Iklan Shopee (Bagian Bawah) */}
            <div id="section-roas-menu" className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                        Menu Iklan & ROAS Shopee
                      </span>
                      <span className="text-amber-300 text-xs font-bold">Anti-Boncos & Target ROAS Cuan</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Settingan Lengkap Iklan & Formula ROAS Terbaik
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Dapatkan kalkulasi Break-Even ROAS, batas aman biaya per klik (Max CPC), serta 15 kata kunci spesifik (Exact Match) dan penempatan iklan produk serupa siap pasang di Shopee Seller Centre.
                    </p>
                  </div>
                </div>

                {/* Kolom Tempel Link Shopee Di Sini */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
                  <label className="block text-xs font-black text-amber-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-orange-400" />
                    Tempel Link Shopee Di Sini:
                  </label>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const targetUrl = adsCustomUrl.trim() || auditData.originalLink || '';
                      if (!targetUrl) return;
                      runGenerateAdsRoas({
                        url: targetUrl,
                        rawTitle: adsCustomUrl.trim() ? undefined : auditData.productName,
                        rawCategory: adsCustomUrl.trim() ? undefined : auditData.category,
                        currentPrice: adsCustomUrl.trim() ? undefined : auditData.pricingStrategy.suggestedPromoPrice,
                      });
                    }}
                    className="flex flex-col sm:flex-row gap-3 items-stretch"
                  >
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={adsCustomUrl}
                        onChange={(e) => setAdsCustomUrl(e.target.value)}
                        placeholder=""
                        disabled={isAdsLoading}
                        className="w-full pl-3.5 pr-24 py-3.5 bg-slate-900/90 border border-orange-500/50 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            if (text) setAdsCustomUrl(text.trim());
                          } catch {
                            // Clipboard permission error ignored
                          }
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold bg-white/10 hover:bg-white/20 text-orange-200 rounded-lg transition-colors cursor-pointer"
                        title="Tempel dari Clipboard"
                      >
                        Tempel
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isAdsLoading}
                      className="px-6 py-3.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-black text-sm rounded-xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-60"
                    >
                      {isAdsLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Menganalisis Iklan...</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-5 h-5 text-amber-200 animate-pulse" />
                          <span>🎯 Analisis ROAS & Settingan Iklan</span>
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-[11px] text-slate-400 mt-2.5">
                    Kosongkan kolom jika ingin memakai produk yang sedang diaudit di atas, atau tempel link Shopee lain untuk analisis iklan baru secara instan.
                  </p>
                </div>
              </div>
            </div>



            {/* Bottom Callout */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Siap Menerapkan Solusi ke Toko Shopee Anda?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Salin judul dan deskripsi baru langsung ke Seller Centre Shopee, perbaiki stiker cover produk, dan aktifkan auto-reply untuk mulai merasakan lonjakan pesanan.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportSummary}
                  className="px-5 py-3 bg-white text-slate-900 hover:bg-orange-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-orange-600" />
                  <span>Unduh Semua Rekomendasi (.txt)</span>
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>Audit Produk Lain</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 1-Click 1000 Orders Recipe Modal */}
      <Instant1000RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        recipe={instantRecipe}
        isLoading={isRecipeLoading}
      />

      {/* 1-Click ROAS & Complete Shopee Ads Configuration Modal */}
      <ShopeeAdsRoasModal
        isOpen={isAdsModalOpen}
        onClose={() => setIsAdsModalOpen(false)}
        analysis={adsAnalysis}
        isLoading={isAdsLoading}
        onAnalyzeNewLink={({ url, productName }) =>
          runGenerateAdsRoas({
            url,
            rawTitle: productName,
          })
        }
      />

      {/* Change Master PIN Modal */}
      <ChangePinModal
        isOpen={isChangePinModalOpen}
        onClose={() => setIsChangePinModalOpen(false)}
      />

      {/* Video Script Modal */}
      {auditData && (
        <VideoScriptModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          productName={auditData.productName}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            ShopeeBooster — Tool Audit 1-Klik & Solusi Otomasi Ribuan Orderan
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dirancang khusus untuk Seller Shopee Indonesia mengikuti kaidah algoritma pencarian organik, CTR visual smartphone, dan konversi checkout otomatis.
          </p>
        </div>
      </footer>
    </div>
  );
}
