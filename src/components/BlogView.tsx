import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Clock, Tag, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogs';
import { BlogArticle } from '../types';

interface BlogViewProps {
  selectedSlug: string | null;
  setSelectedSlug: (slug: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setQuickSearchSeed: (keyword: string) => void;
}

export default function BlogView({ selectedSlug, setSelectedSlug, setCurrentTab, setQuickSearchSeed }: BlogViewProps) {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  // Monitor deep linked slugs (e.g., triggered from Homepage clicks)
  useEffect(() => {
    if (selectedSlug) {
      // Find matching article slug
      let finalSlug = selectedSlug;
      if (selectedSlug === 'DEEP_LINK_KEYWORD_RESEARCH') {
        finalSlug = 'keyword-research-pakistan';
      } else if (selectedSlug === 'DEEP_LINK_LOCAL_SEO') {
        finalSlug = 'local-seo-pakistan';
      }
      
      const found = BLOG_ARTICLES.find(a => a.slug === finalSlug);
      if (found) {
        setActiveArticle(found);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveArticle(null);
    }
  }, [selectedSlug]);

  const handleArticleClick = (article: BlogArticle) => {
    setActiveArticle(article);
    setSelectedSlug(article.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveArticle(null);
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeArticle ? (
          /* SINGLE BLOG ARTICLE READER VIEW */
          <article className="animate-fade-in">
            {/* Back to Blog List CTA */}
            <button
              id="article-back-to-list"
              onClick={handleBackToList}
              className="mt-2 mb-8 inline-flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400 hover:underline cursor-pointer font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all masterclasses</span>
            </button>

            {/* Post Category Tag */}
            <span className="inline-block text-xs uppercase tracking-wider font-extrabold px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded mb-4">
              {activeArticle.category}
            </span>

            {/* Post Main Heading */}
            <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {activeArticle.title}
            </h1>

            {/* Author Meta Details bar */}
            <div className="flex flex-wrap items-center mt-6 py-4 border-y border-slate-100 dark:border-zinc-900 text-xs text-slate-500 gap-4">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-700 dark:text-zinc-300">
                <User className="w-4 h-4 text-purple-500" />
                <span>By {activeArticle.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{activeArticle.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Blog body markdown render area */}
            <div 
              id="blog-body-text"
              className="prose dark:prose-invert max-w-none mt-8 leading-relaxed space-y-6 text-base text-slate-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

            {/* Dynamic Interactive Call-to-action block related to current article */}
            <div className="mt-12 p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/40">
              <span className="inline-flex items-center space-x-1 text-xs uppercase font-extrabold text-purple-700 dark:text-purple-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Local SEO with this article</span>
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Ready to find easy-to-rank terms?
              </h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">
                Launch RankAura’s Pakistan SEO analyzer to discover low competition words for the topics mentioned above.
              </p>
              <div className="flex flex-wrap gap-2">
                {activeArticle.keywords.map((kw) => (
                  <button
                    key={kw}
                    id={`blog-keyword-lead-${kw}`}
                    onClick={() => {
                      setQuickSearchSeed(kw);
                      setCurrentTab('tool');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-purple-100 hover:text-purple-600 dark:bg-zinc-800 dark:hover:bg-purple-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-white transition cursor-pointer"
                  >
                    Analyze: "{kw}"
                  </button>
                ))}
              </div>
            </div>

          </article>
        ) : (
          /* BLOG DIRECTORY LIST VIEW */
          <div className="space-y-12 animate-fade-in">
            {/* Header section */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                RankAura Masterclasses
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
                Become a regional SEO expert. Demystifying Google Maps, Roman Urdu modifiers, and digital agency client acquisition.
              </p>
            </div>

            {/* Directory Cards Grid */}
            <div className="grid grid-cols-1 gap-8">
              {BLOG_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  id={`article-card-${article.id}`}
                  className="p-6 sm:p-8 rounded-2xl border border-slate-200/60 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-zinc-700 transition duration-300 bg-white dark:bg-zinc-900/80 hover:shadow-xl hover:shadow-purple-500/5 cursor-pointer flex flex-col justify-between"
                  onClick={() => handleArticleClick(article)}
                >
                  <div>
                    {/* Meta stats */}
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase text-purple-600 dark:text-purple-400 mb-3">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{article.category}</span>
                    </div>

                    {/* Article Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h2>

                    {/* Summary */}
                    <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Read statistics */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-slate-700 dark:text-zinc-300">{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <span className="text-purple-600 dark:text-purple-400 font-bold hover:underline inline-flex items-center space-x-1">
                      <span>Explore Masterclass</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Pakistan SEO Alert Box */}
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-amber-950/20 border border-orange-200/50 dark:border-amber-900/40 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-slate-700 dark:text-zinc-300">
                <span className="font-bold">Pakistan Local SEO Note:</span> In Punjab, Sindh, and KPK, standard search layouts convert at up to 18% higher efficiency when you include transliterated Urdu content inside index HTML structure. Read zainab's article to learn more!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
