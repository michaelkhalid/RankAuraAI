import { useState } from 'react';
import { Check, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export default function PricingView() {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  const plans = [
    {
      name: 'Starter Aura',
      pricePKR: 0,
      priceUSD: 0,
      description: 'Ideal for local freelancers starting their initial SEO campaign in Karachi/Lahore.',
      features: [
        '10 dynamic keyword requests per day',
        'Pakistan regional search volume estimates',
        'Romanized Urdu translation tooltips',
        'Basic Dashboard metrics summary',
        'Standard text copying to clipboard'
      ],
      cta: 'Launch Starter Free',
      popular: false
    },
    {
      name: 'Professional Rank',
      pricePKR: 2490,
      priceUSD: 9,
      description: 'Perfect for established local SMEs, boutique stores, & individual affiliates.',
      features: [
        'Unlimited keyword research queries',
        'Complete batch exports (CSV mode)',
        'Local SEO advice triggers',
        '50 active Keyword Position Trackers',
        'Full access to AI Topic mastercourses',
        '24/7 dedicated email assistance support'
      ],
      cta: 'Start Pro Free Trial',
      popular: true
    },
    {
      name: 'Agency Hub',
      pricePKR: 6990,
      priceUSD: 25,
      description: 'Calibrated for local software houses, digital agencies, and multiple portfolios.',
      features: [
        'Unlimited analytical searches',
        'White-label local client report builder',
        'Dedicated secure batch endpoints APIs',
        '500 active Local Maps Position Trackers',
        'Karachi & Lahore physical consultation calls',
        'Custom province-level crawl logs'
      ],
      cta: 'Get Agency Access',
      popular: false
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-16 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page title header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider bg-purple-100 dark:bg-purple-950/40 px-3 py-1 rounded-full mb-4 inline-block">
            Transparent Pricing Structure
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight">
            Plans Calibrated for Local Budgets
          </h1>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            No long term contracts. Toggle between Pakistani Rupees (PKR) and US Dollars at your convenience.
          </p>
        </div>

        {/* Currency Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-slate-200/50 dark:border-zinc-800/80 flex space-x-2">
            <button
              id="price-toggle-pkr"
              onClick={() => setCurrency('PKR')}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PKR (RS)
            </button>
            <button
              id="price-toggle-usd"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              id={`price-card-${plan.name.replace(/\s+/g, '-').toLowerCase()}`}
              className={`rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-purple-500 bg-white dark:bg-zinc-900/90 shadow-lg shadow-purple-500/5 scale-[1.03]'
                  : 'border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                  <span>Rank Recommendation</span>
                </span>
              )}

              <div>
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                
                <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>

                {/* Pricing Label */}
                <div className="my-6">
                  {currency === 'PKR' ? (
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {plan.pricePKR === 0 ? 'Rs. 0' : `Rs. ${plan.pricePKR.toLocaleString()}`}
                    </span>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                      {plan.priceUSD === 0 ? '$0' : `$${plan.priceUSD}`}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 dark:text-zinc-500"> /month</span>
                </div>

                {/* Dynamic billing notice for localized compliance */}
                <span className="block text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 font-bold px-2 py-0.5 rounded text-center mb-6">
                  {plan.pricePKR === 0 ? 'Free Forever' : 'Tax inclusive billing'}
                </span>

                {/* Feature Lists */}
                <ul className="space-y-3.5 text-xs text-slate-600 dark:text-zinc-300 border-t border-slate-100 dark:border-zinc-850 pt-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mr-2.5 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                id={`price-btn-${plan.name.replace(/\s+/g, '-').toLowerCase()}`}
                className={`w-full py-3 rounded-xl font-semibold mt-8 transition text-sm cursor-pointer ${
                  plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow shadow-purple-500/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {plan.cta}
              </button>

            </div>
          ))}
        </div>

        {/* Local payment integrations help note */}
        <div className="mt-12 p-4 rounded-xl border border-dashed border-slate-200 dark:border-zinc-805 bg-slate-50/50 dark:bg-zinc-950 text-xs flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2 text-slate-500 dark:text-zinc-400">
            <AlertCircle className="w-4 h-4 text-purple-600" />
            <span>We secure local Pakistani micro-transfers! Pay with <strong>EasyPaisa, JazzCash, Nayapay</strong> or Any Bank Credit Cards.</span>
          </div>
          <span className="text-purple-600 font-bold cursor-pointer hover:underline text-xs shrink-0">
            Need pricing help? Contact Sales
          </span>
        </div>

      </div>
    </div>
  );
}
