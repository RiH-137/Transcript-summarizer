'use client';
import { useState } from 'react';
import { checkAPIHealth } from '../config/healthCheck';

export default function ConnectionTest() {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);

  const testConnection = async () => {
    setStatus('testing');
    const healthResult = await checkAPIHealth();
    setResult(healthResult);
    setStatus('complete');
  };

  return (
    <div className="section-card">
      <h3 className="font-medium text-gray-800 mb-4">Backend Connection Test</h3>
      
      <button 
        onClick={testConnection}
        disabled={status === 'testing'}
        className="btn-primary-sm mb-4"
      >
        {status === 'testing' ? 'Testing...' : 'Test Backend Connection'}
      </button>

      {result && (
        <div className={`p-3 rounded-md text-sm ${
          result.status === 'success' ? 'message-success' : 'message-error'
        }`}>
          <div className="font-medium mb-1">
            {result.status === 'success' ? '✅ Connection Successful' : '❌ Connection Failed'}
          </div>
          <div className="text-xs">
            {result.status === 'success' 
              ? `Server responded: ${JSON.stringify(result.data)}`
              : `Error: ${result.error}`
            }
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>Backend URL:</strong> https://transcript-summarizer-backend-ipi6.onrender.com</p>
        <p><strong>Frontend Environment:</strong> {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
}
