import React from 'react';
import { TrendingUp, Award, AlertTriangle, XCircle } from 'lucide-react';
import type { SEOData } from '../types/seo';

interface SEOHealthScoreProps {
  data: SEOData;
}

export function SEOHealthScore({ data }: SEOHealthScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-blue-500 to-blue-600';
    if (score >= 50) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Award className="w-8 h-8 text-green-600" />;
    if (score >= 70) return <TrendingUp className="w-8 h-8 text-blue-600" />;
    if (score >= 50) return <AlertTriangle className="w-8 h-8 text-amber-500" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Improvement';
    return 'Critical Issues';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 90) return 'Your SEO is in great shape! Keep up the excellent work.';
    if (score >= 70) return 'Good SEO foundation with room for optimization.';
    if (score >= 50) return 'Several areas need attention to improve rankings.';
    return 'Immediate action required to fix critical SEO issues.';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="text-center">
        {/* Score Circle */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(data.scores.overall / 100) * 314} 314`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-${getScoreGradient(data.scores.overall).split('-')[1]}-500`} />
                <stop offset="100%" className={`stop-color-${getScoreGradient(data.scores.overall).split('-')[3]}-600`} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {getScoreIcon(data.scores.overall)}
            <div className={`text-3xl font-bold ${getScoreColor(data.scores.overall)} mt-1`}>
              {data.scores.overall}
            </div>
            <div className="text-sm text-gray-600">SEO Score</div>
          </div>
        </div>

        {/* Score Label and Description */}
        <h3 className={`text-2xl font-bold ${getScoreColor(data.scores.overall)} mb-2`}>
          {getScoreLabel(data.scores.overall)}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {getScoreDescription(data.scores.overall)}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(data.categories).reduce((acc, cat) => acc + cat.passed, 0)}
            </div>
            <div className="text-sm text-gray-600">Checks Passed</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">
              {data.recommendations.filter(r => r.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">Critical Issues</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-amber-500">
              {data.recommendations.filter(r => r.priority === 'medium').length}
            </div>
            <div className="text-sm text-gray-600">Warnings</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {data.recommendations.filter(r => r.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-gray-600">Quick Fixes</div>
          </div>
        </div>
      </div>
    </div>
  );
}