import React, { useState } from 'react';
import {
  X,
  Flame,
  Copy,
  Check,
  Download,
  Tag,
  Zap,
  Sparkles,
  ShoppingBag,
  Ticket,
  Radio,
  MessageSquare,
  Search,
  CheckCircle2,
  Gift,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Master1000Recipe } from '../types/audit';

interface Instant1000RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Master1000Recipe | null;
  isLoading: boolean;
}

export const Instant1000RecipeModal: React.FC<Instant1000RecipeModalProps> = ({
  isOpen,
  onClose,
  recipe,
  isLoading,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'catalog' | 'pricing' | 'visual' | 'live' | 'chat' | 'ads' | 'settings'>('all');

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = () => {
    if (!recipe) return;
    const blob = new Blob([recipe.fullMasterExportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Racikan-1000-Orderan-${recipe.productName.slice(0, 25)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
              <Flame className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/25 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                  Hasil Racikan 1-Klik Terbaru
                </span>
                <span className="text-amber-200 text-xs font-bold">1.000 Orderan / Hari</span>
                <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Settingan Shopee 2026
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                Paket Racikan 1.000 Orderan Lengkap Siap Pasang
              </h3>
              <p className="text-xs text-orange-100 max-w-xl">
                Algoritma judul, varian pancingan termurah, foto hook, deskripsi hipnotik, skrip live streaming, dan SOP settingan Shopee terupdate.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
            {recipe && (
              <button
                onClick={() => copyText(recipe.fullMasterExportText, 'full_master')}
                className="px-4 py-2.5 bg-white text-slate-900 hover:bg-orange-50 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {copiedKey === 'full_master' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Semua Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-orange-600" />
                    <span>Salin Seluruh Racikan</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center my-auto">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-800">
              Sedang Meracik Formula 1.000 Orderan Lengkap...
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Menghitung harga coret, merumuskan varian pancingan, foto sampul, naskah live stream, dan kata kunci iklan spesifik.
            </p>
          </div>
        )}

        {/* Recipe Content */}
        {!isLoading && recipe && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Action Bar Sub-tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua Komponen
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'catalog'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Judul & Varian Pancingan
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'pricing'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Harga & Voucher
                </button>
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'visual'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Foto Sampul & Deskripsi
                </button>
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'live'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Skrip Shopee Live
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'chat'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Chat & Kartu Bintang 5
                </button>
                <button
                  onClick={() => setActiveTab('ads')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'ads'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  10 Kata Kunci Iklan
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    activeTab === 'settings'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Settingan Shopee 2026
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="text-xs font-bold text-slate-600 hover:text-orange-600 flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg hover:bg-orange-50 border border-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh TXT</span>
              </button>
            </div>

            {/* 1. Judul Juara Algoritma */}
            {(activeTab === 'all' || activeTab === 'catalog') && (
              <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-orange-600" />
                    1. Racikan Judul Juara Algoritma Pencarian Shopee Terupdate
                  </span>
                  <button
                    onClick={() => copyText(recipe.recipeTitle, 'title')}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-orange-200"
                  >
                    {copiedKey === 'title' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Judul</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-white rounded-xl border border-orange-200 text-sm font-bold text-slate-900 select-all shadow-inner leading-relaxed">
                  {recipe.recipeTitle}
                </div>
                <p className="text-[11px] text-slate-500">
                  Format sesuai kaidah Shopee Seller Centre: <em>[Merek/Original] + [Kata Kunci Utama] + [Model/Kelebihan] + [USP/Garansi]</em>.
                </p>
              </div>
            )}

            {/* 2. Trik Varian Pancingan (Loss Leader) */}
            {(activeTab === 'all' || activeTab === 'catalog') && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-red-600" />
                    2. Trik Rahasia Varian Pancingan Termurah (Loss Leader Hook)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-600 text-white rounded">
                    Kunci Lonjakan CTR Klik
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="text-[11px] text-slate-500 font-medium">Nama Varian Pancingan:</span>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {recipe.lossLeaderVariant.variantName}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="text-[11px] text-red-600 font-bold">Harga Jual Pancingan:</span>
                    <div className="text-xl font-black text-red-600 mt-0.5">
                      {recipe.lossLeaderVariant.baitPrice}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="text-[11px] text-slate-500 font-medium">Harga Produk Utama:</span>
                    <div className="text-lg font-black text-slate-800 mt-0.5">
                      {recipe.lossLeaderVariant.corePrice}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/90 rounded-xl border border-red-200 text-xs text-red-950 font-medium leading-relaxed">
                  <strong>Bagaimana Ini Bekerja di Algoritma Shopee:</strong> {recipe.lossLeaderVariant.howItTriggersCTR}
                </div>
              </div>
            )}

            {/* 3. Harga Coret & Voucher Toko */}
            {(activeTab === 'all' || activeTab === 'pricing') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Diskon Coret & Kombo */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-orange-500" />
                    3. Formulasi Harga Coret & Kombo Hemat
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-medium">Harga Coret Sebelum Diskon</div>
                      <div className="text-sm font-bold text-slate-400 line-through">
                        {recipe.pricingAndDiscounts.originalStrikePrice}
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-orange-600 font-bold">Harga Promo Final ({recipe.pricingAndDiscounts.discountPercent})</div>
                      <div className="text-lg font-black text-orange-600">
                        {recipe.pricingAndDiscounts.promoSellingPrice}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    <strong className="text-orange-600">Kombo Hemat:</strong> {recipe.pricingAndDiscounts.comboDeal}
                  </div>
                </div>

                {/* Voucher Toko */}
                <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-emerald-600" />
                    4. Rekomendasi Voucher Toko Shopee
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
                      <strong className="text-emerald-800 block">Voucher Ikuti Toko (Follow Prize):</strong>
                      <span className="text-slate-700">{recipe.pricingAndDiscounts.followPrizeVoucher}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200">
                      <strong className="text-emerald-800 block">Voucher Tambahan Pembelian:</strong>
                      <span className="text-slate-700">{recipe.pricingAndDiscounts.extraStoreVoucher}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Foto Sampul Hook & Deskripsi Hipnotik */}
            {(activeTab === 'all' || activeTab === 'visual') && recipe.coverPhotoHook && (
              <div className="space-y-4">
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      5. Hook Foto Sampul Slide 1 (CTR Multiplier)
                    </span>
                    <button
                      onClick={() => copyText(recipe.coverPhotoHook.stickerHeadline, 'cover_hook')}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      {copiedKey === 'cover_hook' ? 'Tersalin!' : 'Salin Teks Stiker'}
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200">
                    <div className="text-[11px] text-slate-500 font-medium">Teks Stiker Hook Wajib di Foto:</div>
                    <div className="text-sm font-black text-amber-900 mt-0.5">
                      {recipe.coverPhotoHook.stickerHeadline}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Badge Wajib Diaktifkan:</span>
                    {recipe.coverPhotoHook.badges.map((b, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-200">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-slate-600 bg-white/70 p-2.5 rounded-lg border border-amber-200/80">
                    <strong>Tips Visual 1:1:</strong> {recipe.coverPhotoHook.visualLayoutTip}
                  </div>
                </div>

                {recipe.copywritingDescription && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-orange-600" />
                        Deskripsi Penjualan Hipnotik Siap Pakai
                      </span>
                      <button
                        onClick={() => copyText(recipe.copywritingDescription.bodyText, 'desc_text')}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        {copiedKey === 'desc_text' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Deskripsi</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-60 overflow-y-auto">
                      {recipe.copywritingDescription.bodyText}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {recipe.copywritingDescription.hashtags.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-200/80 text-slate-700 text-[11px] font-medium rounded-md">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Skrip Live Streaming Pembuka */}
            {(activeTab === 'all' || activeTab === 'live') && (
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-amber-400" />
                    6. Naskah Host Shopee Live (10 Menit Pertama Pemicu 100 Checkout)
                  </span>
                  <button
                    onClick={() => copyText(recipe.liveStreamOpeningScript, 'live_script')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700"
                  >
                    {copiedKey === 'live_script' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Skrip Live</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap text-slate-200 select-all shadow-inner">
                  {recipe.liveStreamOpeningScript}
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span><strong>Jam Emas Shopee Live 2026:</strong> Sesi Siang (11.30 - 13.30 WIB) & Sesi Malam (19.30 - 22.00 WIB) dengan voucher live diskon 50%.</span>
                </div>
              </div>
            )}

            {/* 6. Chat Automation & Broadcast & Package Insert Card */}
            {(activeTab === 'all' || activeTab === 'chat') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-orange-500" />
                        Salam Pembuka Asisten Chat
                      </span>
                      <button
                        onClick={() => copyText(recipe.chatAutomation.greeting, 'chat_greeting')}
                        className="text-[11px] font-bold text-orange-600 hover:underline"
                      >
                        {copiedKey === 'chat_greeting' ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {recipe.chatAutomation.greeting}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-amber-500" />
                        Broadcast Keranjang Ditinggalkan
                      </span>
                      <button
                        onClick={() => copyText(recipe.chatAutomation.abandonedCart, 'chat_broadcast')}
                        className="text-[11px] font-bold text-orange-600 hover:underline"
                      >
                        {copiedKey === 'chat_broadcast' ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                      {recipe.chatAutomation.abandonedCart}
                    </div>
                  </div>
                </div>

                {recipe.chatAutomation.fiveStarThankYouCard && (
                  <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-900 flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-pink-600" />
                        Kartu Ucapan Sisipan Paket (Pemicu Ulasan Bintang 5 + Foto Video)
                      </span>
                      <button
                        onClick={() => copyText(recipe.chatAutomation.fiveStarThankYouCard, 'thank_you_card')}
                        className="text-xs font-bold text-pink-700 hover:underline"
                      >
                        {copiedKey === 'thank_you_card' ? 'Tersalin!' : 'Salin Teks Kartu'}
                      </button>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-pink-200 text-xs text-slate-800 leading-relaxed shadow-inner">
                      {recipe.chatAutomation.fiveStarThankYouCard}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. Setting 10 Kata Kunci Iklan Berbiaya Hemat */}
            {(activeTab === 'all' || activeTab === 'ads') && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-emerald-600" />
                    8. Rekomendasi 10 Kata Kunci Iklan Pencarian Spesifik (Exact Match)
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Bid Murah & ROAS Tinggi</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-200/70 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5 rounded-l-lg">No</th>
                        <th className="p-2.5">Kata Kunci Iklan</th>
                        <th className="p-2.5">Tipe Pencocokan</th>
                        <th className="p-2.5 rounded-r-lg">Rekomendasi Bid per Klik</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {recipe.adsTargetKeywords.map((kw, i) => (
                        <tr key={i} className="hover:bg-white transition-colors">
                          <td className="p-2.5 font-bold text-slate-500">{i + 1}</td>
                          <td className="p-2.5 font-bold text-slate-900">{kw.keyword}</td>
                          <td className="p-2.5 font-medium text-emerald-700">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-[10px] font-bold">
                              {kw.matchType || 'Spesifik (Exact)'}
                            </span>
                          </td>
                          <td className="p-2.5 font-bold text-orange-600">{kw.recommendedBid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. Settingan Shopee 2026 Terbaru & Checklist SOP */}
            {(activeTab === 'all' || activeTab === 'settings') && (
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-2xl border border-orange-300 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-orange-600 text-white rounded-lg">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Checklist Settingan Seller Centre Shopee Paling Update & Terbaik
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-orange-200 space-y-1">
                      <div className="font-extrabold text-orange-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        1. Program Garansi Tepat Waktu (On-Time Guarantee)
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Aktifkan opsi pengiriman kilat / reguler terpercaya. Shopee memberikan voucher kompensasi jika kurir terlambat, meningkatkan rasa percaya pembeli seketika.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-200 space-y-1">
                      <div className="font-extrabold text-orange-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        2. Fitur Bebas Pengembalian (Easy Return)
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Wajib diaktifkan di pengaturan toko untuk menaikkan konversi checkout +35% karena pembeli tidak takut barang tidak cocok atau salah size.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-200 space-y-1">
                      <div className="font-extrabold text-orange-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        3. Opsi COD Cek Dulu
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Membuka keran transaksi dari 40%+ pengguna luar Jabodetabek yang masih terbiasa bayar tunai di tempat.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-200 space-y-1">
                      <div className="font-extrabold text-orange-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        4. Trik Keranjang Oranye Shopee Video
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Tautkan produk ke video pendek di Shopee Video untuk mendapatkan subsidi diskon voucher 30%-40% yang dibiayai langsung oleh Shopee.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    SOP Harian Eksekusi Menuju 1.000 Orderan:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-950">
                    {recipe.dailySopActionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Siap dipasang langsung ke menu <strong>Produk Saya & Promosi Saya</strong> di Seller Centre Shopee.
          </div>
          <div className="flex items-center gap-2">
            {recipe && (
              <button
                onClick={() => copyText(recipe.fullMasterExportText, 'footer_copy')}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                {copiedKey === 'footer_copy' ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Paket Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white" />
                    <span>Salin Seluruh Racikan</span>
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
