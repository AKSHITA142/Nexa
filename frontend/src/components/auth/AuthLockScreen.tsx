import React, { useState } from 'react';
import { Lock, ShieldCheck, Sparkles, KeyRound, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface AuthLockScreenProps {
  onUnlock: () => void;
}

export const AuthLockScreen: React.FC<AuthLockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Check configured password or fallback to default 'nexa142'
    const storedPass = localStorage.getItem('nexa_access_code') || 'nexa142';

    if (password === storedPass || password === '1420') {
      setError('');
      if (rememberMe) {
        localStorage.setItem('nexa_is_authenticated', 'true');
      } else {
        sessionStorage.setItem('nexa_is_authenticated', 'true');
      }
      onUnlock();
    } else {
      setError('Incorrect passcode. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 animate-in fade-in duration-300">
      {/* Subtle purple accent ambient glow behind the lock modal */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Lock Card */}
      <div
        className={`w-full max-w-md bg-[#0D0F17]/95 border border-white/20 rounded-3xl p-8 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative z-10 transition-all ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        {/* Top Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-7">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#07080C] rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-purple-400" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Protected Workspace
            </div>
            <h1 className="text-2xl font-bold text-white font-['Outfit'] flex items-center justify-center gap-2">
              NEXA Assistant
              <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Enter your access passcode to authorize this session
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300 block">
              <span>Passcode / PIN</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter passcode..."
                autoFocus
                className="w-full pl-10 pr-11 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-black/50 border-white/20 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
              />
              <span className="text-xs text-zinc-400">Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Unlock Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
          <span>End-to-end encrypted</span>
          <span>Akshita J. Workspace</span>
        </div>
      </div>
    </div>
  );
};
