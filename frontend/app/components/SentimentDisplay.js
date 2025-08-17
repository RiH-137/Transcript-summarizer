'use client';

export default function SentimentDisplay({ sentimentData }) {
  if (!sentimentData) return null;

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return ':)';
      case 'negative': return ':(';
      case 'neutral': return ':|';
      default: return ':|';
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-800">Sentiment Analysis</h3>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getSentimentColor(sentimentData.overall)}`}>
          <span className="mr-1">{getSentimentIcon(sentimentData.overall)}</span>
          {sentimentData.overall.charAt(0).toUpperCase() + sentimentData.overall.slice(1)}
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Confidence:</span> {sentimentData.confidence}
      </div>
      
      <div className="text-sm text-gray-700">
        <span className="font-medium">Analysis:</span>
        <div className="mt-2 p-3 bg-gray-50 rounded-md border">
          {sentimentData.analysis}
        </div>
      </div>
    </div>
  );
}
