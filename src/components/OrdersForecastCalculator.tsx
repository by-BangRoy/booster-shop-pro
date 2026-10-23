import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { OrdersForecast } from '../types/audit';

interface OrdersForecastCalculatorProps {
  forecast: OrdersForecast;
  suggestedPrice?: string;
}

export const OrdersForecastCalculator: React.FC<OrdersForecastCalculatorProps> = ({
  forecast,
  suggestedPrice = 'Rp 89.000',
}) => {
  // Extract number from price string or fallback
  const numericPrice = parseInt(suggestedPrice.replace(/[^0-9]/g, '')) || 85000;

  const [impressions, setImpressions] = useState<number>(forecast.dailyImpressionsNeeded || 15000);
  const [ctr, setCtr] = useState<number>(parseFloat(forecast.targetCTR) || 8.5);
  const [cr, setCr] = useState<number>(parseFloat(forecast.targetConversionRate) || 4.2);

  // Calculations
  const dailyVisits = Math.round((impressions * ctr) / 100);
  const dailyOrders = Math.round((dailyVisits * cr) / 100);
  const monthlyOrders = dailyOrders * 30;
  const monthlyGmv = monthlyOrders * numericPrice;

  return (
    <section id="section-forecast" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">
              8
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Kalkulator & Proyeksi Tembus 1.000+ Orderan Otomatis
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Hitung angka matematis funnel Shopee: dari impresi pencarian, klik foto (CTR), hingga konversi checkout harian.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full self-start sm:self-auto flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          Simulasi Interaktif
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Sliders */}
        <div className="lg:col-span-6 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Ubah Variabel Funnel Toko:
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Target Impresi Harian (Organik + Video + Iklan):</span>
              <span className="text-orange-600 font-mono font-extrabold text-sm">
                {impressions.toLocaleString('id-ID')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={impressions}
              onChange={(e) => setImpressions(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>2.000 (Awal)</span>
              <span>25.000 (Menengah)</span>
              <span>50.000 (Viral)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>CTR Foto Sampul Slide 1 (% Klik):</span>
              <span className="text-orange-600 font-mono font-extrabold text-sm">
                {ctr.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="2.0"
              max="15.0"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>2% (Standar Buruk)</span>
              <span>6% (Cukup)</span>
              <span>&gt;10% (Hook Juara)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Tingkat Konversi Pembeli / CR (% Checkout):</span>
              <span className="text-emerald-600 font-mono font-extrabold text-sm">
                {cr.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.1"
              value={cr}
              onChange={(e) => setCr(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>1% (Ragu-ragu)</span>
              <span>3.5% (Optimal)</span>
              <span>6%+ (Super Trusted)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>Estimasi Pengunjung Harian (Visits):</span>
            <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {dailyVisits.toLocaleString('id-ID')} klik/hari
            </span>
          </div>
        </div>

        {/* Forecast Output Metrics */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-4 sm:p-5 rounded-2xl shadow-md">
              <div className="text-xs text-orange-100 font-medium flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-200" />
                Orderan Harian
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                {dailyOrders.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-orange-100 mt-0.5">
                Pesanan Masuk / Hari
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-4 sm:p-5 rounded-2xl shadow-md">
              <div className="text-xs text-emerald-100 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-200" />
                Target 30 Hari
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                {monthlyOrders.toLocaleString('id-ID')}
              </div>
              <div className="text-[11px] text-emerald-100 mt-0.5">
                Total Orderan / Bulan
              </div>
            </div>
          </div>

          {/* GMV Projection Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Estimasi Omzet Bulanan (GMV):
              </span>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/70 border border-amber-600/30 px-2 py-0.5 rounded">
                Harga Rata-rata: Rp {numericPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-2">
              Rp {monthlyGmv.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Dengan menerapkan seluruh formula di atas, toko Anda berpotensi memproses {monthlyOrders} paket pengiriman per bulan secara teratur.
            </div>
          </div>
        </div>
      </div>

      {/* 4-Phase Acceleration Roadmap */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-orange-500" />
          Roadmap 30 Hari Menuju 1.000 Orderan Otomatis:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {forecast.roadmapTo1000Orders.map((step, idx) => {
            const phaseTitles = ['Fase 1: Hari 1-3', 'Fase 2: Hari 4-7', 'Fase 3: Hari 8-14', 'Fase 4: Hari 15-30'];

            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-black uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                    {phaseTitles[idx] || `Langkah ${idx + 1}`}
                  </span>
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
