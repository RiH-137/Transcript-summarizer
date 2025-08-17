const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Groq = require('groq-sdk');

// Import channel modules
const healthChannel = require('./channel/healthChannel');
const uploadChannel = require('./channel/uploadChannel');
const summarizeChannel = require('./channel/summarizeChannel');
const sentimentChannel = require('./channel/sentimentChannel');
const translateChannel = require('./channel/translateChannel');
const highlightsChannel = require('./channel/highlightsChannel');
const keyPointsChannel = require('./channel/keyPointsChannel');
const emailChannels = require('./channel/emailChannels');
const exportChannel = require('./channel/exportChannel');
const chatChannel = require('./channel/chatChannel');

const app = express();
const PORT = process.env.PORT || 3001;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Creating uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /\.(txt|pdf|docx|odt|mp3|wav|m4a)$/i;
    if (allowedTypes.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Helper function to call GROQ API
async function callGroq(messages) {
  try {
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
      temperature: 0.1,
      max_tokens: 2048,
      top_p: 1,
      stream: false,
      stop: null
    });
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('GROQ API Error:', error);
    throw new Error('AI processing failed: ' + error.message);
  }
}

// Routes using channel modules

// Health check
app.get('/health', healthChannel);

// File upload
app.post('/upload', upload.single('file'), uploadChannel(groq));

// Text summarization
app.post('/summarize', summarizeChannel(callGroq));

// Sentiment analysis
app.post('/sentiment', sentimentChannel(callGroq));

// Translation
app.post('/translate', translateChannel(callGroq));

// Key points highlighting
app.post('/highlights', highlightsChannel(callGroq));

// Send email (demo)
app.post('/send-email', emailChannels.sendEmail);

// Extract key points
app.post('/extract-key-points', keyPointsChannel(callGroq));

// Export to DOCX/RTF
app.post('/export-docx', exportChannel);

// Send email with authentication
app.post('/send-email-with-auth', emailChannels.sendEmailWithAuth);

// Chatbot for document Q&A
app.post('/chat', chatChannel(callGroq));

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`MangoDesk Backend running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('GROQ API Key configured:', !!process.env.GROQ_API_KEY);
});
