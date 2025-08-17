'use client';
import { useState, useEffect, useCallback } from 'react';
import { API_URLS } from '../config/api';

export default function KeyPoints({ originalText, summary, onKeyPointsUpdate }) {
  const [keyPoints, setKeyPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // simple extraction of key points
  const getSimpleKeyPoints = useCallback(() => {
    if (!originalText) return [];
    
    const sentences = originalText.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const keywords = ['important', 'key', 'decision', 'action', 'deadline', 'critical', 'must', 'should', 'will', 'agreed', 'decided'];
    
    return sentences
      .filter(sentence => 
        keywords.some(keyword => 
          sentence.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 8)
      .map(sentence => sentence.trim());
  }, [originalText]);

  const extractKeyPoints = useCallback(async () => {
    if (!originalText || !summary) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(API_URLS.EXTRACT_KEY_POINTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          originalText: originalText,
          summary: summary 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.keyPoints) {
          setKeyPoints(data.keyPoints);
          onKeyPointsUpdate?.(data.keyPoints);
          return;
        }
      }
    } catch (error) {
      console.error('Error extracting key points:', error);
    }
    
    // fallbask for simple extraction
    const simplePoints = getSimpleKeyPoints();
    setKeyPoints(simplePoints);
    onKeyPointsUpdate?.(simplePoints);
    setIsLoading(false);
  }, [originalText, summary, onKeyPointsUpdate, getSimpleKeyPoints]);

  // extracting the key points
  useEffect(() => {
    if (originalText && summary && summary !== 'Generating summary...' && !summary.startsWith('❌')) {
      extractKeyPoints();
    } else {
      const points = [];
      setKeyPoints(points);
      onKeyPointsUpdate?.(points);
    }
  }, [originalText, summary, extractKeyPoints, onKeyPointsUpdate]);

  const displayPoints = keyPoints;

  return (
    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-800 flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Key Points Used
        </h3>
      </div>
      
      <div className="space-y-2">
        {displayPoints.length > 0 ? (
          displayPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 bg-blue-50 rounded border-l-3 border-blue-400"
            >
              <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {typeof point === 'string' ? point : point.text || point}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">Key points will appear here after generating a summary</p>
          </div>
        )}
      </div>
      
      {displayPoints.length > 0 && (
        <div className="mt-3 text-xs text-gray-500 text-center">
          {displayPoints.length} key points identified
        </div>
      )}
    </div>
  );
}
