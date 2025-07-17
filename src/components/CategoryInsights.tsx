import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Tag, Share2, Settings, Smartphone } from 'lucide-react';
import type { SEOData, SEOCategory } from '../types/seo';

interface CategoryInsightsProps {
  data: SEOData;
}

export function CategoryInsights({ data }: CategoryInsightsProps) {
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Meta Tags':
        return <Tag className="w-6 h-6" />;
      case 'Social Media':
        return <Share2 className="w-6 h-6" />;
      case 'Technical SEO':
        return <Settings className="w-6 h-6" />;
      case 'Mobile Optimization':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'good':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'needs-improvement':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'needs-improvement':
        return 'bg-amber-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const CategoryCard = ({ category }: { category: SEOCategory }) => (
    <div className={`border rounded-xl p-6 ${getStatusColor(category.status)}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getCategoryIcon(category.name)}
          <h3 className="text-lg font-semibold">{category.name}</h3>
        </div>
        {getStatusIcon(category.status)}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{category.passed}/{category.total} checks passed</span>
        </div>
        <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(category.status)}`}
            style={{ width: `${(category.passed / category.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="text-center mb-4">
        <div className="text-3xl font-bold">{category.score}%</div>
        <div className="text-sm opacity-75 capitalize">{category.status.replace('-', ' ')}</div>
      </div>

      {/* Issues Summary */}
      {category.issues.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Top Issues:</h4>
          {category.issues.slice(0, 2).map((issue, index) => (
            <div key={index} className="text-sm opacity-75">
              • {issue.title}
            </div>
          ))}
          {category.issues.length > 2 && (
            <div className="text-sm opacity-75">
              +{category.issues.length - 2} more issues
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600 rounded-lg">
          <Tag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">SEO Categories</h3>
          <p className="text-gray-600">Detailed breakdown by category</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CategoryCard category={data.categories.metaTags} />
        <CategoryCard category={data.categories.socialMedia} />
        <CategoryCard category={data.categories.technical} />
        <CategoryCard category={data.categories.mobile} />
      </div>
    </div>
  );
}