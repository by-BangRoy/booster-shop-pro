import React, { useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, Heart, Share2, ShoppingCart, MessageCircle, ArrowLeft, Check, Sparkles, Truck } from 'lucide-react';
import { AuditResult } from '../types/audit';

interface ShopeeMockupPreviewProps {
  audit: AuditResult;
}

export const ShopeeMockupPreview: React.FC<ShopeeMockupPreviewProps> = ({ audit }) => {
  const [viewMode, setViewMode] = useState<'AFTER' | 'BEFORE'>('AFTER');

  const isAfter = viewMode === 'AFTER';

  const titleToDisplay = isAfter
    ? audit.seoTitles.option1_AlgorithmChamp
    : audit.productName;

  const priceToDisplay = isAfter
    ? audit.pricingStrategy.suggestedPromoPrice
    : 'Rp 65.000';

  const strikePrice = isAfter
    ? audit.pricingStrategy.suggestedCorePrice
    : 'Rp 70.000';

  const discountBadge = isAfter
    ? audit.pricingStrategy.discountPercentage
    : '5%';

  const salesText = isAfter ? '1.8RB Terjual' : '14 Terjual';
  const ratingText = isAfter ? '4.9' : '4.4';
  const reviewCount = isAfter ? '(890 ulasan)' : '(7 ulasan)';

  return (
    <section id="section-mockup" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
              9
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Simulasi Tampilan Aplikasi Shopee (Sebelum vs Sesudah)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Lihat perbandingan visual langsung bagaimana pembeli melihat produk Anda di layar smartphone Shopee.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            onClick={() => setViewMode('BEFORE')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              !isAfter
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sebelum Optimasi (Sepi)
          </button>
          <button
            onClick={() => setViewMode('AFTER')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              isAfter
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-orange-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Sesudah Optimasi (Viral 1000+)</span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        {/* Smartphone Shopee Frame */}
        <div className="w-full max-w-[380px] bg-white rounded-[32px] shadow-2xl border-[6px] border-slate-800 overflow-hidden relative text-slate-900 font-sans">
          {/* Phone Top Notch / Status Bar */}
          <div className="bg-slate-900 text-white text-[10px] px-6 py-1 flex items-center justify-between">
            <span className="font-semibold">09:41</span>
            <div className="w-16 h-3.5 bg-black rounded-full" />
            <span className="font-semibold">5G 100%</span>
          </div>

          {/* Shopee App Header */}
          <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <div className="p-1.5 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-4 h-4 text-slate-700" />
              </div>
              <div className="bg-slate-100 text-slate-400 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 w-40 truncate">
                <span>Cari di Shopee...</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Share2 className="w-4 h-4" />
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>

          {/* Product Image Frame */}
          <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
            {/* Visual Cover Badge */}
            {isAfter ? (
              <div className="absolute inset-0 p-3 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                    STAR+ SELLER
                  </span>
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow">
                    GRATIS ONGKIR XTRA
                  </span>
                </div>

                {/* Stiker Hook Cover Slide 1 */}
                <div className="mx-auto text-center px-3 py-1.5 bg-slate-900/90 text-white rounded-lg shadow-lg border border-amber-300/50 transform -rotate-1">
                  <div className="text-[10px] font-black text-amber-300">
                    {audit.visualBlueprint[0]?.overlayTextHook || 'GARANSI 100% ORIGINAL - PASTI PAS'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded">
                    COD AKTIF
                  </span>
                  <span className="bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                    1/9 Foto
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center p-4">
                <div className="text-xs text-slate-400 font-medium">Foto Polos Tanpa Badge & Hook</div>
                <div className="text-[10px] text-slate-400 mt-1">CTR Rata-rata &lt; 2.5%</div>
              </div>
            )}
            <div className="text-slate-300 font-black text-5xl select-none opacity-40">
              SHOPEE
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-3.5 space-y-2 bg-white">
            {/* Price Row */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-orange-600">
                {priceToDisplay}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {strikePrice}
              </span>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                -{discountBadge}
              </span>
            </div>

            {/* Title */}
            <div className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug">
              {titleToDisplay}
            </div>

            {/* Ratings & Sold */}
            <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-1">
              <div className="flex items-center text-amber-500 font-bold gap-0.5">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{ratingText}</span>
              </div>
              <span>•</span>
              <span className="text-slate-500">{reviewCount}</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">{salesText}</span>
            </div>

            {/* Shopee Badges */}
            {isAfter && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Gratis Ongkir s/d Rp 20.000 dengan SpayLater</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-orange-700 bg-orange-50 px-2 py-1 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>Garansi Shopee: Bebas Pengembalian 7 Hari</span>
                </div>
              </div>
            )}
          </div>

          {/* Shopee Bottom Bar */}
          <div className="bg-white border-t border-slate-200 p-2 flex items-center gap-2">
            <button className="flex flex-col items-center justify-center px-2 py-1 text-slate-600 hover:text-orange-600">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-[9px]">Chat</span>
            </button>
            <button className="flex flex-col items-center justify-center px-2 py-1 text-slate-600 hover:text-orange-600">
              <ShoppingCart className="w-4 h-4 text-orange-500" />
              <span className="text-[9px]">Keranjang</span>
            </button>
            <button className="flex-1 bg-orange-600 text-white font-bold py-2.5 rounded-lg text-xs tracking-tight shadow-md flex items-center justify-center">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="text-center mt-3 text-xs text-slate-500">
          {isAfter ? (
            <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
              <Check className="w-4 h-4" />
              Tampilan Setelah Dioptimalkan: Siap Bersaing di Peringkat 1 Halaman Pencarian Shopee!
            </span>
          ) : (
            <span className="text-rose-600 font-semibold">
              Tampilan Awal: Kurang daya pikat visual, rentan dilewati pembeli ke toko sebelah.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
