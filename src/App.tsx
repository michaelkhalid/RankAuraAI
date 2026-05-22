import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ToolView from './components/ToolView';
import BlogView from './components/BlogView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import PricingView from './components/PricingView';
import LoginView from './components/LoginView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [quickSearchSeed, setQuickSearchSeed] = useState<string>('');
  const [quickSearchCity, setQuickSearchCity] = useState<string>('All Cities');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Set default theme to dark for a high-end SaaS feel when the client launches the applet
  useEffect(() => {
    const root = window.document.documentElement;
    const saved = localStorage.getItem('rankaura-theme');
    if (saved === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark'); // dark mode is the default
      localStorage.setItem('rankaura-theme', 'dark');
    }
  }, []);

  // Listen to deep link hash changes from other sources or blog guides
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const slug = hash.replace('#', '');
      if (slug === 'keyword-research-pakistan' || slug === 'local-seo-pakistan' || slug === 'ai-seo-tools' || slug === 'low-competition-keywords') {
        setCurrentTab('blog');
        setSelectedBlogSlug(slug);
      }
    }
  }, []);

  // Handler for quick search triggers from Home view
  const triggerQuickSearch = (seed: string) => {
    // If it's a deep-linked blog post trigger
    if (seed === 'DEEP_LINK_KEYWORD_RESEARCH') {
      setSelectedBlogSlug('keyword-research-pakistan');
      setCurrentTab('blog');
    } else if (seed === 'DEEP_LINK_LOCAL_SEO') {
      setSelectedBlogSlug('local-seo-pakistan');
      setCurrentTab('blog');
    } else {
      setQuickSearchSeed(seed);
    }
  };

  const clearQuickSearch = () => {
    setQuickSearchSeed('');
    setQuickSearchCity('All Cities');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors selection:bg-purple-500/30">
      
      {/* Dynamic Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        setSelectedBlogSlug={setSelectedBlogSlug}
      />

      {/* Main Responsive Sandbox Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView 
            setCurrentTab={setCurrentTab}
            setQuickSearchSeed={triggerQuickSearch}
            setQuickSearchCity={setQuickSearchCity}
          />
        )}

        {currentTab === 'tool' && (
          <ToolView 
            initialSeed={quickSearchSeed}
            initialCity={quickSearchCity}
            onClearInitial={clearQuickSearch}
          />
        )}

        {currentTab === 'blog' && (
          <BlogView 
            selectedSlug={selectedBlogSlug}
            setSelectedSlug={setSelectedBlogSlug}
            setCurrentTab={setCurrentTab}
            setQuickSearchSeed={setQuickSearchSeed}
          />
        )}

        {currentTab === 'pricing' && <PricingView />}

        {currentTab === 'about' && <AboutView />}

        {currentTab === 'contact' && <ContactView />}

        {currentTab === 'login' && <LoginView />}
      </main>

      {/* Footer component with Schema triggers */}
      <Footer 
        setCurrentTab={setCurrentTab} 
        setSelectedBlogSlug={setSelectedBlogSlug}
      />
      
    </div>
  );
}
