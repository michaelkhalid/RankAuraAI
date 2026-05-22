import { TrendingUp, Users, Target, CheckCircle, Award } from 'lucide-react';

export default function AboutView() {
  const values = [
    {
      title: 'Hyper-localization Commitment',
      desc: 'We map localized cities down to sector levels (like Clifton Karachi or Gulberg Lahore) rather than just generalized national databases.',
      icon: Target
    },
    {
      title: 'Bilingual Semantic Accuracy',
      desc: 'Our engine is specially crafted to parse and analyze Romanized Urdu code-switching vocabulary that other standard SEO scrapers fail to read.',
      icon: TrendingUp
    },
    {
      title: 'Empowering Freelancers & SMEs',
      desc: 'More than 2,000 active Pakistani freelancers on platforms like Upwork and Fiverr rely on our metrics to guide global and local clients.',
      icon: Users
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors min-h-screen py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full mb-4 uppercase">
            <span>Our Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Pioneering Local SEO <br />Across All of Pakistan
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            RankAura AI was launched in 2026 to bridge the gap between global search algorithm metrics and the actual Roman-Urdu search patterns used by Pakistani consumers.
          </p>
        </div>

        {/* Brand Mission Description */}
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-4 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Why Standard SEO Tools Fail in Pakistan
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            Most famous platforms like Ahrefs, SEMrush, or Mangools aggregate keyword indexes using standard English patterns. Because they lack customized dictionaries for local contexts, they completely overlook terms such as <em>"sasta shadi hall booking"</em> or <em>"cotton lawn suits Karachi online price"</em>.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
            RankAura built a high-fidelity semantic parsing engine that dynamically maps common Urdu adjectives (<em>sasta</em>, <em>accha</em>, <em>purana</em>, <em>wholesale</em>, <em>bazar</em>) with exact location nodes. This empowers local business owners to rank spot #1 on search results instantly without huge marketing budgets.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Verification Badge block */}
        <div className="p-6 rounded-2xl border border-dashed border-purple-300 dark:border-purple-900/40 bg-purple-50/20 dark:bg-purple-950/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Award className="w-12 h-12 text-purple-600 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Authentically Pakistan Owned & Maintained
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-0.5">
              Designed by Zainab Ahmed and Hamza Malik locally in Lahore, Pakistan. Our databases are updated daily mapping real-time search trends of provincial markets.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
