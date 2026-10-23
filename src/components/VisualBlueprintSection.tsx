import React, { useState } from 'react';
import { Camera, Image, Layers, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { VisualSlide } from '../types/audit';

interface VisualBlueprintSectionProps {
  blueprint: VisualSlide[];
}

export const VisualBlueprintSection: React.FC<VisualBlueprintSectionProps> = ({ blueprint }) => {
  const [selectedSlide, setSelectedSlide] = useState<number>(1);

  const activeSlide = blueprint.find((s) => s.slideNumber === selectedSlide) || blueprint[0];

  return (
    <section id="section-visuals" className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-bold text-xs">
              5
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Blueprint Visual 9-Slide Foto Produk Shopee (CTR &gt; 12%)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 ml-8">
            Foto sampul Slide 1 menentukan 80% klik pembeli. Slide 2-9 bertugas menghapus keraguan hingga terjadi checkout.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full self-start sm:self-auto flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-violet-600" />
          Rasio 1:1 Foto Optimal
        </span>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {blueprint.map((slide) => {
          const isSelected = slide.slideNumber === selectedSlide;
          const isCover = slide.slideNumber === 1;

          return (
            <button
              key={slide.slideNumber}
              onClick={() => setSelectedSlide(slide.slideNumber)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                  isCover
                    ? isSelected
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-600'
                    : isSelected
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {slide.slideNumber}
              </span>
              <span>{isCover ? 'Cover Utama (Wajib)' : `Slide ${slide.slideNumber}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Slide Detailed Blueprint */}
      {activeSlide && (
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-violet-50/20 to-orange-50/20 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Simulated 1:1 Frame */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[280px] aspect-square bg-slate-900 rounded-2xl relative shadow-xl overflow-hidden border-4 border-white flex flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between z-10">
                  <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                    SLIDE {activeSlide.slideNumber}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                    {activeSlide.role}
                  </span>
                </div>

                {/* Sticker / Overlay Hook */}
                <div className="my-auto text-center px-3 py-2 bg-gradient-to-r from-orange-600/90 to-amber-600/90 rounded-xl backdrop-blur-sm shadow-lg border border-amber-300/40 transform -rotate-1">
                  <div className="text-[10px] uppercase font-bold text-amber-200">
                    Teks Stiker Wajib Ditempel:
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white mt-0.5 tracking-tight">
                    "{activeSlide.overlayTextHook}"
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-300 z-10 bg-black/40 px-2 py-1 rounded">
                  <span>Shopee 1:1 HD Square</span>
                  <span>CTR Booster</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-2 font-medium">
                Simulasi Frame 1:1 Thumbnail Shopee
              </div>
            </div>

            {/* Slide Instructions */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Fungsi & Peran Slide {activeSlide.slideNumber}:
                </span>
                <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">
                  {activeSlide.role}
                </h4>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                  Instruksi Pengambilan Foto & Layout:
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeSlide.visualInstructions}
                </p>
              </div>

              <div className="p-3.5 bg-violet-50/80 rounded-xl border border-violet-200 space-y-1">
                <div className="text-xs font-bold text-violet-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  Psikologi Konversi Pembeli:
                </div>
                <p className="text-xs sm:text-sm text-violet-800 leading-relaxed font-medium">
                  {activeSlide.conversionPsychology}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Format disesuaikan dengan algoritma visual search & feed Shopee 2026.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
