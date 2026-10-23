import React, { useState } from 'react';
import { MessageSquare, Video, Zap, Copy, Check, Send, ShoppingBag, ShieldCheck, HeartHandshake, Film } from 'lucide-react';
import { AutomationSystem } from '../types/audit';

interface AutomationSectionProps {
  automation: AutomationSystem;
  productName: string;
  onOpenVideoModal: () => void;
}

export const AutomationSection: React.FC<AutomationSectionProps> = ({
  automation,
  productName,
  onOpenVideoModal,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="section-automation" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
              7
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Sistem Automasi Toko 24/7 (Kunci Tembus Ribuan Orderan)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Orderan ribuan masuk otomatis saat Anda tidur melalui template chat auto-reply kilat, broadcast keranjang, & subsidi Shopee Video.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVideoModal}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Film className="w-3.5 h-3.5" />
          <span>Buat Script Shopee Video</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Chat Auto-Reply 1: Greeting */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Auto-Reply Asisten Chat Shopee
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Tingkat Balasan 100%
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Pesan Sambutan Otomatis (Greeting Baru):
            </h4>
            <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
              {automation.autoReplyGreeting}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80">
            <span className="text-[11px] text-slate-500">Pasang di Menu Chat Assistant Shopee</span>
            <button
              onClick={() => copyText(automation.autoReplyGreeting, 'greeting')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              {copiedKey === 'greeting' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Chat Auto-Reply 2: Stock Fast Response */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-500" />
                Balasan Kilat Stok & Pengiriman
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                Anti Keraguan
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Jawaban Otomatis Saat Ditanya "Ready Kak?":
            </h4>
            <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
              {automation.autoReplyStockQuery}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80">
            <span className="text-[11px] text-slate-500">Mendorong checkout detik itu juga</span>
            <button
              onClick={() => copyText(automation.autoReplyStockQuery, 'stock')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              {copiedKey === 'stock' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Broadcast Keranjang Ditinggalkan */}
        <div className="bg-amber-50/60 rounded-2xl p-4 sm:p-5 border border-amber-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                Broadcast Chat Keranjang Ditinggalkan
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded">
                +25% Closing Rate
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Pengingat Pembeli yang Belum Bayar:
            </h4>
            <div className="mt-2 p-3 bg-white rounded-xl border border-amber-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
              {automation.abandonedCartBroadcast}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-200">
            <span className="text-[11px] text-slate-500">Kirim lewat Pesan Siaran Shopee</span>
            <button
              onClick={() => copyText(automation.abandonedCartBroadcast, 'broadcast')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              {copiedKey === 'broadcast' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Kartu Sisipan Paket Bintang 5 */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 sm:p-5 border border-emerald-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                Kartu Sisipan Paket (Thank You Card)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200/80 text-emerald-900 rounded">
                Pancing Rating 5 & Video
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              Teks Kartu Sisipan Cetak Kecil di Dus:
            </h4>
            <div className="mt-2 p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed shadow-inner">
              {automation.packageInsertCardText}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-200">
            <span className="text-[11px] text-slate-500">Cetak ukuran 9x6 cm masukkan ke paket</span>
            <button
              onClick={() => copyText(automation.packageInsertCardText, 'insert')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              {copiedKey === 'insert' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Teks Kartu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Shopee Video Hack & Ads Strategy */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 font-extrabold text-sm text-white">
              <Video className="w-4 h-4 text-amber-200" />
              Trik Emas Subsidi Shopee Video (Diskon 30-40%)
            </div>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">
              Algoritma Terbaru
            </span>
          </div>
          <p className="text-xs text-orange-100 leading-relaxed mt-2 font-medium">
            {automation.shopeeVideoHack}
          </p>
        </div>

        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 font-extrabold text-sm text-amber-400">
              <Zap className="w-4 h-4 text-amber-400" />
              Strategi Iklan Shopee Berbiaya Murah (ROAS Tinggi)
            </div>
            <span className="text-[10px] font-bold bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              Hemat Anggaran
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2 font-normal">
            {automation.shopeeAdsStrategy}
          </p>
        </div>
      </div>
    </section>
  );
};
