import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900">Analyzing website...</p>
        <p className="text-sm text-gray-600">Fetching and parsing SEO data</p>
      </div>
    </div>
  );
}