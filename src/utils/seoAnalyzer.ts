import type { SEOData, SEOCategory, SEORecommendation, SEOIssue } from '../types/seo';

export async function analyzeSEO(url: string): Promise<SEOData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock data based on URL patterns
  const isBadSEO = url.includes('bad-seo');
  const isMediumSEO = url.includes('medium-seo');
  
  const baseData = {
    url,
    title: isBadSEO ? 'Page' : 'Example Website - Your Digital Presence Starts Here',
    description: isBadSEO ? '' : 'Discover amazing products and services on our example website. We offer the best solutions for your needs with excellent customer service and competitive prices.',
    keywords: isBadSEO ? '' : 'example, website, products, services, digital',
    canonical: url,
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    
    // Open Graph
    ogTitle: isBadSEO ? '' : 'Example Website - Your Digital Presence Starts Here',
    ogDescription: isBadSEO ? '' : 'Discover amazing products and services on our example website. We offer the best solutions for your needs.',
    ogImage: isBadSEO ? '' : 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
    ogUrl: url,
    ogType: 'website',
    ogSiteName: 'Example Website',
    
    // Twitter Card
    twitterCard: isBadSEO ? '' : 'summary_large_image',
    twitterTitle: isBadSEO ? '' : 'Example Website - Your Digital Presence',
    twitterDescription: isBadSEO ? '' : 'Discover amazing products and services with excellent customer service.',
    twitterImage: isBadSEO ? '' : 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
    twitterSite: '@example',
    
    // Additional
    favicon: '/favicon.ico',
    h1Tags: isBadSEO ? [] : ['Welcome to Example Website', 'Our Services'],
    imageCount: isBadSEO ? 5 : 12,
    imagesWithoutAlt: isBadSEO ? 5 : 3,
    
    // Mobile optimization
    mobileOptimized: !isBadSEO,
    pageSpeed: {
      mobile: isBadSEO ? 25 : isMediumSEO ? 65 : 85,
      desktop: isBadSEO ? 45 : isMediumSEO ? 75 : 92,
    },
  };

  // Generate categories and scores
  const categories = generateCategories(baseData, isBadSEO, isMediumSEO);
  const scores = generateScores(baseData, isBadSEO, isMediumSEO);
  const recommendations = generateRecommendations(baseData, isBadSEO, isMediumSEO);

  return {
    ...baseData,
    categories,
    scores,
    recommendations,
  };
}

function generateCategories(data: any, isBadSEO: boolean, isMediumSEO: boolean): SEOData['categories'] {
  const metaTagsIssues: SEOIssue[] = [];
  const socialMediaIssues: SEOIssue[] = [];
  const technicalIssues: SEOIssue[] = [];
  const mobileIssues: SEOIssue[] = [];

  if (isBadSEO) {
    metaTagsIssues.push(
      {
        type: 'error',
        title: 'Missing title tag',
        description: 'No title tag found on the page',
        impact: 'high',
        howToFix: 'Add a descriptive title tag between 30-60 characters',
        priority: 1
      },
      {
        type: 'error',
        title: 'Missing meta description',
        description: 'No meta description found',
        impact: 'high',
        howToFix: 'Add a meta description between 120-160 characters',
        priority: 2
      }
    );

    socialMediaIssues.push(
      {
        type: 'error',
        title: 'No Open Graph tags',
        description: 'Missing all Open Graph meta tags',
        impact: 'medium',
        howToFix: 'Add og:title, og:description, and og:image tags',
        priority: 3
      }
    );

    mobileIssues.push(
      {
        type: 'error',
        title: 'Not mobile optimized',
        description: 'Page is not optimized for mobile devices',
        impact: 'high',
        howToFix: 'Implement responsive design and mobile-friendly layout',
        priority: 1
      }
    );
  } else if (isMediumSEO) {
    metaTagsIssues.push(
      {
        type: 'warning',
        title: 'Short meta description',
        description: 'Meta description is too short',
        impact: 'medium',
        howToFix: 'Expand meta description to 120-160 characters',
        priority: 2
      }
    );
  }

  if (data.imagesWithoutAlt > 0) {
    technicalIssues.push(
      {
        type: 'warning',
        title: 'Images missing alt text',
        description: `${data.imagesWithoutAlt} images are missing alt attributes`,
        impact: 'medium',
        howToFix: 'Add descriptive alt text to all images',
        priority: 2
      }
    );
  }

  return {
    metaTags: {
      name: 'Meta Tags',
      score: isBadSEO ? 20 : isMediumSEO ? 75 : 95,
      status: isBadSEO ? 'critical' : isMediumSEO ? 'needs-improvement' : 'excellent',
      issues: metaTagsIssues,
      passed: isBadSEO ? 1 : isMediumSEO ? 3 : 4,
      total: 4
    },
    socialMedia: {
      name: 'Social Media',
      score: isBadSEO ? 10 : isMediumSEO ? 80 : 90,
      status: isBadSEO ? 'critical' : isMediumSEO ? 'good' : 'excellent',
      issues: socialMediaIssues,
      passed: isBadSEO ? 0 : isMediumSEO ? 4 : 5,
      total: 5
    },
    technical: {
      name: 'Technical SEO',
      score: isBadSEO ? 40 : isMediumSEO ? 70 : 85,
      status: isBadSEO ? 'critical' : isMediumSEO ? 'needs-improvement' : 'good',
      issues: technicalIssues,
      passed: isBadSEO ? 2 : isMediumSEO ? 4 : 5,
      total: 6
    },
    mobile: {
      name: 'Mobile Optimization',
      score: isBadSEO ? 25 : isMediumSEO ? 65 : 90,
      status: isBadSEO ? 'critical' : isMediumSEO ? 'needs-improvement' : 'excellent',
      issues: mobileIssues,
      passed: isBadSEO ? 1 : isMediumSEO ? 3 : 4,
      total: 4
    }
  };
}

function generateScores(data: any, isBadSEO: boolean, isMediumSEO: boolean): SEOData['scores'] {
  if (isBadSEO) {
    return {
      title: 'error',
      description: 'error',
      openGraph: 'error',
      twitter: 'error',
      technical: 'error',
      mobile: 'error',
      overall: 25
    };
  } else if (isMediumSEO) {
    return {
      title: 'good',
      description: 'warning',
      openGraph: 'warning',
      twitter: 'warning',
      technical: 'warning',
      mobile: 'warning',
      overall: 65
    };
  } else {
    return {
      title: 'good',
      description: 'good',
      openGraph: 'good',
      twitter: 'good',
      technical: 'good',
      mobile: 'good',
      overall: 85
    };
  }
}

function generateRecommendations(data: any, isBadSEO: boolean, isMediumSEO: boolean): SEORecommendation[] {
  const recommendations: SEORecommendation[] = [];

  if (isBadSEO) {
    recommendations.push(
      {
        id: 'title-tag',
        category: 'meta',
        priority: 'high',
        title: 'Add a proper title tag',
        description: 'Your page is missing a title tag, which is crucial for SEO and user experience.',
        impact: 'Improve search rankings and click-through rates by 15-25%',
        howToFix: 'Add <title>Your Page Title Here</title> in the <head> section. Keep it between 30-60 characters.',
        estimatedTime: '5 minutes',
        difficulty: 'easy'
      },
      {
        id: 'meta-description',
        category: 'meta',
        priority: 'high',
        title: 'Add meta description',
        description: 'Missing meta description reduces click-through rates from search results.',
        impact: 'Increase click-through rates by 10-20%',
        howToFix: 'Add <meta name="description" content="Your description here"> with 120-160 characters.',
        estimatedTime: '10 minutes',
        difficulty: 'easy'
      },
      {
        id: 'open-graph',
        category: 'social',
        priority: 'medium',
        title: 'Implement Open Graph tags',
        description: 'Social media platforms cannot properly display your content without Open Graph tags.',
        impact: 'Improve social media engagement by 30-50%',
        howToFix: 'Add og:title, og:description, og:image, and og:url meta tags.',
        estimatedTime: '20 minutes',
        difficulty: 'easy'
      },
      {
        id: 'mobile-optimization',
        category: 'mobile',
        priority: 'high',
        title: 'Optimize for mobile devices',
        description: 'Your site is not mobile-friendly, affecting user experience and rankings.',
        impact: 'Improve mobile rankings and user experience significantly',
        howToFix: 'Implement responsive design with CSS media queries and mobile-first approach.',
        estimatedTime: '2-4 hours',
        difficulty: 'medium'
      }
    );
  } else if (isMediumSEO) {
    recommendations.push(
      {
        id: 'expand-description',
        category: 'meta',
        priority: 'medium',
        title: 'Expand meta description',
        description: 'Your meta description is too short and could be more compelling.',
        impact: 'Increase click-through rates by 5-10%',
        howToFix: 'Expand your meta description to 120-160 characters with compelling copy.',
        estimatedTime: '15 minutes',
        difficulty: 'easy'
      },
      {
        id: 'twitter-cards',
        category: 'social',
        priority: 'low',
        title: 'Add Twitter Card tags',
        description: 'Enhance how your content appears when shared on Twitter.',
        impact: 'Improve Twitter engagement by 15-25%',
        howToFix: 'Add twitter:card, twitter:title, twitter:description meta tags.',
        estimatedTime: '10 minutes',
        difficulty: 'easy'
      }
    );
  }

  // Common recommendations
  if (data.imagesWithoutAlt > 0) {
    recommendations.push({
      id: 'image-alt-text',
      category: 'technical',
      priority: 'medium',
      title: 'Add alt text to images',
      description: `${data.imagesWithoutAlt} images are missing alt attributes, affecting accessibility and SEO.`,
      impact: 'Improve accessibility and image search rankings',
      howToFix: 'Add descriptive alt="..." attributes to all images.',
      estimatedTime: '30 minutes',
      difficulty: 'easy'
    });
  }

  recommendations.push({
    id: 'structured-data',
    category: 'technical',
    priority: 'low',
    title: 'Add structured data markup',
    description: 'Structured data helps search engines understand your content better.',
    impact: 'Enable rich snippets and improve search appearance',
    howToFix: 'Implement JSON-LD structured data for your content type.',
    estimatedTime: '1-2 hours',
    difficulty: 'medium'
  });

  return recommendations;
}

// Helper function to analyze real HTML content
export function parseHTMLForSEO(html: string, url: string): SEOData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const getMetaContent = (name: string, property?: string): string => {
    const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
    const meta = doc.querySelector(selector);
    return meta?.getAttribute('content') || '';
  };

  const title = doc.querySelector('title')?.textContent || '';
  const description = getMetaContent('description');
  const keywords = getMetaContent('keywords');
  
  const h1Tags = Array.from(doc.querySelectorAll('h1')).map(h1 => h1.textContent || '');
  const images = doc.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt')).length;

  // Calculate scores
  const titleScore = title.length >= 30 && title.length <= 60 ? 'good' : 
                    title.length > 0 ? 'warning' : 'error';
  const descScore = description.length >= 120 && description.length <= 160 ? 'good' :
                   description.length > 0 ? 'warning' : 'error';
  
  const ogTitle = getMetaContent('', 'og:title');
  const ogDesc = getMetaContent('', 'og:description');
  const ogImage = getMetaContent('', 'og:image');
  const ogScore = ogTitle && ogDesc && ogImage ? 'good' : 
                 ogTitle || ogDesc ? 'warning' : 'error';
  
  const twitterCard = getMetaContent('twitter:card');
  const twitterScore = twitterCard ? 'good' : 'warning';
  
  const scores = [titleScore, descScore, ogScore, twitterScore];
  const goodCount = scores.filter(s => s === 'good').length;
  const overall = (goodCount / scores.length) * 100;

  const mockCategories = generateCategories({
    title, description, ogTitle, ogDesc: ogDescription, ogImage, 
    imagesWithoutAlt, mobileOptimized: true
  }, false, false);

  const mockRecommendations = generateRecommendations({
    title, description, ogTitle, ogDesc: ogDescription, ogImage, imagesWithoutAlt
  }, false, false);

  return {
    url,
    title,
    description,
    keywords,
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
    robots: getMetaContent('robots'),
    viewport: getMetaContent('viewport'),
    
    ogTitle,
    ogDescription: ogDesc,
    ogImage,
    ogUrl: getMetaContent('', 'og:url'),
    ogType: getMetaContent('', 'og:type'),
    ogSiteName: getMetaContent('', 'og:site_name'),
    
    twitterCard,
    twitterTitle: getMetaContent('twitter:title'),
    twitterDescription: getMetaContent('twitter:description'),
    twitterImage: getMetaContent('twitter:image'),
    twitterSite: getMetaContent('twitter:site'),
    
    favicon: doc.querySelector('link[rel="icon"]')?.getAttribute('href') || '',
    h1Tags,
    imageCount: images.length,
    imagesWithoutAlt,
    
    mobileOptimized: !!getMetaContent('viewport'),
    pageSpeed: {
      mobile: 75,
      desktop: 85
    },
    
    categories: mockCategories,
    
    scores: {
      title: titleScore as 'good' | 'warning' | 'error',
      description: descScore as 'good' | 'warning' | 'error',
      openGraph: ogScore as 'good' | 'warning' | 'error',
      twitter: twitterScore as 'good' | 'warning' | 'error',
      technical: 'good',
      mobile: 'good',
      overall: Math.round(overall)
    },
    
    recommendations: mockRecommendations
  };
}