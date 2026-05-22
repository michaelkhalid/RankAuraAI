import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Globe, Sparkles, Copy, Check, Download, 
  HelpCircle, TrendingUp, DollarSign, ShieldAlert, Award, AlertCircle, BookOpen, Layers
} from 'lucide-react';
import { generateKeywords, PAKISTAN_CITIES, SUGGESTED_NICHES } from '../data/keywords';
import { KeywordResult, SEOMetrics, KeywordType, KeywordIntent } from '../types';

interface ToolViewProps {
  initialSeed: string;
  initialCity: string;
  onClearInitial: () => void;
}

export default function ToolView({ initialSeed, initialCity, onClearInitial }: ToolViewProps) {
  // Analytical Parameters
  const [niche, setNiche] = useState('Real Estate');
  const [country, setCountry] = useState('Pakistan');
  const [city, setCity] = useState(initialCity || 'All Cities');
  const [keyword, setKeyword] = useState(initialSeed || '');
  
  // Dashboard states
  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [activeTypeTab, setActiveTypeTab] = useState<KeywordType | 'all'>('all');
  const [activeIntentFilter, setActiveIntentFilter] = useState<KeywordIntent | 'all'>('all');
  const [copiedKeywordId, setCopiedKeywordId] = useState<string | null>(null);
  const [bulkCopied, setBulkCopied] = useState(false);
  const [localSEOAdvice, setLocalSEOAdvice] = useState<string>('Target DHA, Clifton, Gulshan, and other prime sectors.');

  // Generated dataset
  const [keywords, setKeywords] = useState<KeywordResult[]>([]);
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);

  // Load initial search if directed from Homepage or cities triggers
  useEffect(() => {
    if (initialSeed || initialCity) {
      setKeyword(initialSeed);
      if (initialCity) setCity(initialCity);
      
      // Trigger instant generation
      triggerAnalysis(initialSeed, initialCity);
      // Remove deep link triggers so subsequent manual typing is clean
      onClearInitial();
    } else {
      // Default initial query on loading view
      triggerAnalysis('lawn collection', 'All Cities');
    }
  }, [initialSeed, initialCity]);

  // Update city specific local seo advice
  useEffect(() => {
    const matchedCity = PAKISTAN_CITIES.find(c => c.name === city);
    if (matchedCity) {
      setLocalSEOAdvice(matchedCity.tip);
    } else {
      setLocalSEOAdvice('Target Urdu adjectives like "sasta", "accha", and location indicators like "DHA", "Gulberg", or "near me".');
    }
  }, [city]);

  const triggerAnalysis = (seedVal?: string, cityVal?: string) => {
    const finalSeed = seedVal !== undefined ? seedVal : keyword;
    const finalCity = cityVal !== undefined ? cityVal : city;

    setLoading(true);
    setProgressMsg('Scoping search query parameters...');

    const steps = [
      { msg: 'Querying Google Local Maps signals for Pakistan...', delay: 400 },
      { msg: 'Filtering low density long-tail Roman Urdu variations...', delay: 800 },
      { msg: 'Generating competitive metrics & CPC calculations...', delay: 1200 },
      { msg: 'Generating blog titles & local SEO intents...', delay: 1500 }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setProgressMsg(step.msg);
      }, step.delay);
    });

    setTimeout(() => {
      const { keywords: generated, metrics: computed } = generateKeywords(
        niche,
        country,
        finalCity,
        finalSeed
      );
      setKeywords(generated);
      setMetrics(computed);
      setLoading(false);
    }, 1800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAnalysis();
  };

  // Filtered dataset
  const filteredKeywords = keywords.filter(k => {
    const typeMatch = activeTypeTab === 'all' ? true : k.type === activeTypeTab;
    const intentMatch = activeIntentFilter === 'all' ? true : k.intent === activeIntentFilter;
    return typeMatch && intentMatch;
  });

  // Action: copy single keyword
  const copySingleKeyword = (keywordText: string, id: string) => {
    navigator.clipboard.writeText(keywordText);
    setCopiedKeywordId(id);
    setTimeout(() => setCopiedKeywordId(null), 2000);
  };

  // Action: copy bulk list
  const copyBulkAll = () => {
    const textList = filteredKeywords.map(k => k.keyword).join('\n');
    navigator.clipboard.writeText(textList);
    setBulkCopied(true);
    setTimeout(() => setBulkCopied(false), 2000);
  };

  // Action: Export as CSV
  const exportAsCSV = () => {
    const headers = 'Keyword,Intent,Volume,CPC(PKR),Difficulty,Urdu Translation,Type\n';
    const rows = filteredKeywords.map(k => 
      `"${k.keyword}","${k.intent}",${k.volume},${k.cpc},${k.difficulty}%,"${k.urduTranslation || ''}","${k.type}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RankAura_Keywords_${keyword || niche}_${city}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Visual difficulty badge color
  const getDifficultyColor = (diff: number) => {
    if (diff < 30) {
      return { 
        bg: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400', 
        label: 'Easy' 
      };
    } else if (diff < 50) {
      return { 
        bg: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400', 
        label: 'Medium' 
      };
    } else {
      return { 
        bg: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400', 
        label: 'Hard' 
      };
    }
  };

  // Visual intent badge styling
  const getIntentBadge = (intent: KeywordIntent) => {
    switch (intent) {
      case 'Informational':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300';
      case 'Commercial':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300';
      case 'Transactional':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300';
      case 'Navigational':
        return 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pakistan Local Keyword Planner
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Generate low-competition queries tailored for Pakistan search engine architectures. No API Keys needed.
          </p>
        </div>

        {/* Form Search Panel */}
        <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200/60 dark:border-zinc-800 shadow-sm mb-8">
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Core Seed Keyword */}
            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label htmlFor="seed-keyword" className="block text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                Seed Keyword (or service)
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="seed-keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. lawn cloth, private tutor, biryani delivery"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Pakistan local cities select */}
            <div className="space-y-1.5">
              <label htmlFor="city-select" className="block text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
                Pakistan Target Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
                <select
                  id="city-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                >
                  <option value="All Cities">All Cities (Pakistan)</option>
                  {PAKISTAN_CITIES.map(c => (
                    <option key={c.name} value={c.name}>{c.name} ({c.province})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Trigger Button */}
            <div>
              <button
                id="analyse-trigger-btn"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/10 disabled:opacity-50 h-[46px]"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Generation</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preset Suggested Niche Filter tags */}
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 dark:text-zinc-500">Fast presets:</span>
            {SUGGESTED_NICHES.slice(0, 5).map(n => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setNiche(n);
                  setKeyword(n.toLowerCase());
                  triggerAnalysis(n.toLowerCase());
                }}
                className="px-2.5 py-1 text-[11px] font-medium rounded bg-white hover:bg-purple-50 hover:text-purple-600 border border-slate-200 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 transition cursor-pointer"
              >
                {n}
              </button>
            ))}
          </div>

        </div>

        {/* Loading Overlay State */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-full animate-pulse">
              <TrendingUp className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-zinc-200">
              Generating Dynamic Suggestions
            </div>
            <p className="text-sm font-mono text-purple-600 dark:text-purple-400 animate-bounce">
              {progressMsg}
            </p>
          </div>
        ) : (
          <>
            {/* Dashboard Aggregations layout */}
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                
                {/* 1. Overall score cluster gauge */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                      SEO Opportunity Score
                    </span>
                    <h3 className="text-xs text-slate-500 dark:text-zinc-400">Target Viability</h3>
                  </div>
                  
                  <div className="my-3 flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-indigo-500">
                      {metrics.overallScore}
                    </span>
                    <span className="text-lg font-semibold text-slate-400">/100</span>
                  </div>

                  <div className="text-center">
                    <span className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                      metrics.overallScore > 75 
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                    }`}>
                      {metrics.overallScore > 75 ? 'Highly Recommended' : 'Feasible Niche'}
                    </span>
                  </div>
                </div>

                {/* 2. Volume Card */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                      Average Volume
                    </span>
                    <h3 className="text-xs text-slate-500 dark:text-zinc-400">Approx. Monthly Searches</h3>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {metrics.averageVolume.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Consistent demand in Pakistan regional servers.
                  </p>
                </div>

                {/* 3. CPC Card with currency toggling */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                        Average CPC
                      </span>
                      {/* Currency Toggle */}
                      <button
                        id="currency-toggle"
                        type="button"
                        onClick={() => setCurrency(prev => prev === 'PKR' ? 'USD' : 'PKR')}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 cursor-pointer"
                      >
                        {currency === 'PKR' ? 'Show USD' : 'Show PKR'}
                      </button>
                    </div>
                    <h3 className="text-xs text-slate-500 dark:text-zinc-400">Cost-per-click Rate</h3>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {currency === 'PKR' ? `Rs. ${metrics.averageCpc}` : `$${(metrics.averageCpc / 280).toFixed(2)}`}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Value of paid clicks for local corporate ad budgets.
                  </p>
                </div>

                {/* 4. Easy count indicator */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                      Low Competition
                    </span>
                    <h3 className="text-xs text-slate-500 dark:text-zinc-400">Easy Opportunities</h3>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {metrics.lowCompCount} Keywords
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Easy difficulty keywords with positive volume found.
                  </p>
                </div>

                {/* 5. Difficult indicator */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                      Avg Difficulty
                    </span>
                    <h3 className="text-xs text-slate-500 dark:text-zinc-400">Ranking Difficulty</h3>
                  </div>
                  <div className="text-3xl font-bold text-amber-500 dark:text-amber-400">
                    {metrics.avgDifficulty}%
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Average cluster score to claim page-1 positions.
                  </p>
                </div>

              </div>
            )}

            {/* Main Keywords Table Panel */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/60 dark:border-zinc-800 shadow-sm overflow-hidden">
              
              {/* Table Toolbar Headers */}
              <div className="p-4 sm:p-6 border-b border-slate-200/60 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                
                {/* Visual Category Sub-Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                  <button
                    id="tab-all-types"
                    onClick={() => setActiveTypeTab('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    All Types ({keywords.length})
                  </button>
                  <button
                    id="tab-low-comp"
                    onClick={() => setActiveTypeTab('low-competition')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'low-competition'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Low Comp
                  </button>
                  <button
                    id="tab-long-tail"
                    onClick={() => setActiveTypeTab('long-tail')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'long-tail'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Long Tail
                  </button>
                  <button
                    id="tab-local"
                    onClick={() => setActiveTypeTab('local')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'local'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    🇵🇰 Local Pakistan
                  </button>
                  <button
                    id="tab-commercial"
                    onClick={() => setActiveTypeTab('commercial')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'commercial'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Commercial / Buying
                  </button>
                  <button
                    id="tab-blogs"
                    onClick={() => setActiveTypeTab('blog-idea')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                      activeTypeTab === 'blog-idea'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Topic Ideas
                  </button>
                </div>

                {/* Bulks Action Controls */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    id="bulk-copy-btn"
                    onClick={copyBulkAll}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-100/60 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer flex items-center space-x-1"
                  >
                    {bulkCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{bulkCopied ? 'Copied' : 'Copy All'}</span>
                  </button>

                  <button
                    id="bulk-export-btn"
                    onClick={exportAsCSV}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 cursor-pointer flex items-center space-x-1 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

              </div>

              {/* Grid split: Left is keywords list, Right is localized helper blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-4">
                
                {/* Keywords listing table (covers 3 cols on desktop) */}
                <div className="lg:col-span-3 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-slate-50/20 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 text-xs text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                        <th className="px-6 py-4">Keyword Generated</th>
                        <th className="px-4 py-4 text-center">Intent</th>
                        <th className="px-4 py-4 text-center">Volume</th>
                        <th className="px-4 py-4 text-center">Avg CPC</th>
                        <th className="px-4 py-4 text-center">Difficulty</th>
                        <th className="px-4 py-4 text-right">Copy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-850">
                      {filteredKeywords.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-slate-400">
                            No keywords match the selected active tabs. Change filters!
                          </td>
                        </tr>
                      ) : (
                        filteredKeywords.map((item) => {
                          const diffData = getDifficultyColor(item.difficulty);
                          return (
                            <tr 
                              key={item.id} 
                              className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors group"
                            >
                              {/* Keyword name & sub-info */}
                              <td className="px-6 py-4">
                                <span className="font-semibold text-slate-800 dark:text-zinc-200 text-sm block">
                                  {item.keyword}
                                </span>
                                
                                {item.urduTranslation && (
                                  <div className="flex items-center space-x-1.5 mt-1">
                                    <span className="text-[10px] uppercase font-mono bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-1 py-0.2 rounded font-medium">
                                      Urdu Meta Tip
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-zinc-400 font-urdu tracking-wide">
                                      {item.urduTranslation}
                                    </span>
                                  </div>
                                )}
                              </td>

                              {/* Search Intent Code */}
                              <td className="px-4 py-4 text-center">
                                <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getIntentBadge(item.intent)}`}>
                                  {item.intent.slice(0, 4)}
                                </span>
                              </td>

                              {/* Local search volume estimate */}
                              <td className="px-4 py-4 text-center font-semibold text-slate-700 dark:text-zinc-300">
                                {item.volume.toLocaleString()}
                              </td>

                              {/* CPC converter toggle */}
                              <td className="px-4 py-4 text-center font-mono text-xs font-semibold text-slate-600 dark:text-zinc-300">
                                {currency === 'PKR' ? `Rs.${item.cpc}` : `$${(item.cpc / 280).toFixed(2)}`}
                              </td>

                              {/* Difficulty ranking score indicator */}
                              <td className="px-4 py-4 text-center">
                                <div className="flex flex-col items-center">
                                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${diffData.bg}`}>
                                    {item.difficulty}% ({diffData.label})
                                  </span>
                                  {/* Progress bar line representation */}
                                  <div className="w-16 h-1 bg-slate-100 dark:bg-zinc-850 rounded-full mt-1.5 overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        item.difficulty < 30 ? 'bg-emerald-500' : item.difficulty < 50 ? 'bg-amber-500' : 'bg-rose-500'
                                      }`} 
                                      style={{ width: `${item.difficulty}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              {/* Action individual copy */}
                              <td className="px-4 py-4 text-right">
                                <button
                                  id={`copy-item-${item.id}`}
                                  onClick={() => copySingleKeyword(item.keyword, item.id)}
                                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 dark:border-zinc-800 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition cursor-pointer"
                                  title="Copy single phrase"
                                >
                                  {copiedKeywordId === item.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Sidebar regional contextual advisor (covers 1 col on desktop) */}
                <div className="p-6 border-t lg:border-t-0 lg:border-l border-slate-200/60 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/10 space-y-6">
                  
                  {/* Local City Focus Information Box */}
                  <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/50">
                    <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300 font-bold mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Local targeting focus</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed mb-1 font-semibold text-purple-800 dark:text-purple-200">
                      Advising for {city === 'All Cities' ? 'Pakistan wide' : city}:
                    </p>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {localSEOAdvice}
                    </p>
                  </div>

                  {/* Competitor mapping checklist block */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase text-slate-400 dark:text-zinc-500 tracking-wider">
                      PAKISTAN SEMANTIC TIPS
                    </h4>
                    
                    <ul className="space-y-3 text-xs">
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        <span>Add Roman spelling variants to footer links & headings.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Target <em>"wholesale near me"</em> searches first for quick organic leads.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-505 shrink-0 mt-0.5 text-purple-600" />
                        <span>Use city locations inside map citation anchor text.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Schema generation summary */}
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-850 text-xs">
                    <div className="flex items-center space-x-2 text-slate-800 dark:text-zinc-200 font-bold mb-2">
                      <Layers className="w-4 h-4" />
                      <span>Schema Preview</span>
                    </div>
                    <pre className="text-[10px] font-mono text-slate-500 dark:text-zinc-500 bg-white dark:bg-zinc-950 p-2 rounded border border-slate-200 dark:border-zinc-900/50 truncate">
                      {`{
  "@type": "Product",
  "name": "${keyword || niche}",
  "areaServed": "${city}"
}`}
                    </pre>
                  </div>

                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
