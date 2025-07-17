import React, { useState } from 'react';
import type { SEOData } from '../types/seo';

interface SocialPreviewsProps {
  data: SEOData;
}

export function SocialPreviews({ data }: SocialPreviewsProps) {
  const [activeTab, setActiveTab] = useState<'facebook' | 'twitter' | 'linkedin'>('facebook');

  const FacebookPreview = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {data.ogImage && (
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <img 
            src={data.ogImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="hidden text-gray-500 text-sm">Image not available</div>
        </div>
      )}
      
      <div className="p-4 bg-gray-50">
        <div className="text-xs text-gray-500 uppercase mb-1">
          {data.url.replace(/^https?:\/\//, '').split('/')[0]}
        </div>
        
        <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {data.ogTitle || data.title || 'Untitled'}
        </h4>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {data.ogDescription || data.description || 'No description available'}
        </p>
      </div>
    </div>
  );

  const TwitterPreview = () => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      {data.twitterImage && (
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <img 
            src={data.twitterImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="hidden text-gray-500 text-sm">Image not available</div>
        </div>
      )}
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">
          {data.url.replace(/^https?:\/\//, '').split('/')[0]}
        </div>
        
        <h4 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {data.twitterTitle || data.ogTitle || data.title || 'Untitled'}
        </h4>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {data.twitterDescription || data.ogDescription || data.description || 'No description available'}
        </p>
      </div>
    </div>
  );

  const LinkedInPreview = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {data.ogImage && (
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <img 
            src={data.ogImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="hidden text-gray-500 text-sm">Image not available</div>
        </div>
      )}
      
      <div className="p-3 bg-white">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
          {data.ogTitle || data.title || 'Untitled'}
        </h4>
        
        <div className="text-xs text-gray-500 mb-1">
          {data.url.replace(/^https?:\/\//, '').split('/')[0]}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('facebook')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'facebook'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Facebook
        </button>
        
        <button
          onClick={() => setActiveTab('twitter')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'twitter'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Twitter
        </button>
        
        <button
          onClick={() => setActiveTab('linkedin')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'linkedin'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          LinkedIn
        </button>
      </div>

      {/* Preview Content */}
      <div className="min-h-[200px]">
        {activeTab === 'facebook' && <FacebookPreview />}
        {activeTab === 'twitter' && <TwitterPreview />}
        {activeTab === 'linkedin' && <LinkedInPreview />}
      </div>

      {/* Tags Information */}
      <div className="text-xs text-gray-500 space-y-1">
        {activeTab === 'facebook' && (
          <div>
            <p><strong>og:title:</strong> {data.ogTitle || 'Not set'}</p>
            <p><strong>og:description:</strong> {data.ogDescription || 'Not set'}</p>
            <p><strong>og:image:</strong> {data.ogImage || 'Not set'}</p>
          </div>
        )}
        
        {activeTab === 'twitter' && (
          <div>
            <p><strong>twitter:card:</strong> {data.twitterCard || 'Not set'}</p>
            <p><strong>twitter:title:</strong> {data.twitterTitle || 'Using og:title fallback'}</p>
            <p><strong>twitter:description:</strong> {data.twitterDescription || 'Using og:description fallback'}</p>
            <p><strong>twitter:image:</strong> {data.twitterImage || 'Using og:image fallback'}</p>
          </div>
        )}
        
        {activeTab === 'linkedin' && (
          <div>
            <p>LinkedIn uses Open Graph tags for previews</p>
            <p><strong>og:title:</strong> {data.ogTitle || 'Not set'}</p>
            <p><strong>og:description:</strong> {data.ogDescription || 'Not set'}</p>
            <p><strong>og:image:</strong> {data.ogImage || 'Not set'}</p>
          </div>
        )}
      </div>
    </div>
  );
}