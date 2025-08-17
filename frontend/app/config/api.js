// API Configuration
const API_CONFIG = {
  // Backend URL - Automatically detects environment
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://transcript-summarizer-backend-ipi6.onrender.com')
    : (process.env.NEXT_PUBLIC_API_BASE_URL_DEV || 'http://localhost:3001'),
  
  // API Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    UPLOAD: '/upload',
    SUMMARIZE: '/summarize',
    EXTRACT_KEY_POINTS: '/extract-key-points',
    SENTIMENT: '/sentiment',
    TRANSLATE: '/translate',
    HIGHLIGHTS: '/highlights',
    EXPORT_DOCX: '/export-docx',
    SEND_EMAIL: '/send-email-with-auth',
    CHAT: '/chat'
  }
};

// Helper function to build complete API URLs
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints for convenience
export const API_URLS = {
  HEALTH: getApiUrl(API_CONFIG.ENDPOINTS.HEALTH),
  UPLOAD: getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD),
  SUMMARIZE: getApiUrl(API_CONFIG.ENDPOINTS.SUMMARIZE),
  EXTRACT_KEY_POINTS: getApiUrl(API_CONFIG.ENDPOINTS.EXTRACT_KEY_POINTS),
  SENTIMENT: getApiUrl(API_CONFIG.ENDPOINTS.SENTIMENT),
  TRANSLATE: getApiUrl(API_CONFIG.ENDPOINTS.TRANSLATE),
  HIGHLIGHTS: getApiUrl(API_CONFIG.ENDPOINTS.HIGHLIGHTS),
  EXPORT_DOCX: getApiUrl(API_CONFIG.ENDPOINTS.EXPORT_DOCX),
  SEND_EMAIL: getApiUrl(API_CONFIG.ENDPOINTS.SEND_EMAIL),
  CHAT: getApiUrl(API_CONFIG.ENDPOINTS.CHAT)
};

// Debug logging for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: process.env.NODE_ENV,
    sampleEndpoint: API_URLS.HEALTH
  });
}

export default API_CONFIG;
