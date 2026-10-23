import React, { useState, useEffect } from 'react';
import { Lock, AlertCircle, ShieldCheck, ShoppingBag, Delete } from 'lucide-react';

interface PinLoginScreenProps {
  onSuccess: () => void;
}

export const PinLoginScreen: React.FC<PinLoginScreenProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (pinToSubmit = pin) => {
    if (!pinToSubmit || pinToSubmit.length < 4) {
      setErrorMsg('Masukkan minimal 4 digit PIN.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToSubmit }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'PIN salah. Akses ditolak.');
      }

      // Save session in localStorage
      localStorage.setItem('shopeebooster_auth_session', data.token || 'valid');
      localStorage.setItem('shopeebooster_auth_time', Date.now().toString());
      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'PIN yang Anda masukkan salah!');
      setPin('');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleKeypadPress = (val: string) => {
    if (pin.length < 8) {
      const nextPin = pin + val;
      setPin(nextPin);
      setErrorMsg('');
      if (nextPin.length === 6) {
        // Auto submit if reaches 6 digits
        setTimeout(() => {
          handleSubmit(nextPin);
        }, 150);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg('');
  };

  // Listen to physical keyboard typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (/^[0-9]$/.test(e.key)) {
        handleKeypadPress(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  const keypadRows = [
    [
      { num: '1', sub: '•••' },
      { num: '2', sub: 'ABC' },
      { num: '3', sub: 'DEF' },
    ],
    [
      { num: '4', sub: 'GHI' },
      { num: '5', sub: 'JKL' },
      { num: '6', sub: 'MNO' },
    ],
    [
      { num: '7', sub: 'PQRS' },
      { num: '8', sub: 'TUV' },
      { num: '9', sub: 'WXYZ' },
    ],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950 overflow-y-auto selection:bg-orange-500 selection:text-white">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-orange-600/25 via-amber-500/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-700/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Card */}
      <div
        className={`relative z-10 w-full max-w-[420px] bg-slate-900/85 backdrop-blur-2xl rounded-[36px] shadow-2xl border border-white/10 p-6 sm:p-8 flex flex-col items-center transition-all ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        {/* Top Brand Logo with Glowing Ring */}
        <div className="relative mb-4">
          <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-orange-500/25 relative border-2 border-white/20">
            <ShoppingBag className="w-9 h-9 text-white drop-shadow" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-950 rounded-full border-2 border-orange-500 flex items-center justify-center shadow">
              <Lock className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-30 blur-md pointer-events-none -z-10 animate-pulse" />
        </div>

        {/* Title & Tagline */}
        <div className="text-center space-y-1 mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1.5">
            ShopeeBooster <span className="text-amber-400">Pro</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Portal Eksklusif Seller Shopee Indonesia
          </p>
        </div>

        {/* PIN Digit Indicators */}
        <div className="w-full flex flex-col items-center space-y-2 mb-6">
          <div className="flex items-center justify-center gap-3.5 py-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-200 transform ${
                    isFilled
                      ? 'bg-gradient-to-r from-orange-500 to-amber-400 scale-125 shadow-lg shadow-orange-500/60 ring-4 ring-orange-500/25'
                      : 'bg-slate-800 border-2 border-slate-700'
                  }`}
                />
              );
            })}
          </div>

          {pin.length > 6 && (
            <span className="text-[11px] font-mono font-bold text-amber-400">
              +{pin.length - 6} digit tambahan
            </span>
          )}

          {errorMsg && (
            <div className="mt-1 px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-300 flex items-center gap-1.5 animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tactile Keypad */}
        <div className="w-full max-w-[320px] space-y-3 mb-6">
          {keypadRows.map((row, rIdx) => (
            <div key={rIdx} className="flex items-center justify-center gap-3.5 sm:gap-4">
              {row.map((item) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => handleKeypadPress(item.num)}
                  disabled={isLoading}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/5 hover:bg-white/12 active:bg-orange-500/25 border border-white/10 active:border-orange-500/40 text-white flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm active:scale-92 group"
                >
                  <span className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-none">
                    {item.num}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 tracking-wider mt-0.5 group-hover:text-slate-300">
                    {item.sub}
                  </span>
                </button>
              ))}
            </div>
          ))}

          {/* Bottom Keypad Row: Clear, 0, Backspace */}
          <div className="flex items-center justify-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading || pin.length === 0}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center active:scale-92 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Hapus
            </button>

            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              disabled={isLoading}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/5 hover:bg-white/12 active:bg-orange-500/25 border border-white/10 active:border-orange-500/40 text-white flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm active:scale-92 group"
            >
              <span className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-none">
                0
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider mt-0.5">
                +
              </span>
            </button>

            <button
              type="button"
              onClick={handleBackspace}
              disabled={isLoading || pin.length === 0}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center active:scale-92 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Assurance Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sesi Terenkripsi • Akses Semua Perangkat</span>
        </div>
      </div>
    </div>
  );
};
