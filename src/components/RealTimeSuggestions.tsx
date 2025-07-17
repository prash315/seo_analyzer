import React, { useState } from 'react';
import { Lightbulb, Clock, Zap, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import type { SEOData, SEORecommendation } from '../types/seo';

interface RealTimeSuggestionsProps {
  data: SEOData;
}

export function RealTimeSuggestions({ data }: RealTimeSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'meta' | 'social' | 'technical' | 'mobile'>('all');
  const [completedSuggestions, setCompletedSuggestions] = useState<Set<string>>(new Set());

  const filteredRecommendations = selectedCategory === 'all' 
    ? data.recommendations 
    : data.recommendations.filter(rec => rec.category === selectedCategory);

  const sortedRecommendations = filteredRecommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Zap className="w-4 h-4 text-green-600" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'hard':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meta':
        return '🏷️';
      case 'social':
        return '📱';
      case 'technical':
        return '⚙️';
      case 'mobile':
        return '📱';
      default:
        return '💡';
    }
  };

  const toggleCompletion = (id: string) => {
    const newCompleted = new Set(completedSuggestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedSuggestions(newCompleted);
  };

  const completedCount = completedSuggestions.size;
  const totalCount = data.recommendations.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Real-Time Suggestions</h3>
            <p className="text-gray-600">Actionable recommendations to improve your SEO</p>
          </div>
        </div>

        {/* Progress */}
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{completedCount}/{totalCount}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Overall Progress</span>
          <span className="text-gray-900 font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'meta', 'social', 'technical', 'mobile'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            {category !== 'all' && (
              <span className="ml-1">
                {data.recommendations.filter(r => r.category === category).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {sortedRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className={`border rounded-lg p-4 transition-all ${
              completedSuggestions.has(recommendation.id)
                ? 'bg-green-50 border-green-200 opacity-75'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Completion Checkbox */}
              <button
                onClick={() => toggleCompletion(recommendation.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  completedSuggestions.has(recommendation.id)
                    ? 'bg-green-600 border-green-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {completedSuggestions.has(recommendation.id) && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getCategoryIcon(recommendation.category)}</span>
                  <h4 className={`font-semibold ${
                    completedSuggestions.has(recommendation.id) ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {recommendation.title}
                  </h4>
                  
                  {/* Priority Badge */}
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(recommendation.priority)}`}>
                    {recommendation.priority}
                  </span>
                </div>

                <p className={`text-sm mb-3 ${
                  completedSuggestions.has(recommendation.id) ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {recommendation.description}
                </p>

                {/* Impact */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <div className="text-sm">
                    <span className="font-medium text-blue-900">Expected Impact: </span>
                    <span className="text-blue-800">{recommendation.impact}</span>
                  </div>
                </div>

                {/* How to Fix */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">How to Fix: </span>
                    <span className="text-gray-700">{recommendation.howToFix}</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    {getDifficultyIcon(recommendation.difficulty)}
                    <span className="capitalize">{recommendation.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{recommendation.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">All Set!</h4>
          <p className="text-gray-600">No suggestions for this category. Great job!</p>
        </div>
      )}
    </div>
  );
}