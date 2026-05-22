// TypeScript types and interfaces for RankAura AI

export type KeywordIntent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';

export type KeywordType = 'low-competition' | 'long-tail' | 'local' | 'commercial' | 'blog-idea';

export interface KeywordResult {
  id: string;
  keyword: string;
  volume: number;
  cpc: number; // in PKR
  cpcUsd: number; // in USD
  difficulty: number; // 0-100
  intent: KeywordIntent;
  type: KeywordType;
  competition: 'Low' | 'Medium' | 'High';
  urduTranslation?: string;
  explanation: string;
}

export interface SEOMetrics {
  overallScore: number;
  lowCompCount: number;
  averageVolume: number;
  averageCpc: number; // in PKR
  avgDifficulty: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown / HTML-safe text
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageAlt: string;
  keywords: string[];
}

export interface SearchQuery {
  niche: string;
  country: string;
  city: string;
  keyword: string;
}
