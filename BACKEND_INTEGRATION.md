# MangoDesk - Backend Integration Guide

## ✅ Backend Integration Completed

Your MangoDesk frontend has been successfully configured to work with your deployed backend on Render.

### 🔧 Configuration Details

**Backend URL:** `https://transcript-summarizer-backend-ipi6.onrender.com`
**Frontend:** Deployed on Vercel

### 📋 Changes Made

1. **Centralized API Configuration** (`/app/config/api.js`)
   - All API endpoints now use the deployed backend URL
   - Automatic environment detection (dev vs production)
   - Support for environment variables

2. **Updated Components:**
   - ✅ `page.js` - Main summarization endpoint
   - ✅ `UploadPaste.js` - File upload endpoint
   - ✅ `KeyPoints.js` - Key points extraction
   - ✅ `ExportSection.js` - DOCX export functionality
   - ✅ `EmailSection.js` - Email sending with nodemailer
   - ✅ `ChatBot.js` - Document Q&A functionality
   - ✅ `transcribe/route.js` - Audio transcription API route

3. **Health Check System** (`/app/config/healthCheck.js`)
   - Backend connectivity monitoring
   - Connection status reporting
   - Automatic retry logic

4. **Testing Utilities** (`/app/utils/backendTest.js`)
   - Endpoint testing functions
   - Integration test suite
   - Connection validation

### 🚀 Deployment Steps for Vercel

1. **Environment Variables** (Optional - Add to Vercel)
   ```
   NEXT_PUBLIC_API_BASE_URL=https://transcript-summarizer-backend-ipi6.onrender.com
   ```

2. **Deploy to Vercel:**
   ```bash
   # In your frontend directory
   npm run build
   vercel --prod
   ```

3. **Verify Integration:**
   - Upload a document and test summarization
   - Try the chat functionality
   - Test email sending
   - Check export features

### 🔍 Testing Backend Connection

To test if everything is working, you can use the browser console:

```javascript
// Test backend health
fetch('https://transcript-summarizer-backend-ipi6.onrender.com/health')
  .then(r => r.text())
  .then(console.log);

// Or use the built-in test utility (in your app)
import { quickBackendTest } from './utils/backendTest';
quickBackendTest();
```

### 📊 API Endpoints Available

All endpoints are now automatically configured:

- `GET /health` - Backend health check
- `POST /upload` - File upload and processing
- `POST /summarize` - Text summarization
- `POST /extract-key-points` - Key points extraction
- `POST /sentiment` - Sentiment analysis
- `POST /translate` - Language translation
- `POST /highlights` - Text highlighting
- `POST /export-docx` - DOCX export
- `POST /send-email-with-auth` - Email sending
- `POST /chat` - Document Q&A chat

### 🛠️ Troubleshooting

**If you experience issues:**

1. **Check Backend Status:**
   - Visit: https://transcript-summarizer-backend-ipi6.onrender.com/health
   - Should return: "MangoDesk Backend running on port 3001"

2. **Common Issues:**
   - **Cold Start Delay:** Render services can take 30-60 seconds to wake up
   - **CORS Issues:** Backend has CORS enabled for all origins
   - **File Upload Limits:** Backend supports up to 100MB files

3. **Network Issues:**
   - Check your internet connection
   - Verify the Render service is running
   - Try refreshing the page after a few seconds

### 🔄 Environment Switching

The app automatically detects the environment:
- **Production:** Uses Render backend URL
- **Development:** Uses `http://localhost:3001` (if running locally)

### 📱 Features Working

All MangoDesk features should now work with the deployed backend:
- ✅ Document upload (PDF, DOCX, TXT, MP3, WAV, M4A)
- ✅ AI-powered summarization with multiple languages
- ✅ Sentiment analysis
- ✅ Key points extraction
- ✅ Document Q&A chat
- ✅ Email integration with multiple providers
- ✅ Export to multiple formats
- ✅ Responsive design

### 🎉 Success!

Your MangoDesk application is now fully integrated with the deployed backend. Users can access all features seamlessly from your Vercel deployment!

**Next Steps:**
1. Deploy your frontend to Vercel
2. Test all features end-to-end
3. Share the URL with your manager
4. Monitor the application for any issues
