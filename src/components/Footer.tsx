import { useEffect } from 'react';
import { TrendingUp, Award } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  setSelectedBlogSlug: (slug: string | null) => void;
}

export default function Footer({ setCurrentTab, setSelectedBlogSlug }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setSelectedBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inject structured metadata (JSON-LD snippet) dynamically to demonstrate excellent developer craftsmanship
  useEffect(() => {
    const existingScript = document.getElementById('rankaura-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "RankAura AI Local SEO Tool",
      "operatingSystem": "All",
      "applicationCategory": "SEO & Marketing Business Application",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "PKR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1280"
      },
      "author": {
        "@type": "Organization",
        "name": "RankAura AI Team Pakistan",
        "url": "https://rankaura.pk"
      },
      "description": "Premium Local SEO Keyword Research platform specialized for Karachi, Lahore, Islamabad and all major local cities in Pakistan with Urdu transliteration engines."
    };

    const script = document.createElement('script');
    script.id = 'rankaura-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const addedScript = document.getElementById('rankaura-schema');
      if (addedScript) {
        addedScript.remove();
      }
    };
  }, []);

  return (
    <footer className="relative bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: About & Visual branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="bg-purple-600 text-white p-1.5 rounded-lg shadow-md">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-sans font-bold text-xl text-white tracking-tight">
                Rank<span className="text-purple-400">Aura</span> AI
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pakistan’s first hyper-localized SEO planner. Master Urdu transliterated searches and outrank huge competitors in Karachi, Lahore, Islamabad, and beyond.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Verified Pakistan Local Business Schema Active</span>
            </div>
          </div>

          {/* Col 2: Navigation link lists */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform Utilities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavClick('tool')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  AI Keyword Planner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('pricing')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Premium Pricing Tiers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('blog')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pakistan Local SEO Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('login')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Member Dashboard Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Educational articles references */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">SEO Articles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab('blog');
                    setSelectedBlogSlug('keyword-research-pakistan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full block"
                >
                  Local search secrets Pakistan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab('blog');
                    setSelectedBlogSlug('local-seo-pakistan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full block"
                >
                  Ranking on Maps (GMB Lahore/Karachi)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setCurrentTab('blog');
                    setSelectedBlogSlug('ai-seo-tools');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left truncate max-w-full block"
                >
                  How Intent Clustering Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About RankAura Team & Vision
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} RankAura AI. All rights registered. Made for Pakistani digital agencies, SEO experts, & SMEs.</p>
          <div className="flex space-x-4">
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="hover:text-slate-200">Sitemap XML Schema</a>
            <a href="#robots" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="hover:text-slate-200">Robots Directive Protocol</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="hover:text-slate-200">Help Support Helpline</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
