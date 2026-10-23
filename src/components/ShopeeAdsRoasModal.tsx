import React, { useState } from 'react';
import {
  X,
  Target,
  TrendingUp,
  DollarSign,
  Copy,
  Check,
  Download,
  Search,
  Layers,
  ShieldAlert,
  Sparkles,
  Sliders,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  Percent,
  MousePointerClick,
  Link2
} from 'lucide-react';
import { ShopeeAdsRoasAnalysis } from '../types/audit';

interface ShopeeAdsRoasModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ShopeeAdsRoasAnalysis | null;
  isLoading: boolean;
  onAnalyzeNewLink?: (payload: { url: string; productName?: string }) => void;
}

export const ShopeeAdsRoasModal: React.FC<ShopeeAdsRoasModalProps> = ({
  isOpen,
  onClose,
  analysis,
  isLoading,
  onAnalyzeNewLink,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'roas' | 'search_ads' | 'discovery_ads' | 'rules' | 'tutorial'>('roas');
  
  // Custom link input inside modal if user wants to analyze a different link
  const [inputUrl, setInputUrl] = useState('');

  // Interactive Simulator State (Initialized from analysis baseline)
  const [budgetSlider, setBudgetSlider] = useState<number>(50000);

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadTxt = () => {
    if (!analysis) return;
    const blob = new Blob([analysis.fullAdsConfigExportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Setting-Iklan-Shopee-ROAS-${analysis.productName.slice(0, 25)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper copy of all keywords in bulk comma / line separated
  const handleCopyKeywordsOnly = () => {
    if (!analysis) return;
    const kwList = analysis.searchAdsSettings.keywords
      .map((k) => `${k.keyword} [${k.matchType}] - Bid: ${k.recommendedBid}`)
      .join('\n');
    copyText(kwList, 'keywords_bulk');
  };

  // Calculations for interactive simulator
  const baseBudget = analysis?.defaultDailyBudget || 50000;
  const ratio = budgetSlider / Math.max(baseBudget, 10000);
  
  const simClicks = Math.round((analysis?.estimatedDailyClicks || 150) * ratio);
  const simOrders = Math.max(1, Math.round((analysis?.projectedOrdersPerDay || 8) * ratio));
  const simRevenue = Math.round((analysis?.projectedDailyRevenue || 600000) * ratio);
  const simProfit = Math.round((analysis?.projectedDailyProfit || 180000) * ratio);
  const simRoas = budgetSlider > 0 ? (simRevenue / budgetSlider).toFixed(1) : '0';

  const handleManualAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim() && onAnalyzeNewLink) {
      onAnalyzeNewLink({ url: inputUrl.trim() });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 border-b border-orange-500/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm">
                  1-Klik Media Buyer Shopee
                </span>
                <span className="text-amber-300 text-xs font-bold">Formula ROAS Maksimal & Anti-Boncos</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                Settingan Lengkap Iklan & Target ROAS Terbaik
              </h3>
              <p className="text-xs text-slate-300 max-w-xl line-clamp-1">
                {analysis?.productName ? `Produk: ${analysis.productName}` : 'Analisis iklan pencarian, produk serupa, kata kunci exact, dan bid murah.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            {analysis && (
              <button
                onClick={() => copyText(analysis.fullAdsConfigExportText, 'full_config')}
                className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                {copiedKey === 'full_config' ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Semua Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Semua Settingan</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Kolom Tempel Link Shopee Di Sini */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border-b border-orange-200/80 px-4 sm:px-6 py-2.5 flex-shrink-0">
          <form onSubmit={handleManualAnalyze} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0 text-slate-800">
              <span className="p-1 bg-orange-600 text-white rounded-lg">
                <Link2 className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-black tracking-tight whitespace-nowrap">
                Tempel Link Shopee Di Sini:
              </span>
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder=""
                disabled={isLoading}
                className="w-full pl-3 pr-20 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text) setInputUrl(text.trim());
                  } catch {
                    // Clipboard API permission or unavailable
                  }
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-0.5 text-[11px] font-bold bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors cursor-pointer"
                title="Tempel dari Clipboard"
              >
                Tempel
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputUrl.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Analisis Link Ini</span>
            </button>
          </form>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-12 text-center my-auto">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-8 h-8 text-orange-600 animate-pulse" />
              </div>
            </div>
            <h4 className="text-lg font-black text-slate-800">
              Sedang Menghitung ROAS Terbaik & Settingan Iklan Shopee...
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Membedah kata kunci pencarian berniat beli tinggi, menghitung Break-Even ROAS, dan menyusun bid optimal agar tidak boncos.
            </p>
          </div>
        )}

        {/* Empty state or quick input form if no analysis yet */}
        {!isLoading && !analysis && (
          <div className="p-8 sm:p-12 text-center my-auto max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Target className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">
              Masukkan Link Produk Shopee untuk Dapatkan Settingan Iklan
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Cukup tempelkan link produk Shopee Anda di bawah ini, sistem AI akan langsung merumuskan target ROAS tertinggi, kata kunci exact match, dan settingan anti-boncos.
            </p>
            <form onSubmit={handleManualAnalyze} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder=""
                  className="w-full px-4 pr-20 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-orange-500 focus:bg-white outline-none"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      if (text) setInputUrl(text.trim());
                    } catch {
                      // ignore
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors cursor-pointer"
                  title="Tempel dari Clipboard"
                >
                  Tempel
                </button>
              </div>
              <button
                type="submit"
                disabled={!inputUrl.trim()}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Analisis ROAS</span>
              </button>
            </form>
          </div>
        )}

        {/* Loaded Content */}
        {!isLoading && analysis && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab('roas')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'roas'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-orange-400" />
                  Target ROAS & Simulator
                </button>
                <button
                  onClick={() => setActiveTab('search_ads')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'search_ads'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-blue-400" />
                  Iklan Pencarian (Keywords)
                </button>
                <button
                  onClick={() => setActiveTab('discovery_ads')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'discovery_ads'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Iklan Produk Serupa
                </button>
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'rules'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  6 SOP Anti-Boncos
                </button>
                <button
                  onClick={() => setActiveTab('tutorial')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'tutorial'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  Cara Pasang di Shopee
                </button>
              </div>

              <button
                onClick={handleDownloadTxt}
                className="text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg hover:bg-orange-50 border border-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh TXT</span>
              </button>
            </div>

            {/* TAB 1: ROAS METRICS & INTERACTIVE SIMULATOR */}
            {activeTab === 'roas' && (
              <div className="space-y-6">
                {/* 4 Key ROAS Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Optimal ROAS */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-orange-100 uppercase tracking-wider">
                        Target ROAS Optimal
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-white/25 text-white uppercase">
                        Paling Cuan
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mt-2 text-white">
                      {analysis.bestTargetRoas}
                    </div>
                    <div className="text-[11px] text-orange-100 mt-1">
                      1 rupiah iklan = omzet {analysis.bestTargetRoas.replace('x', '')} kali lipat
                    </div>
                  </div>

                  {/* Break Even ROAS */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Break-Even ROAS (BEP)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Batas Rugi
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mt-2 text-rose-400">
                      {analysis.breakEvenRoas}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Di bawah angka ini iklan dinyatakan <strong>boncos</strong>
                    </div>
                  </div>

                  {/* CIR / Cost to Income Ratio */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Target Biaya Iklan (CIR)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                        Sehat
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mt-2 text-slate-900">
                      {analysis.recommendedCir}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Maksimal porsi modal iklan dari omzet
                    </div>
                  </div>

                  {/* Max Safe CPC */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Batas Bid / CPC Aman
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        Anti Boros
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mt-2 text-emerald-700">
                      {analysis.maxSafeCpc}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Maksimal tawaran per klik di Shopee
                    </div>
                  </div>
                </div>

                {/* Verdict Diagnostic Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-950">
                      Vonis Strategi ROAS Shopee:
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                      {analysis.roasVerdictSummary}
                    </p>
                    <div className="text-[11px] text-amber-800 pt-1 font-semibold flex items-center gap-3">
                      <span>Harga Produk Terdeteksi: <strong>{analysis.detectedPrice}</strong></span>
                      <span>•</span>
                      <span>Estimasi Margin Bersih: <strong>{analysis.estimatedMarginPercent}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Interactive Ads Financial Simulator */}
                <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-orange-400" />
                      <h4 className="text-base font-extrabold text-white">
                        Simulasi Interaktif: Modal Iklan Harian vs Proyeksi Profit Bersih
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400">
                      Geser untuk melihat kalkulasi keuangan
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                      <span>Pilih Anggaran Iklan Harian Toko:</span>
                      <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                        Rp {budgetSlider.toLocaleString('id-ID')} / hari
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20000"
                      max="1000000"
                      step="10000"
                      value={budgetSlider}
                      onChange={(e) => setBudgetSlider(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Rp 20.000 (Testing Awal)</span>
                      <span>Rp 250.000 (Scale Menengah)</span>
                      <span>Rp 1.000.000 (Mega Scale)</span>
                    </div>
                  </div>

                  {/* Simulator Results Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <div className="text-[11px] text-slate-400 font-medium">Estimasi Klik Iklan</div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                        ~{simClicks.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">klik potensial / hari</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <div className="text-[11px] text-slate-400 font-medium">Estimasi Order Masuk</div>
                      <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">
                        ~{simOrders.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-slate-400">pesanan checkout / hari</div>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <div className="text-[11px] text-slate-400 font-medium">Proyeksi Omzet Harian</div>
                      <div className="text-xl sm:text-2xl font-black text-orange-400 mt-0.5">
                        Rp {simRevenue.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-orange-300">ROAS Est. {simRoas}x</div>
                    </div>

                    <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl text-center">
                      <div className="text-[11px] text-emerald-300 font-medium">Estimasi Profit Bersih</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">
                        Rp {simProfit.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-emerald-200">Setelah dikurangi iklan & HPP</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
                    💡 <em>Tips Media Buyer:</em> Mulai dengan anggaran <strong>Rp 35.000 - Rp 50.000 / hari</strong> selama 3 hari pertama untuk membiarkan algoritma Shopee mempelajari riwayat klik. Begitu ROAS stabil di atas {analysis.breakEvenRoas}, naikkan anggaran bertahap 20% tiap 2 hari.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SEARCH ADS KEYWORDS TABLE */}
            {activeTab === 'search_ads' && (
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Rekomendasi Pengaturan Dasar Iklan Pencarian
                    </span>
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800 mt-1 flex-wrap">
                      <span>Mode: <span className="text-orange-600">{analysis.searchAdsSettings.biddingMode}</span></span>
                      <span>•</span>
                      <span>Modal: <span className="text-emerald-600">{analysis.searchAdsSettings.budgetType}</span></span>
                      <span>•</span>
                      <span>Periode: <span className="text-blue-600">{analysis.searchAdsSettings.campaignDuration}</span></span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyKeywordsOnly}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0"
                  >
                    {copiedKey === 'keywords_bulk' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Daftar Kata Kunci Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Semua Kata Kunci</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Keywords Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-3 bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-orange-500" />
                      12 - 15 Kata Kunci Pencocokan Spesifik (Exact Match) Siap Pasang:
                    </span>
                    <span className="text-[11px] font-normal text-slate-500">
                      Haram pakai pencocokan luas di awal
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3 w-10">No</th>
                          <th className="p-3">Kata Kunci Iklan Shopee</th>
                          <th className="p-3">Tipe Pencocokan</th>
                          <th className="p-3">Rekomendasi Bid / Klik</th>
                          <th className="p-3">Volume Pencarian</th>
                          <th className="p-3">Karakteristik Pembeli</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {analysis.searchAdsSettings.keywords.map((kw, i) => (
                          <tr key={i} className="hover:bg-orange-50/40 transition-colors">
                            <td className="p-3 font-bold text-slate-400">{i + 1}</td>
                            <td className="p-3 font-bold text-slate-900">{kw.keyword}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                {kw.matchType}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-black text-orange-600">{kw.recommendedBid}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                                {kw.searchVolume}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600 font-medium">{kw.intent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DISCOVERY / SIMILAR PRODUCTS ADS */}
            {activeTab === 'discovery_ads' && (
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                      Strategi Iklan Produk Serupa (Discovery Ads)
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900">
                      Modal Rekomendasi: {analysis.discoveryAdsSettings.recommendedDailyBudget}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-950 mt-1 leading-relaxed font-medium">
                    {analysis.discoveryAdsSettings.keyTactic}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {analysis.discoveryAdsSettings.placements.map((plc, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h5 className="font-bold text-sm text-slate-900">
                          {plc.placementName}
                        </h5>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-medium">Settingan Tawaran:</div>
                        <div className="text-sm font-black text-purple-700 mt-0.5">
                          {plc.recommendedBidOrPremium}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {plc.strategyTip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: ANTI-BONCOS RULES */}
            {activeTab === 'rules' && (
              <div className="space-y-4">
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-rose-950">
                      Protokol Ketat Media Buyer: Cegah Uang Iklan Terbakar Sia-Sia
                    </h5>
                    <p className="text-xs text-rose-800 mt-0.5 leading-relaxed">
                      Terapkan 6 SOP evaluasi di bawah ini setiap hari pukul 20:00 WIB untuk memastikan iklan selalu profit konsisten.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.antiBoncosRules.map((rule, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3 shadow-xs">
                      <div className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: TUTORIAL CARA PASANG */}
            {activeTab === 'tutorial' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h5 className="font-bold text-sm text-blue-950">
                    Langkah Demi Langkah Memasang Iklan di Shopee Seller Centre:
                  </h5>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Ikuti urutan ini dalam waktu kurang dari 3 menit tanpa bingung.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h6 className="font-bold text-sm text-slate-900">Buka Menu Promosi Saya & Iklan Shopee</h6>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Login ke <strong>seller.shopee.co.id</strong>, klik menu <strong>Iklan Shopee</strong> di kolom sebelah kiri, lalu klik tombol oranye <strong>+ Buat Iklan Baru</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h6 className="font-bold text-sm text-slate-900">Pilih "Iklan Pencarian Produk" & Tentukan Modal Harian</h6>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Pilih produk Anda. Pada opsi Modal, pilih <strong>Tentukan Modal Harian</strong> senilai <strong>Rp 35.000 - Rp 50.000</strong>. Periode pilih <strong>Tanpa Batas Waktu</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h6 className="font-bold text-sm text-slate-900">Matikan Mode Otomatis & Pilih "Pencocokan Manual"</h6>
                      <p className="text-xs text-slate-600 mt-0.5">
                        ⚠️ <em>Wajib dimatikan tombol Otomatis.</em> Klik <strong>+ Tambah Kata Kunci Rekomendasi</strong>. Hapus kata kunci acak dari Shopee, lalu masukkan 12-15 kata kunci spesifik dari tabel di Tab Iklan Pencarian tools ini.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      4
                    </span>
                    <div>
                      <h6 className="font-bold text-sm text-slate-900">Ubah Tipe Menjadi "Pencocokan Spesifik" & Pasang Bid</h6>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Pilih tipe <strong>Spesifik</strong> (bukan Luas) untuk seluruh kata kunci. Masukkan harga tawaran per klik sesuai rekomendasi (antara Rp 250 - Rp 400). Klik <strong>Aktifkan Iklan</strong>!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Formula dirancang untuk menjaga kestabilan ROAS di Shopee Seller Centre tanpa membuang budget iklan.
          </div>
          <div className="flex items-center gap-2">
            {analysis && (
              <button
                onClick={() => copyText(analysis.fullAdsConfigExportText, 'footer_copy')}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                {copiedKey === 'footer_copy' ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Konfigurasi Iklan Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white" />
                    <span>Salin Semua Settingan</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
