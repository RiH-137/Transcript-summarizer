# AppleDesk - AI-Powered Transcript Summarizer

## 🌟 Live Demo
🔗 **[https://transcript-summarizer-eight.vercel.app/](https://transcript-summarizer-eight.vercel.app/)**

## 📖 Overview

AppleDesk is a comprehensive AI-powered transcript summarization platform that transforms audio files and text documents into concise, detailed summaries with multiple persona perspectives. Built with modern web technologies and powered by advanced AI models.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API    │    │   AI Services   │
│   (Next.js)     │◄──►│   (Express.js)   │◄──►│   (Groq AI)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐            ┌─────▼─────┐          ┌─────▼─────┐
    │ Vercel  │            │  Render   │          │ Whisper   │
    │Hosting  │            │ Hosting   │          │ Large v3  │
    └─────────┘            └───────────┘          └───────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **Deployment**: Vercel
- **Environment**: Node.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Upload**: Multer
- **CORS**: Cross-Origin Resource Sharing
- **Environment**: dotenv
- **Deployment**: Render

### AI & Machine Learning
- **AI Provider**: [Groq](https://groq.com/)
- **Model**: Llama-3.1-8B-Instant
- **Audio Transcription**: Whisper Large v3 Turbo
- **Processing**: Real-time AI inference

### Additional Services
- **Email**: Nodemailer (SMTP integration)
- **File Processing**: PDF, DOCX, ODT, MP3, WAV, M4A
- **Export**: RTF format support

## 📁 Project Structure

```
AppleDesk/
├── frontend/                          # Next.js Frontend Application
│   ├── app/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Header.js             # Application header
│   │   │   └── FeaturesSection.js    # Features showcase
│   │   ├── config/                   # Configuration files
│   │   │   ├── api.js               # API endpoints configuration
│   │   │   └── healthCheck.js       # Backend health monitoring
│   │   ├── utils/                   # Utility functions
│   │   │   └── backendTest.js       # Backend integration testing
│   │   ├── api/                     # Next.js API routes
│   │   │   └── transcribe/          # Transcription endpoints
│   │   └── page.js                  # Main application page
│   ├── public/                      # Static assets
│   ├── .env.local                   # Environment variables (local)
│   ├── .env.example                 # Environment template
│   ├── vercel.json                  # Vercel deployment config
│   ├── deploy.sh                    # Deployment script
│   └── package.json                 # Dependencies and scripts
│
├── backend/                         # Express.js Backend API
│   ├── channel/                     # Modular API endpoints
│   │   ├── healthChannel.js        # Health check endpoint
│   │   ├── uploadChannel.js        # File upload handling
│   │   ├── summarizeChannel.js     # Text summarization
│   │   ├── sentimentChannel.js     # Sentiment analysis
│   │   ├── translateChannel.js     # Language translation
│   │   ├── highlightsChannel.js    # Key highlights extraction
│   │   ├── keyPointsChannel.js     # Key points identification
│   │   ├── emailChannels.js        # Email integration
│   │   ├── exportChannel.js        # Document export
│   │   └── chatChannel.js          # Q&A chatbot
│   ├── uploads/                     # Temporary file storage
│   ├── server.js                    # Main server file
│   ├── .env                        # Environment variables
│   └── package.json                # Dependencies and scripts
│
├── InboundSampleRecording.mp3       # Sample audio file
├── sample-meeting-transcript.txt    # Sample transcript
└── README.md                        # This documentation
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Groq API key ([Get one here](https://console.groq.com/))

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your environment variables to .env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
NODE_ENV=development
```

#### Environment Variables (Backend)
```env
GROQ_API_KEY=your_groq_api_key
PORT=3001
NODE_ENV=development
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_API_BASE_URL_DEV=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=https://transcript-summarizer-backend-ipi6.onrender.com
```

#### Environment Variables (Frontend)
```env
NEXT_PUBLIC_API_BASE_URL_DEV=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
NODE_ENV=development
```

### 3. Running the Application

#### Development Mode

```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

#### Production Mode

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 🔧 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Backend health check |
| POST | `/upload` | File upload and transcription |
| POST | `/summarize` | Text summarization with personas |
| POST | `/sentiment` | Sentiment analysis |
| POST | `/translate` | Language translation |
| POST | `/highlights` | Key highlights extraction |
| POST | `/extract-key-points` | Key points identification |
| POST | `/export-docx` | Export to RTF format |
| POST | `/send-email-with-auth` | Email integration |
| POST | `/chat` | Q&A chatbot |

### API Configuration

The API configuration is managed through [`app/config/api.js`](frontend/app/config/api.js):

```javascript
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_API_BASE_URL 
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV,
  ENDPOINTS: {
    HEALTH: '/health',
    UPLOAD: '/upload',
    SUMMARIZE: '/summarize',
    // ... other endpoints
  }
};
```

## 🤖 AI Models & Processing

### Groq AI Integration

**Model Used**: `llama-3.1-8b-instant`
- **Temperature**: 0.1 (for consistent, focused responses)
- **Max Tokens**: 2048
- **Top P**: 1
- **Stream**: false

### Audio Transcription

**Model**: Whisper Large v3 Turbo
- Supports: MP3, WAV, M4A formats
- Max file size: 100MB
- Real-time processing

### Processing Flow

```
Audio/Text Input → Transcription → AI Processing → Multiple Outputs
                                       ↓
                     ┌─────────────────────────────────────┐
                     │  • Summarization (3 personas)      │
                     │  • Sentiment Analysis              │
                     │  • Key Points Extraction           │
                     │  • Language Translation            │
                     │  • Email Integration               │
                     │  • Export Functionality            │
                     └─────────────────────────────────────┘
```

## 🎭 Features & Capabilities

### 1. **Multi-Persona Summarization**
- **Developer**: Technical focus, code implementations
- **Manager**: Decisions, deadlines, action items
- **Client**: Simple language, outcomes-focused

### 2. **File Support**
- **Text**: TXT, PDF, DOCX, ODT
- **Audio**: MP3, WAV, M4A
- **Processing**: Real-time with progress indicators

### 3. **AI-Powered Analysis**
- Sentiment analysis with confidence levels
- Key points extraction
- Automatic highlights identification
- Multi-language support

### 4. **Export & Sharing**
- RTF export functionality
- Email integration with SMTP
- Secure processing (no permanent storage)

### 5. **Interactive Q&A**
- Document-based chatbot via [`chatChannel.js`](backend/channel/chatChannel.js)
- Context-aware responses
- Real-time interaction

## 🌐 Deployment

### Frontend Deployment (Vercel)

The frontend is deployed on Vercel with the configuration in [`vercel.json`](frontend/vercel.json):

```json
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/next" }],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "https://transcript-summarizer-backend-ipi6.onrender.com"
  }
}
```

**Deployment Script**: [`deploy.sh`](frontend/deploy.sh)
```bash
#!/bin/bash
export NEXT_PUBLIC_API_BASE_URL=https://transcript-summarizer-backend-ipi6.onrender.com
export NODE_ENV=production
npm run build
npx vercel --prod
```

### Backend Deployment (Render)

Backend is deployed on Render with the following configuration:
- **URL**: https://transcript-summarizer-backend-ipi6.onrender.com
- **Environment**: Production
- **Auto-deploy**: Connected to GitHub repository

## 🔍 Testing & Development

### Backend Testing

The project includes comprehensive testing utilities in [`app/utils/backendTest.js`](frontend/app/utils/backendTest.js):

```javascript
// Test all endpoints
const results = await BackendTest.testAllEndpoints();

// Quick health check
const health = await quickBackendTest();
```

### Health Monitoring

Health checks are implemented via [`app/config/healthCheck.js`](frontend/app/config/healthCheck.js) and [`channel/healthChannel.js`](backend/channel/healthChannel.js).

## 📊 Architecture Decisions

### 1. **Modular Backend Design**
- Each feature is isolated in separate channel files
- Promotes maintainability and scalability
- Easy to extend with new functionality

### 2. **Next.js App Router**
- Modern React framework with server-side rendering
- API routes for seamless frontend-backend integration
- Optimized for performance and SEO

### 3. **Groq AI Choice**
- Fast inference times
- Cost-effective for high-volume processing
- Reliable API with good documentation

### 4. **Environment-Based Configuration**
- Separate development and production environments
- Secure API key management
- Easy deployment across platforms

## 🔐 Security Considerations

- **File Validation**: Strict file type checking
- **Size Limits**: 100MB maximum file size
- **Temporary Storage**: Files automatically cleaned up
- **CORS**: Properly configured cross-origin requests
- **Environment Variables**: Secure API key storage

## 🚦 Getting Started (Quick Start)

1. **Clone the repository**
2. **Set up environment variables** (both frontend and backend)
3. **Install dependencies** in both directories
4. **Start backend server** (`npm run dev` in backend/)
5. **Start frontend server** (`npm run dev` in frontend/)
6. **Visit** `http://localhost:3000`

## 🤝 Contributing

This project follows a modular architecture making it easy to contribute:

1. **Backend**: Add new features by creating channel files
2. **Frontend**: Add components in the components directory
3. **API**: Extend endpoints in the config directory
4. **Testing**: Use the built-in testing utilities

## 📝 Sample Data

The project includes sample files for testing:
- [`InboundSampleRecording.mp3`](InboundSampleRecording.mp3) - Sample audio file
- [`sample-meeting-transcript.txt`](sample-meeting-transcript.txt) - Sample meeting transcript

## 🔗 Links & Resources

- **Live Application**: https://transcript-summarizer-eight.vercel.app/
- **Backend API**: https://transcript-summarizer-backend-ipi6.onrender.com
- **GitHub Repository**: https://github.com/RiH-137/Transcript-summarizer
- **Groq Console**: https://console.groq.com/
- **Vercel Dashboard**: https://vercel.com/
- **Render Dashboard**: https://render.com/

---



*For questions, issues, or contributions, please mail me at [email](101rishidsr@gmail.com).*