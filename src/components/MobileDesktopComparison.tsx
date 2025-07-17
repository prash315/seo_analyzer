import React, { useState } from 'react';
import { Smartphone, Monitor, Zap, Clock } from 'lucide-react';
import type { SEOData } from '../types/seo';

interface MobileDesktopComparisonProps {
  data: SEOData;
}

export function MobileDesktopComparison({ data }: MobileDesktopComparisonProps) {
  const [activeView, setActiveView] = useState<'mobile' | 'desktop'>('mobile');

  const getSpeedColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-600';
  };

  const getSpeedBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSpeedLabel = (score: number) => {
    if (score >= 90) return 'Fast';
    if (score >= 50) return 'Average';
    return 'Slow';
  };

  const SpeedMeter = ({ score, label }: { score: number; label: string }) => (
    <div className="text-center">
      <div className="relative inline-flex items-center justify-center mb-3">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 201} 201`}
            className={`transition-all duration-1000 ease-out ${getSpeedColor(score)}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-xl font-bold ${getSpeedColor(score)}`}>
            {score}
          </div>
        </div>
      </div>
      <div className="text-sm font-medium text-gray-900">{label}</div>
      <div className={`text-xs ${getSpeedColor(score)}`}>
        {getSpeedLabel(score)}
      </div>
    </div>
  );

  const PreviewFrame = ({ device }: { device: 'mobile' | 'desktop' }) => (
    <div className={`border-2 border-gray-300 rounded-lg overflow-hidden ${
      device === 'mobile' ? 'w-64 h-96 mx-auto' : 'w-full h-64'
    }`}>
      <div className="bg-gray-100 p-2 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-600 ml-2">
            {data.url}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 h-full overflow-hidden">
        <div className={`space-y-3 ${device === 'mobile' ? 'text-sm' : ''}`}>
          <div className="h-8 bg-blue-600 rounded flex items-center px-3">
            <div className="w-6 h-6 bg-white rounded mr-2"></div>
            <div className="text-white font-medium">
              {device === 'mobile' ? 'Site' : 'Website Name'}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className={`font-bold text-gray-900 ${device === 'mobile' ? 'text-lg' : 'text-xl'}`}>
              {data.title.length > (device === 'mobile' ? 40 : 60) 
                ? data.title.substring(0, device === 'mobile' ? 40 : 60) + '...'
                : data.title}
            </div>
            
            <div className={`text-gray-600 ${device === 'mobile' ? 'text-xs' : 'text-sm'}`}>
              {data.description.length > (device === 'mobile' ? 80 : 120)
                ? data.description.substring(0, device === 'mobile' ? 80 : 120) + '...'
                : data.description}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
          
          {device === 'desktop' && (
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Mobile vs Desktop</h3>
          <p className="text-gray-600">Performance and appearance comparison</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">Mobile Performance</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <SpeedMeter score={data.pageSpeed.mobile} label="Page Speed" />
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${data.mobileOptimized ? 'text-green-600' : 'text-red-600'}`}>
                {data.mobileOptimized ? '✓' : '✗'}
              </div>
              <div className="text-sm font-medium text-gray-900">Mobile Friendly</div>
              <div className={`text-xs ${data.mobileOptimized ? 'text-green-600' : 'text-red-600'}`}>
                {data.mobileOptimized ? 'Optimized' : 'Needs Work'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-purple-600" />
            <h4 className="text-lg font-semibold text-gray-900">Desktop Performance</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <SpeedMeter score={data.pageSpeed.desktop} label="Page Speed" />
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-green-600">✓</div>
              <div className="text-sm font-medium text-gray-900">Desktop Ready</div>
              <div className="text-xs text-green-600">Optimized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison */}
      <div>
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeView === 'mobile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile View
            </button>
            <button
              onClick={() => setActiveView('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeView === 'desktop'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Desktop View
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <PreviewFrame device={activeView} />
        </div>
      </div>
    </div>
  );
}