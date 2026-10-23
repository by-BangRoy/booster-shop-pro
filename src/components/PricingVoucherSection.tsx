import React from 'react';
import { Tag, Percent, Gift, Ticket, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { PricingStrategy } from '../types/audit';

interface PricingVoucherSectionProps {
  pricing: PricingStrategy;
}

export const PricingVoucherSection: React.FC<PricingVoucherSectionProps> = ({ pricing }) => {
  return (
    <section id="section-pricing" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">
              6
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Strategi Psikologi Harga Coret & Magnet Voucher Toko
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Pembeli Shopee sangat sensitif terhadap ilusi diskon. Formula ini menaikkan Average Order Value (AOV) sekaligus konversi.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full self-start sm:self-auto flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-emerald-600" />
          Harga Jangkar Psikologis
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Core Price & Promo Box */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-white rounded-2xl p-5 border border-orange-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
                Formula Harga Coret
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-orange-600 text-white">
                Diskon {pricing.discountPercentage}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div>
                <span className="text-[11px] text-slate-500 font-medium">Harga Coret Sebelum Diskon:</span>
                <div className="text-base font-bold text-slate-400 line-through">
                  {pricing.suggestedCorePrice}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-orange-700 font-bold">Harga Promo Yang Dibayar Pembeli:</span>
                <div className="text-2xl font-black text-orange-600 tracking-tight">
                  {pricing.suggestedPromoPrice}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-orange-900/80 mt-4 pt-3 border-t border-orange-200/60 leading-relaxed">
            Memberikan efek "Untung Besar" saat pembeli membandingkan produk Anda dengan kompetitor di halaman pencarian.
          </p>
        </div>

        {/* Bundle Strategy */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Gift className="w-4 h-4 text-orange-500" />
              Paket Diskon & Kombo Hemat
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 mt-2">
              Menaikkan Keranjang Belanja Otomatis:
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
              {pricing.bundleStrategy}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Aktifkan menu "Paket Diskon" di Promosi Saya Seller Centre.</span>
          </div>
        </div>

        {/* Voucher Recommendations */}
        <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Ticket className="w-4 h-4 text-emerald-600" />
              Rekomendasi Voucher Toko
            </div>
            <h4 className="text-sm font-extrabold text-emerald-950 mt-2">
              Kunci "Ikuti Toko" & Cashback:
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900 mt-1.5 leading-relaxed font-medium">
              {pricing.voucherRecommendation}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/60 text-xs text-emerald-800 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Menekan pembatalan order & menaikkan followers toko secara pasif.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
