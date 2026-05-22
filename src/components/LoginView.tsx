import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, LogIn, CheckCircle } from 'lucide-react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate authentication lag
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-16 flex items-center justify-center animate-fade-in px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl shadow-xl shadow-purple-500/5">
        
        {/* Brand visual header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full mb-3">
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>RankAura Member Access</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Log in to your Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Access secure position tracking metrics and batch CSV loaders.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4 py-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Login Successful!
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Welcome back to RankAura AI. Launching secure sandbox dashboard modules...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.pk"
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password input with toggle visibility */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="block text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                  Secure Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-purple-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />

                <button
                  id="show-pass-btn"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Auth Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to RankAura</span>
                </>
              )}
            </button>

            {/* Simulated Sign up link */}
            <div className="text-center text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100 dark:border-zinc-850">
              New to local RankAura AI?{' '}
              <a href="#signup" onClick={(e) => e.preventDefault()} className="text-purple-600 hover:underline font-bold">
                Create a Free Account
              </a>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
