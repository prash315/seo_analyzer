import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Star } from 'lucide-react';
import type { SEOData } from '../types/seo';

interface SEOAnalysisProps {
  data: SEOData;
}

export function SEOAnalysis({ data }: SEOAnalysisProps) {
  const getScoreIcon = (score: 'good' | 'warning' | 'error') => {
    switch (score) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getScoreColor = (score: 'good' | 'warning' | 'error') => {
    switch (score) {
      case 'good':
        return 'text-green-800 bg-green-50 border-green-200';
      case 'warning':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'error':
        return 'text-red-800 bg-red-50 border-red-200';
    }
  };

  const overallScoreColor = data.scores.overall >= 80 ? 'text-green-600' : 
                           data.scores.overall >= 60 ? 'text-amber-500' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">SEO Analysis</h3>
            <p className="text-gray-600">Detailed breakdown of your SEO performance</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-3xl font-bold ${overallScoreColor}`}>
            {data.scores.overall}%
          </div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{data.h1Tags.length}</div>
          <div className="text-sm text-gray-600">H1 Tags</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{data.imageCount}</div>
          <div className="text-sm text-gray-600">Images</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{data.imagesWithoutAlt}</div>
          <div className="text-sm text-gray-600">Missing Alt</div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{data.title.length}</div>
          <div className="text-sm text-gray-600">Title Length</div>
        </div>
      </div>

      {/* SEO Categories */}
      <div className="space-y-4">
        <div className={`border rounded-lg p-4 ${getScoreColor(data.scores.title)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getScoreIcon(data.scores.title)}
              <div>
                <h4 className="font-semibold">Title Tag</h4>
                <p className="text-sm opacity-75">{data.title || 'No title tag found'}</p>
              </div>
            </div>
            <div className="text-sm font-medium">
              {data.title.length}/60
            </div>
          </div>
        </div>

        <div className={`border rounded-lg p-4 ${getScoreColor(data.scores.description)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getScoreIcon(data.scores.description)}
              <div>
                <h4 className="font-semibold">Meta Description</h4>
                <p className="text-sm opacity-75">{data.description || 'No meta description found'}</p>
              </div>
            </div>
            <div className="text-sm font-medium">
              {data.description.length}/160
            </div>
          </div>
        </div>

        <div className={`border rounded-lg p-4 ${getScoreColor(data.scores.openGraph)}`}>
          <div className="flex items-center gap-3">
            {getScoreIcon(data.scores.openGraph)}
            <div>
              <h4 className="font-semibold">Open Graph Tags</h4>
              <p className="text-sm opacity-75">
                {data.ogTitle && data.ogDescription && data.ogImage ? 
                  'Complete Open Graph implementation' : 
                  'Missing some Open Graph tags'
                }
              </p>
            </div>
          </div>
        </div>

        <div className={`border rounded-lg p-4 ${getScoreColor(data.scores.twitter)}`}>
          <div className="flex items-center gap-3">
            {getScoreIcon(data.scores.twitter)}
            <div>
              <h4 className="font-semibold">Twitter Cards</h4>
              <p className="text-sm opacity-75">
                {data.twitterCard ? 
                  `Twitter card type: ${data.twitterCard}` : 
                  'No Twitter card tags found'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}