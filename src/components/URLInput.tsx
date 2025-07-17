import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';

interface URLInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function URLInput({ value, onChange, onAnalyze, isLoading }: URLInputProps) {
  const [isValid, setIsValid] = useState(true);

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim()) {
      setIsValid(false);
      return;
    }

    let urlToAnalyze = value.trim();
    if (!urlToAnalyze.startsWith('http://') && !urlToAnalyze.startsWith('https://')) {
      urlToAnalyze = `https://${urlToAnalyze}`;
    }

    if (validateURL(urlToAnalyze)) {
      setIsValid(true);
      onAnalyze(urlToAnalyze);
    } else {
      setIsValid(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.trim()) {
      let testUrl = newValue.trim();
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = `https://${testUrl}`;
      }
      setIsValid(validateURL(testUrl));
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyze Your Website's SEO</h2>
        <p className="text-gray-600">Enter a URL to get detailed SEO analysis and social media previews</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Globe className={`w-5 h-5 ${isValid ? 'text-gray-400' : 'text-red-400'}`} />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Enter website URL (e.g., example.com)"
            className={`w-full pl-12 pr-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              isValid 
                ? 'border-gray-300' 
                : 'border-red-300 bg-red-50'
            }`}
            disabled={isLoading}
          />
          
          {!isValid && (
            <p className="mt-2 text-sm text-red-600">Please enter a valid URL</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          {isLoading ? 'Analyzing...' : 'Analyze Website'}
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>We'll analyze title tags, meta descriptions, Open Graph, Twitter Cards, and more</p>
      </div>
    </div>
  );
}