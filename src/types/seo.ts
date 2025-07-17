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
  
  // Analysis scores
  scores: {
    title: 'good' | 'warning' | 'error';
    description: 'good' | 'warning' | 'error';
    openGraph: 'good' | 'warning' | 'error';
    twitter: 'good' | 'warning' | 'error';
    overall: number;
  };
  
  recommendations: string[];
}

export interface SEOScore {
  category: string;
  score: 'good' | 'warning' | 'error';
  message: string;
  recommendation?: string;
}