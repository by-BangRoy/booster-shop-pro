import React from 'react';
import { ShoppingBag, Zap, ShieldCheck, Sparkles, Lock, KeyRound } from 'lucide-react';

interface HeaderProps {
  onLock?: () => void;
  onChangePin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLock, onChangePin }) => {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white shadow-lg border-b border-orange-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 flex items-center justify-center shadow-md font-bold text-2xl flex-shrink-0 relative overflow-hidden group">
              <ShoppingBag className="w-7 h-7 text-orange-600 transition-transform group-hover:scale-110" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-orange-900" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  ShopeeBooster <span className="text-amber-200">Pro</span>
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/25">
                  <Zap className="w-3 h-3 mr-1 text-amber-300" />
                  1-Klik Audit & Otomasi Orderan
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/25 text-emerald-100 border border-emerald-300/30">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-300" />
                  Algoritma Shopee 2026
                </span>
              </div>
              <p className="text-orange-100 text-xs sm:text-sm mt-0.5 font-normal max-w-3xl">
                Cek semua kesalahan listing produk Shopee dalam 1 kali klik dan dapatkan solusi instan: Judul SEO, Copywriting Penjualan, Foto 1:1, Psikologi Diskon, & Trik Shopee Video agar tembus 1.000+ orderan otomatis.
              </p>
            </div>
          </div>

          {/* Action Menu & Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap flex-shrink-0">

            {onChangePin && (
              <button
                type="button"
                onClick={onChangePin}
                title="Ganti PIN Akses Tools"
                className="px-3 py-1.5 bg-black/15 hover:bg-black/25 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                <span>Ganti PIN</span>
              </button>
            )}
            {onLock && (
              <button
                type="button"
                onClick={onLock}
                title="Kunci Tools (Keluar)"
                className="px-3 py-1.5 bg-black/25 hover:bg-black/40 text-white text-xs font-bold rounded-xl border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-orange-200" />
                <span>Kunci Tools</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
