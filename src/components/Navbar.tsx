import { useState } from 'react';
import { Sparkles, Menu, X, Landmark, TrendingUp, Key } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setSelectedBlogSlug: (slug: string | null) => void;
}

export default function Navbar({ currentTab, setCurrentTab, setSelectedBlogSlug }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tool', label: 'Keyword Tool' },
    { id: 'blog', label: 'Blog' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setSelectedBlogSlug(null); // Reset deep linked blog post
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-zinc-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-purple-600 text-white p-1.5 rounded-lg group-hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Rank<span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Aura</span>
              </span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded font-medium">
                AI v2
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-zinc-900/80'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA + Theme Selector */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            
            <button
              id="nav-btn-login"
              onClick={() => handleNavClick('login')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'login'
                  ? 'text-purple-600'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>

            <button
              id="nav-btn-start-free"
              onClick={() => handleNavClick('tool')}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/10 cursor-pointer"
            >
              Start Free Tool
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 cursor-pointer"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  id={`mobile-nav-${link.id}`}
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <div className="pt-4 pb-2 border-t border-slate-100 dark:border-zinc-900 px-4 flex flex-col space-y-3">
              <button
                id="mobile-nav-login"
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900/55 border border-slate-200 dark:border-zinc-800"
              >
                Sign In
              </button>
              <button
                id="mobile-nav-tool"
                onClick={() => handleNavClick('tool')}
                className="w-full py-2.5 text-center text-sm font-semibold rounded-xl text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                Launch Research Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
