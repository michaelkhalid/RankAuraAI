import React, { useState } from 'react';
import { Search, Sparkles, TrendingUp, CheckCircle, HelpCircle, MapPin, Globe, ArrowRight, Compass, Filter, Share2 } from 'lucide-react';
import { PAKISTAN_CITIES, POPULAR_KEYWORDS_PAKISTAN } from '../data/keywords';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  setQuickSearchSeed: (keyword: string) => void;
  setQuickSearchCity: (city: string) => void;
}

export default function HomeView({ setCurrentTab, setQuickSearchSeed, setQuickSearchCity }: HomeViewProps) {
  const [localSeed, setLocalSeed] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [showSug, setShowSug] = useState(false);

  // Suggested keywords in hero
  const quickKeywords = [
    'lawn suits',
    'shadi hall Lahore',
    'web developer in Karachi',
    'real estate Islamabad'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = localSeed.trim() || 'DHA real estate';
    setQuickSearchSeed(query);
    setQuickSearchCity(selectedCity);
    setCurrentTab('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickKeywordClick = (kw: string) => {
    setLocalSeed(kw);
    setQuickSearchSeed(kw);
    setQuickSearchCity('All Cities');
    setCurrentTab('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FAQS = [
    {
      q: "What is Roman Urdu SEO, and why is it important in Pakistan?",
      a: "Roman Urdu refers to typing Urdu phrases using English alphabet letters (for example, writing 'sasti biryani shop' or 'kapray design online'). Over 60% of search queries in Pakistan employ this Roman format because it is fast to type on mobile devices. Standard tools like SEMrush of USA often report these terms as having 0 searches, but RankAura maps them with precise local database signals so you can easily target these uncontested high-volume buyer intents."
    },
    {
      q: "How does the SEO difficulty score work on RankAura AI?",
      a: "Our ranking difficulty is graded from 0 to 100. Lower than 30 represents Low Competition, where you can easily rank on page #1 of Google by simply using proper semantic HTML structure and elegant content without buying high-cost external backlinks."
    },
    {
      q: "Can I use RankAura to find keywords for real estate in DHA and Bahria Town?",
      a: "Yes! RankAura is specifically preloaded with Pakistani localized real estate variables, layout keywords, and target filters for high-growth sectors across Karachi, Lahore, and Rawalpindi/Islamabad."
    },
    {
      q: "Do I need a paid plan to do keyword research?",
      a: "Our starter research module is 100% free and requires no registration. For advanced batch exports, CSV exports, daily API limits, and real-time rank trackers, we offer standard affordable plans starting at only PKR 2,500/month."
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-100 dark:border-zinc-900 bg-gradient-to-b from-purple-50/40 via-transparent to-transparent dark:from-purple-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide uppercase mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Free Local SEO Keyword Planner for Pakistan</span>
            </div>

            {/* Title */}
            <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Rank Higher on Google with <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">RankAura AI</span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Find long-tail, low-competition buyer keywords and blog ideas. Tailored specifically for Pakistani audiences with Roman Urdu suggestions and local cities.
            </p>

            {/* Interactive Search Tool Container */}
            <div className="mt-10 max-w-3xl mx-auto">
              <form 
                onSubmit={handleSearchSubmit} 
                className="p-3 bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-full border border-slate-200 dark:border-zinc-800 shadow-xl shadow-purple-500/5 dark:shadow-none flex flex-col sm:flex-row gap-2 relative"
              >
                {/* Seed search input */}
                <div className="flex-1 flex items-center px-4 py-2 min-w-0">
                  <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
                  <input
                    id="hero-seed-input"
                    type="text"
                    value={localSeed}
                    onChange={(e) => setLocalSeed(e.target.value)}
                    onFocus={() => setShowSug(true)}
                    onBlur={() => setTimeout(() => setShowSug(false), 200)}
                    placeholder="Enter your seed keyword or niche (e.g. lawn suits, shadi hall...)"
                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-white text-base"
                  />
                </div>

                {/* City dropdown */}
                <div className="sm:border-l border-slate-200 dark:border-zinc-800 flex items-center px-4 py-2">
                  <MapPin className="w-4 h-4 text-purple-500 mr-2 shrink-0" />
                  <select
                    id="hero-city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent border-none text-slate-700 dark:text-zinc-300 text-sm focus:outline-none cursor-pointer w-full pr-8"
                  >
                    <option value="All Cities" className="dark:bg-zinc-900 dark:text-white">All Pakistan Cities</option>
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name} className="dark:bg-zinc-900 dark:text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action CTA Button */}
                <button
                  id="hero-search-btn"
                  type="submit"
                  className="px-6 py-3 rounded-xl sm:rounded-full font-semibold text-white bg-purple-600 hover:bg-purple-700 transition shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  Generate Keywords
                </button>

                {/* Intelligent Quick Suggestions Dropdown */}
                {showSug && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl z-20 text-left p-2 max-h-60 overflow-y-auto">
                    <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 px-3 py-1 bg-purple-50 dark:bg-purple-950/20 rounded-lg mb-1">
                      🔥 POPULAR LOCAL SEARCH STYLES IN PAKISTAN
                    </p>
                    {POPULAR_KEYWORDS_PAKISTAN.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseDown={() => {
                          setLocalSeed(suggestion);
                          setShowSug(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>{suggestion}</span>
                        <span className="text-[10px] uppercase bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 px-1.5 py-0.5 rounded font-mono">
                          Local Trend
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </form>

              {/* Quick Keywords Tags */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-slate-400 dark:text-zinc-500">Popular seeds:</span>
                {quickKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => handleQuickKeywordClick(kw)}
                    className="px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-300 transition-colors cursor-pointer bg-slate-50/50 dark:bg-zinc-900/10"
                  >
                    +{kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick trust assurances */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-500 dark:text-zinc-500 max-w-4xl mx-auto text-sm border-t border-slate-100 dark:border-zinc-950 pt-8">
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Roman Urdu Support</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Easy CSV Data Export</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Beginner SEO Friendly</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES SECTION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Uncover Keywords Your Competitors Miss Completely
          </h2>
          <p className="mt-4 text-slate-600 dark:text-zinc-400 text-base sm:text-lg">
            Standard Western SEO tools are built only for English schemas. RankAura is specifically calibrated to handle Pakistani bilingual syntax behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Low competition */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-none transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Low Competition Keywords</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
              We locate search terms with high monthly searches but low structural difficulty, letting you rank on Page 1 within weeks instead of years.
            </p>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-2.5 py-1 rounded">
              Ideal for new Pakistani Blogs
            </span>
          </div>

          {/* Card 2: Long Tail */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-none transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Long-Tail Filter Suggestions</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
              Long-tail phrases match precise buyer intents. Target queries like "where to buy blue cotton lawn suit in Rawalpindi" for instant conversion.
            </p>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-2.5 py-1 rounded">
              Boost Conversion Rates 2x
            </span>
          </div>

          {/* Card 3: Roman Urdu */}
          <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-none transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Roman Urdu Transliteration</h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
              Get literal Romanized spellings showing how real Pakistani clients seek local products. Connect instantly with local language modifiers.
            </p>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950/30 px-2.5 py-1 rounded">
              Unique Pakistan SEO Calibration
            </span>
          </div>
        </div>
      </section>

      {/* PAKISTAN CITY CITATIONS SHOWCASE */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2 block">
                Localized Target Zones
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Hyper-Local City SEO Focus
              </h2>
              <p className="mt-2 text-slate-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base">
                Geotargeting is the fastest way to get local business conversions in Pakistan. We support all major provinces.
              </p>
            </div>
            <button
              id="view-all-city-btn"
              onClick={() => {
                setCurrentTab('tool');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline cursor-pointer"
            >
              <span>Explore City Databases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAKISTAN_CITIES.slice(0, 3).map((city) => (
              <div 
                key={city.name} 
                className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 hover:scale-[1.02] transition-transform duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-slate-900 dark:text-white text-lg">{city.name}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-zinc-500">
                    {city.province}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4 ">
                  {city.tip}
                </p>
                
                <button
                  id={`city-btn-${city.name}`}
                  onClick={() => {
                    setQuickSearchSeed(city.name === 'Karachi' ? 'biryani' : city.name === 'Lahore' ? 'shadi hall' : 'estate agent');
                    setQuickSearchCity(city.name);
                    setCurrentTab('tool');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2 bg-slate-50 hover:bg-purple-50 hover:text-purple-600 dark:bg-zinc-800 dark:hover:bg-purple-950/30 dark:hover:text-purple-300 text-slate-700 dark:text-zinc-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Analyze Local {city.name} Keywords
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED BLOG HIGHLIGHTS SECTION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-zinc-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2 block">
              Learn SEO Strategy
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Latest Blog & Masterclass Content
            </h2>
          </div>
          <button
            id="home-view-blogs-btn"
            onClick={() => {
              setCurrentTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline cursor-pointer"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                Bilingual SEO Guide
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-3">
                How to Master Local Keyword Research in Pakistan
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                Learn how mobile text patterns and Roman Urdu search queries such as "sasta lawn" create magnificent traffic channels for retail shops.
              </p>
            </div>
            <button
              id="blog-direct-l1"
              onClick={() => {
                setQuickSearchSeed('');
                setCurrentTab('blog');
                window.history.pushState({}, '', '#keyword-research-pakistan');
                // Trigger view post
                setQuickSearchSeed('DEEP_LINK_KEYWORD_RESEARCH');
              }}
              className="mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 inline-flex items-center space-x-1 hover:underline text-left cursor-pointer"
            >
              <span>Read zinab’s Guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                Maps Citation Secrets
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 mb-3">
                The Ultimate Guide to Local SEO for Pakistani Businesses
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                A simple guide for brick-and-mortar storefronts in Karachi, Lahore and Rawalpindi to claim spot #1 on Google maps pack.
              </p>
            </div>
            <button
              id="blog-direct-l2"
              onClick={() => {
                setCurrentTab('blog');
                setQuickSearchSeed('DEEP_LINK_LOCAL_SEO');
              }}
              className="mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 inline-flex items-center space-x-1 hover:underline text-left cursor-pointer"
            >
              <span>Read Hamza’s Guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-10 h-10 text-purple-600 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Answered Questions
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
            Got questions about local search algorithms? We have answers.
          </p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 hover:border-purple-300 dark:hover:border-zinc-700 transition-colors"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-start gap-2">
                <span className="text-purple-600 font-mono">Q{idx+1}.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed pl-6 border-l border-purple-100 dark:border-zinc-800">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
