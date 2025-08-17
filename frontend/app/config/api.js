
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://transcript-summarizer-backend-ipi6.onrender.com';


export const API_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/upload`,
  SUMMARIZE: `${API_BASE_URL}/summarize`,
  EXTRACT_KEY_POINTS: `${API_BASE_URL}/extract-key-points`,
  EXPORT_DOCX: `${API_BASE_URL}/export-docx`,
  SEND_EMAIL: `${API_BASE_URL}/send-email-with-auth`,
  CHAT: `${API_BASE_URL}/chat`,
  HEALTH: `${API_BASE_URL}/health`
};
