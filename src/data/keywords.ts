import { KeywordResult, KeywordType, KeywordIntent, SEOMetrics } from '../types';

// List of prominent Pakistani cities for local SEO
export const PAKISTAN_CITIES = [
  { name: 'Karachi', province: 'Sindh', tip: 'Target DHA, Clifton, Gulshan, and North Nazimabad areas.' },
  { name: 'Lahore', province: 'Punjab', tip: 'Focus on Gulberg, DHA, Johar Town, and Bahria Town.' },
  { name: 'Islamabad', province: 'Capital', tip: 'Target Capital sectors F-10, G-11, DHA, and Bahria Town Islamabad.' },
  { name: 'Rawalpindi', province: 'Punjab', tip: 'Saddar, Bahria Town, and Satellite Town have high local intent.' },
  { name: 'Faisalabad', province: 'Punjab', tip: 'Textile-hub; target commercial businesses, wholesales, and local markets.' },
  { name: 'Peshawar', province: 'KPK', tip: 'University Road, Hayatabad, and local markets are high search hotspots.' },
  { name: 'Multan', province: 'Punjab', tip: 'Target Cantt, Gulgasht, and Bosan Road areas.' },
  { name: 'Sialkot', province: 'Punjab', tip: 'Sports and manufacturing hub; target export and commercial keywords.' },
  { name: 'Gujranwala', province: 'Punjab', tip: 'High commercial local retail business intent.' },
  { name: 'Quetta', province: 'Balochistan', tip: 'Focus on Jinnah Road, Cantt, and provincial services.' },
  { name: 'Hyderabad', province: 'Sindh', tip: 'Target Qasimabad and Latifabad residential/commercial focus.' },
];

export const SUGGESTED_NICHES = [
  'Real Estate',
  'Shadi Hall & Catering',
  'Clothing & Fashion Lawn',
  'Schools & Education',
  'Clinics & Healthcare',
  'Mobile Repairing & Tech',
  'Software Agency',
  'Traditional Food / Restaurant',
];

// Helper to generate consistent pseudorandom numbers based on a string seed
// This ensures that typing the same keyword always produces the same interesting list of keywords!
function createSeededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.sin(h) * 10000;
    return h - Math.floor(h);
  };
}

export function generateKeywords(
  niche: string, 
  country: string, 
  city: string, 
  seedKeyword: string
): { keywords: KeywordResult[]; metrics: SEOMetrics } {
  // Clean values
  const rawSeed = seedKeyword.trim();
  const seed = rawSeed || niche || 'SEO';
  const localCity = city === 'All Cities' ? '' : city;
  
  const rand = createSeededRandom(seed + city + niche + country);
  
  const results: KeywordResult[] = [];
  
  // Base details based on seed length & random
  const volumeMultiplier = Math.floor(rand() * 4) + 1; // 1 to 5
  
  // We will generate:
  // 1. Low Competition Keywords (3)
  // 2. Long Tail Keywords (3)
  // 3. Local Keywords (3) - focused heavily on Pakistan & specific cities
  // 4. Commercial (Buyer Intent) Keywords (3)
  // 5. Blog Title Ideas (3)

  const capitalizedSeed = seed.charAt(0).toUpperCase() + seed.slice(1);
  const lowercaseSeed = seed.toLowerCase();

  const cityLabel = localCity || 'Pakistan';
  
  // ---- 1. LOW COMPETITION (type: 'low-competition') ----
  const lowCompTemplates = [
    { text: `easy to start ${lowercaseSeed} in ${cityLabel}`, intent: 'Informational' as KeywordIntent, urdu: `آسان ${lowercaseSeed} کاروبار` },
    { text: `affordable ${lowercaseSeed} services locally`, intent: 'Commercial' as KeywordIntent, urdu: `سستے ${lowercaseSeed} سروس` },
    { text: `beginner manual for ${lowercaseSeed} ${cityLabel}`, intent: 'Informational' as KeywordIntent, urdu: `سیکھنے کا طریقہ` },
  ];

  lowCompTemplates.forEach((t, index) => {
    const diff = Math.floor(rand() * 15) + 12; // Easy difficulty 12-27
    const vol = Math.floor(rand() * 800) + 150;
    const cpcUsd = (0.05 + rand() * 0.15);
    const cpcPkr = Math.floor(cpcUsd * 280);
    results.push({
      id: `low-${index}-${seed}`,
      keyword: t.text,
      volume: vol,
      cpc: cpcPkr,
      cpcUsd: parseFloat(cpcUsd.toFixed(2)),
      difficulty: diff,
      intent: t.intent,
      type: 'low-competition',
      competition: 'Low',
      urduTranslation: t.urdu,
      explanation: `Low structural difficulty because few major Pakistani domains are targeting this specific phrasing. Ideal for new blogs.`
    });
  });

  // ---- 2. LONG TAIL (type: 'long-tail') ----
  const longTailTemplates = [
    { text: `how to find best ${lowercaseSeed} near ${cityLabel} layout`, intent: 'Informational' as KeywordIntent, urdu: `بہترین ${lowercaseSeed} تلاش کرنے کا طریقہ` },
    { text: `why is ${lowercaseSeed} important for local businesses in ${country}`, intent: 'Informational' as KeywordIntent, urdu: `مقامی کاروبار کے لیے کیوں اہم ہے` },
    { text: `step by step guide for ${lowercaseSeed} pricing in ${cityLabel}`, intent: 'Commercial' as KeywordIntent, urdu: `قیمت اور معلومات` },
  ];

  longTailTemplates.forEach((t, index) => {
    const diff = Math.floor(rand() * 20) + 20; // Medium 20-40
    const vol = Math.floor(rand() * 1200) + 300;
    const cpcUsd = (0.10 + rand() * 0.35);
    const cpcPkr = Math.floor(cpcUsd * 280);
    results.push({
      id: `long-${index}-${seed}`,
      keyword: t.text,
      volume: vol,
      cpc: cpcPkr,
      cpcUsd: parseFloat(cpcUsd.toFixed(2)),
      difficulty: diff,
      intent: t.intent,
      type: 'long-tail',
      competition: diff > 30 ? 'Medium' : 'Low',
      urduTranslation: t.urdu,
      explanation: `Long-tail keywords are highly specific and exhibit a standard conversion rate 2.5x higher than core brand searches.`
    });
  });

  // ---- 3. LOCAL KEYWORDS (type: 'local') ----
  // These must feature real Pakistan Urdu-English code mixing transliteration concepts or precise local terms
  const pakistanLocalTemplates = [
    { text: `best ${lowercaseSeed} in ${cityLabel} contact number`, intent: 'Transactional' as KeywordIntent, urdu: `${cityLabel} میں بہترین ${lowercaseSeed}` },
    { text: `${lowercaseSeed} shop near me in ${cityLabel}`, intent: 'Transactional' as KeywordIntent, urdu: `قریب ترین ${lowercaseSeed} دکان` },
    { text: `sasta ${lowercaseSeed} price list in ${cityLabel}`, intent: 'Transactional' as KeywordIntent, urdu: `سستا ${lowercaseSeed} ریٹ` },
  ];

  pakistanLocalTemplates.forEach((t, index) => {
    const diff = Math.floor(rand() * 25) + 15; // 15-40
    const vol = Math.floor(rand() * 2500) + 400; // Local keywords often have high commercial volume
    const cpcUsd = (0.15 + rand() * 0.50);
    const cpcPkr = Math.floor(cpcUsd * 280);
    results.push({
      id: `local-${index}-${seed}`,
      keyword: t.text,
      volume: vol,
      cpc: cpcPkr,
      cpcUsd: parseFloat(cpcUsd.toFixed(2)),
      difficulty: diff,
      intent: t.intent,
      type: 'local',
      competition: diff > 30 ? 'Medium' : 'Low',
      urduTranslation: t.urdu,
      explanation: `Specific local map-pack trigger keyword. Highly valuable for Pakistani brick-and-mortar storefronts.`
    });
  });

  // ---- 4. COMMERCIAL (type: 'commercial') ----
  const commercialTemplates = [
    { text: `buy premium ${lowercaseSeed} online in Pakistan`, intent: 'Transactional' as KeywordIntent, urdu: `آن لائن خریدیں` },
    { text: `best price ${lowercaseSeed} packages in ${cityLabel}`, intent: 'Commercial' as KeywordIntent, urdu: `بہترین قیمت پیکیج` },
    { text: `${lowercaseSeed} agencies in ${cityLabel} rates`, intent: 'Commercial' as KeywordIntent, urdu: `ریٹس اور فیس` },
  ];

  commercialTemplates.forEach((t, index) => {
    const diff = Math.floor(rand() * 35) + 35; // Moderate to High 35-70
    const vol = Math.floor(rand() * 1500) + 200;
    const cpcUsd = (0.45 + rand() * 1.50); // Commercial intent has higher CPC
    const cpcPkr = Math.floor(cpcUsd * 280);
    results.push({
      id: `comm-${index}-${seed}`,
      keyword: t.text,
      volume: vol,
      cpc: cpcPkr,
      cpcUsd: parseFloat(cpcUsd.toFixed(2)),
      difficulty: diff,
      intent: t.intent,
      type: 'commercial',
      competition: diff > 55 ? 'High' : 'Medium',
      urduTranslation: t.urdu,
      explanation: `Strong buying intent. Visitors searching this have their credit card or cash-on-delivery (COD) ready.`
    });
  });

  // ---- 5. BLOG TITLE IDEAS (type: 'blog-idea') ----
  const blogTemplates = [
    { text: `10 Secret Tips to Boost Your ${capitalizedSeed} in ${cityLabel}`, intent: 'Informational' as KeywordIntent, urdu: `دس خفیہ طریقے` },
    { text: `Complete Guide: How to Start ${capitalizedSeed} Business from Home in Pakistan`, intent: 'Informational' as KeywordIntent, urdu: `کاروبار شروع کرنے کا مکمل گائیڈ` },
    { text: `Top 5 Common Mistakes in ${capitalizedSeed} to Avoid in ${yearLabel()}`, intent: 'Informational' as KeywordIntent, urdu: `تباہ کن غلطیاں` },
  ];

  blogTemplates.forEach((t, index) => {
    const diff = Math.floor(rand() * 15) + 10; // 10-25 (usually very low competition)
    const vol = Math.floor(rand() * 600) + 100;
    const cpcUsd = (0.05 + rand() * 0.20);
    const cpcPkr = Math.floor(cpcUsd * 280);
    results.push({
      id: `blog-${index}-${seed}`,
      keyword: t.text,
      volume: vol,
      cpc: cpcPkr,
      cpcUsd: parseFloat(cpcUsd.toFixed(2)),
      difficulty: diff,
      intent: t.intent,
      type: 'blog-idea',
      competition: 'Low',
      urduTranslation: t.urdu,
      explanation: `High CTR educational title. Perfect topic content to gain rapid Google Search Console impressions.`
    });
  });

  // Calculate high quality aggregate metrics for Pakistan Local SEO Dashboard
  const totalDifficulties = results.reduce((sum, item) => sum + item.difficulty, 0);
  const totalVolumes = results.reduce((sum, item) => sum + item.volume, 0);
  const totalCpcs = results.reduce((sum, item) => sum + item.cpc, 0);
  const lowCompItems = results.filter(i => i.competition === 'Low').length;

  const avgDiff = Math.round(totalDifficulties / results.length);
  const avgVol = Math.round(totalVolumes / results.length);
  const avgCpc = Math.round(totalCpcs / results.length);

  // Overall SEO Health Score: Higher when there are more low competition keywords with solid volume
  let score = 100 - avgDiff + (lowCompItems * 4);
  if (score > 98) score = 98;
  if (score < 10) score = 10;

  const metrics: SEOMetrics = {
    overallScore: Math.round(score),
    lowCompCount: lowCompItems,
    averageVolume: avgVol,
    averageCpc: avgCpc,
    avgDifficulty: avgDiff
  };

  return {
    keywords: results,
    metrics
  };
}

export function yearLabel(): string {
  return new Date().getFullYear().toString();
}

// Sample keywords database for search suggestions dropdown
export const POPULAR_KEYWORDS_PAKISTAN = [
  'best digital agency karachi',
  'clothes online shopping pakistan',
  'lawn prints lahore online',
  'real estate plots rawalpindi',
  'shadi hall booking gulberg',
  'web design services islamabad',
  'leather exports sialkot price',
  'cheap mobile repair faisalabad',
  'catering rates multan DHA',
];
