import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, XCircle, ExternalLink, Share2, Eye } from 'lucide-react';
import { URLInput } from './components/URLInput';
import { SEOAnalysis } from './components/SEOAnalysis';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SEO Analyzer</h1>
              <p className="text-gray-600">Analyze and optimize your website's SEO tags</p>
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
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {seoData && !isLoading && (
          <div className="space-y-8">
            {/* SEO Analysis Overview */}
            <SEOAnalysis data={seoData} />

            {/* Previews Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Google Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Google Search Preview</h3>
                </div>
                <GooglePreview data={seoData} />
              </div>

              {/* Social Media Previews */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Previews</h3>
                </div>
                <SocialPreviews data={seoData} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p className="text-sm mt-2">Analyze your website's SEO performance and social media presence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;