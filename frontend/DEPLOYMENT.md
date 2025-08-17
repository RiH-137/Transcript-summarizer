# MangoDesk - Frontend Deployment Guide

## Environment Configuration

### Production Environment Variables

The frontend is configured to use the deployed backend on Render:

```bash
NEXT_PUBLIC_API_URL=https://transcript-summarizer-backend-ipi6.onrender.com
```

### API Configuration

All API calls are centralized in `/app/config/api.js`:

- **Backend URL**: https://transcript-summarizer-backend-ipi6.onrender.com
- **Upload Endpoint**: `/upload`
- **Summarize Endpoint**: `/summarize`
- **Email Endpoint**: `/send-email-with-auth`
- **Chat Endpoint**: `/chat`
- **Export Endpoint**: `/export-docx`
- **Key Points Endpoint**: `/extract-key-points`
- **Health Check**: `/health`

### Deployment Steps

1. **Environment Setup**:
   ```bash
   # Frontend (Vercel)
   NEXT_PUBLIC_API_URL=https://transcript-summarizer-backend-ipi6.onrender.com
   ```

2. **Build Configuration**:
   - Next.js config includes CORS headers
   - Environment variables are properly configured
   - All localhost references have been replaced

3. **API Integration**:
   - All components now use `API_ENDPOINTS` from config
   - Health check utility available for connection testing
   - Error handling updated for production deployment

### Testing the Integration

To test if frontend can connect to backend:

```javascript
import { checkAPIHealth } from './config/healthCheck';

// Test connection
checkAPIHealth().then(result => {
  console.log('Connection status:', result.status);
});
```

### Files Modified for Deployment

- ✅ `/app/config/api.js` - Centralized API configuration
- ✅ `/app/page.js` - Main page component
- ✅ `/app/components/UploadPaste.js` - File upload
- ✅ `/app/components/EmailSection.js` - Email functionality
- ✅ `/app/components/ChatBot.js` - Document Q&A
- ✅ `/app/components/ExportSection.js` - Export features
- ✅ `/app/components/KeyPoints.js` - Key points extraction
- ✅ `/app/api/transcribe/route.js` - API routes
- ✅ `next.config.mjs` - Next.js configuration
- ✅ `.env.local` - Environment variables

### Production URLs

- **Frontend**: https://your-vercel-app.vercel.app
- **Backend**: https://transcript-summarizer-backend-ipi6.onrender.com

All API calls are now configured to use the production backend URL automatically.
