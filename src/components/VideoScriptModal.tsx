import React, { useState } from 'react';
import { X, Film, Sparkles, Copy, Check, Video, RefreshCw, AlertCircle } from 'lucide-react';

interface VideoScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const VideoScriptModal: React.FC<VideoScriptModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [targetAudience, setTargetAudience] = useState('');
  const [usp, setUsp] = useState('');
  const [script, setScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          targetAudience,
          usp,
        }),
      });

      if (!res.ok) throw new Error('Gagal memproses naskah video.');
      const data = await res.json();
      setScript(data.script);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat memproses script.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(script);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl">
              <Film className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Generator Script Viral Shopee Video (Subsidi 40%)
              </h3>
              <p className="text-xs text-orange-100">
                Pancing ribuan orderan otomatis lewat keranjang oranye Shopee Video
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold text-amber-950">💡 Rahasia Top Seller:</strong> Shopee sedang menggelontorkan subsidi voucher potongan harga 30%-40% untuk penonton yang checkout via Shopee Video. Upload 1-2 video pendek per hari dengan naskah hook di bawah ini untuk memicu lonjakan orderan otomatis!
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Produk Target
              </label>
              <input
                type="text"
                value={productName}
                readOnly
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs text-slate-800 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Audiens (Opsional)
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Contoh: Mahasiswa, Ibu muda, Pekerja kantoran"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keunggulan Utama / USP (Opsional)
                </label>
                <input
                  type="text"
                  value={usp}
                  onChange={(e) => setUsp(e.target.value)}
                  placeholder="Contoh: Tahan seharian, bahan tebal adem, garansi tukar baru"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Meracik Naskah Viral...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Generate Script Video 15-30 Detik</span>
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </div>
          )}

          {script && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hasil Naskah Shopee Video (Siap Rekam):
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1.5"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Naskah</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto border border-slate-800 shadow-inner">
                {script}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
