import type { SEOData } from '../types/seo';

export async function analyzeSEO(url: string): Promise<SEOData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real application, you would fetch the HTML content here
  // Due to CORS restrictions in browsers, you'd need a backend proxy
  // For demo purposes, we'll return mock data based on the URL
  
  const mockData: SEOData = {
    url,
    title: 'Example Website - Your Digital Presence Starts Here',
    description: 'Discover amazing products and services on our example website. We offer the best solutions for your needs with excellent customer service and competitive prices.',
    keywords: 'example, website, products, services, digital',
    canonical: url,
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    
    // Open Graph
    ogTitle: 'Example Website - Your Digital Presence Starts Here',
    ogDescription: 'Discover amazing products and services on our example website. We offer the best solutions for your needs.',
    ogImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
    ogUrl: url,
    ogType: 'website',
    ogSiteName: 'Example Website',
    
    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterTitle: 'Example Website - Your Digital Presence',
    twitterDescription: 'Discover amazing products and services with excellent customer service.',
    twitterImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop',
    twitterSite: '@example',
    
    // Additional
    favicon: '/favicon.ico',
    h1Tags: ['Welcome to Example Website', 'Our Services'],
    imageCount: 12,
    imagesWithoutAlt: 3,
    
    scores: {
      title: 'good',
      description: 'good',
      openGraph: 'good',
      twitter: 'good',
      overall: 85
    },
    
    recommendations: [
      'Add alt text to 3 images that are missing it',
      'Consider shortening the meta description to under 160 characters',
      'Add structured data markup for better search results',
      'Optimize images for faster loading times'
    ]
  };

  // Simulate different scenarios based on URL
  if (url.includes('bad-seo')) {
    mockData.title = 'Page';
    mockData.description = '';
    mockData.ogTitle = '';
    mockData.ogDescription = '';
    mockData.ogImage = '';
    mockData.twitterCard = '';
    mockData.scores = {
      title: 'error',
      description: 'error', 
      openGraph: 'error',
      twitter: 'error',
      overall: 25
    };
    mockData.recommendations = [
      'Add a descriptive title tag (current: "Page")',
      'Add a meta description between 120-160 characters',
      'Implement Open Graph tags for social media sharing',
      'Add Twitter Card meta tags',
      'Use heading tags (H1, H2, H3) to structure content',
      'Add alt text to all images'
    ];
  } else if (url.includes('medium-seo')) {
    mockData.description = 'Short desc';
    mockData.ogImage = '';
    mockData.twitterDescription = '';
    mockData.scores = {
      title: 'good',
      description: 'warning',
      openGraph: 'warning', 
      twitter: 'warning',
      overall: 65
    };
    mockData.recommendations = [
      'Expand meta description to 120-160 characters for better CTR',
      'Add Open Graph image for social media previews',
      'Add Twitter-specific description for better engagement',
      'Consider adding more relevant keywords to content'
    ];
  }

  return mockData;
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
    
    scores: {
      title: titleScore as 'good' | 'warning' | 'error',
      description: descScore as 'good' | 'warning' | 'error',
      openGraph: ogScore as 'good' | 'warning' | 'error',
      twitter: twitterScore as 'good' | 'warning' | 'error',
      overall: Math.round(overall)
    },
    
    recommendations: generateRecommendations({
      title, description, ogTitle, ogDesc, ogImage, twitterCard, imagesWithoutAlt
    })
  };
}

function generateRecommendations(data: any): string[] {
  const recommendations: string[] = [];
  
  if (!data.title || data.title.length < 30) {
    recommendations.push('Add a descriptive title tag between 30-60 characters');
  } else if (data.title.length > 60) {
    recommendations.push('Shorten title tag to under 60 characters');
  }
  
  if (!data.description) {
    recommendations.push('Add a meta description between 120-160 characters');
  } else if (data.description.length < 120) {
    recommendations.push('Expand meta description to 120-160 characters');
  } else if (data.description.length > 160) {
    recommendations.push('Shorten meta description to under 160 characters');
  }
  
  if (!data.ogTitle || !data.ogDesc || !data.ogImage) {
    recommendations.push('Complete Open Graph implementation for social media');
  }
  
  if (!data.twitterCard) {
    recommendations.push('Add Twitter Card meta tags for better social sharing');
  }
  
  if (data.imagesWithoutAlt > 0) {
    recommendations.push(`Add alt text to ${data.imagesWithoutAlt} images`);
  }
  
  return recommendations;
}