import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, XCircle, ExternalLink, Share2, Eye } from 'lucide-react';
import { URLInput } from './components/URLInput';
import { SEOHealthScore } from './components/SEOHealthScore';
import { CategoryInsights } from './components/CategoryInsights';
import { MobileDesktopComparison } from './components/MobileDesktopComparison';
import { RealTimeSuggestions } from './components/RealTimeSuggestions';
import { GooglePreview } from './components/GooglePreview';
import { SocialPreviews } from './components/SocialPreviews';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeSEO } from './utils/seoAnalyzer';
import type { SEOData } from './types/seo';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (targetUrl: string) => {
    setIsLoading(true);
    setError(null);
    setSeoData(null);

    try {
      // In a real app, you'd need a backend proxy to handle CORS
      // For demo purposes, we'll simulate the analysis
      const result = await analyzeSEO(targetUrl);
      setSeoData(result);
    } catch (err) {
      setError('Failed to analyze the website. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                SEO Analyzer Pro
              </h1>
              <p className="text-gray-600 text-lg">
                Comprehensive SEO analysis with visual insights and actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Input Section */}
        <div className="mb-8">
          <URLInput
            value={url}
            onChange={setUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Analysis Failed</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {seoData && !isLoading && (
          <div className="space-y-8">
            {/* SEO Health Score */}
            <SEOHealthScore data={seoData} />

            {/* Category Insights */}
            <CategoryInsights data={seoData} />

            {/* Mobile vs Desktop Comparison */}
            <MobileDesktopComparison data={seoData} />

            {/* Real-Time Suggestions */}
            <RealTimeSuggestions data={seoData} />

            {/* Previews Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Google Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Google Search Preview</h3>
                    <p className="text-gray-600 text-sm">How your page appears in search results</p>
                  </div>
                </div>
                <GooglePreview data={seoData} />
              </div>

              {/* Social Media Previews */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Social Media Previews</h3>
                    <p className="text-gray-600 text-sm">How your content appears when shared</p>
                  </div>
                </div>
                <SocialPreviews data={seoData} />
              </div>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        {!seoData && !isLoading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Try These Demo URLs
              </h3>
              <p className="text-gray-600 mb-6">
                Test the analyzer with different SEO scenarios to see how it works:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-medium text-green-800 mb-2">Good SEO</div>
                  <code className="text-green-700">example.com</code>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="font-medium text-amber-800 mb-2">Medium SEO</div>
                  <code className="text-amber-700">medium-seo.com</code>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="font-medium text-red-800 mb-2">Poor SEO</div>
                  <code className="text-red-700">bad-seo.com</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-lg font-medium mb-2">SEO Analyzer Pro</p>
            <p className="text-sm">
              Comprehensive SEO analysis with visual insights, mobile optimization checks, and real-time suggestions
            </p>
            <p className="text-xs mt-4 text-gray-500">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;