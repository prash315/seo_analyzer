export interface SEOData {
  url: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  viewport: string;
  
  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  
  // Twitter Card
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  
  // Additional
  favicon: string;
  h1Tags: string[];
  imageCount: number;
  imagesWithoutAlt: number;
  
  // Mobile optimization
  mobileOptimized: boolean;
  pageSpeed: {
    mobile: number;
    desktop: number;
  };
  
  // Analysis scores
  scores: {
    title: 'good' | 'warning' | 'error';
    description: 'good' | 'warning' | 'error';
    openGraph: 'good' | 'warning' | 'error';
    twitter: 'good' | 'warning' | 'error';
    technical: 'good' | 'warning' | 'error';
    mobile: 'good' | 'warning' | 'error';
    overall: number;
  };
  
  // Categorized insights
  categories: {
    metaTags: SEOCategory;
    socialMedia: SEOCategory;
    technical: SEOCategory;
    mobile: SEOCategory;
  };
  
  recommendations: SEORecommendation[];
}

export interface SEOCategory {
  name: string;
  score: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  issues: SEOIssue[];
  passed: number;
  total: number;
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  howToFix: string;
  priority: number;
}

export interface SEORecommendation {
  id: string;
  category: 'meta' | 'social' | 'technical' | 'mobile';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  howToFix: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SEOScore {
  category: string;
  score: 'good' | 'warning' | 'error';
  message: string;
  recommendation?: string;
}