import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SEOData } from '../types/seo';

interface GooglePreviewProps {
  data: SEOData;
}

export function GooglePreview({ data }: GooglePreviewProps) {
  const displayUrl = data.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const title = data.title || 'Untitled Page';
  const description = data.description || 'No description available for this page.';

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="space-y-1">
        {/* URL */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span>{displayUrl}</span>
          <ExternalLink className="w-3 h-3" />
        </div>
        
        {/* Title */}
        <h3 className="text-xl text-blue-600 hover:underline cursor-pointer line-clamp-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
      </div>
      
      {/* Additional info */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span className="font-medium">Title Length:</span> {title.length}/60
          </div>
          <div>
            <span className="font-medium">Description:</span> {description.length}/160
          </div>
        </div>
      </div>
    </div>
  );
}