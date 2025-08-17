const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 3001;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// creating uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// multer configuration for file uploads
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

// helper function to call GROQ API
async function callGroq(messages, model = 'llama3-8b-8192', maxTokens = 500) {
  try {
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: model,
      temperature: 0.3,
      max_tokens: maxTokens,
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

// Routes -->

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'MangoDesk Backend', timestamp: new Date().toISOString() });
});

// file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let extractedText = '';

    try {
      switch (fileExtension) {
        case '.txt':
          extractedText = fs.readFileSync(filePath, 'utf8');
          break;
        
        case '.pdf':
          const pdfParse = require('pdf-parse');
          const pdfBuffer = fs.readFileSync(filePath);
          const pdfData = await pdfParse(pdfBuffer);
          extractedText = pdfData.text;
          break;
        
        case '.docx':
          const mammoth = require('mammoth');
          const docxResult = await mammoth.extractRawText({ path: filePath });
          extractedText = docxResult.value;
          break;
        
        case '.odt':
          extractedText = 'ODT file processing not fully implemented in this demo';
          break;
        
        case '.mp3':
        case '.wav':
        case '.m4a':
          try {
            console.log('Transcribing audio file:', req.file.originalname);
            const audioBuffer = fs.readFileSync(filePath);
            
            const transcription = await groq.audio.transcriptions.create({
              file: fs.createReadStream(filePath),
              model: 'whisper-large-v3-turbo',
              language: 'en', 
              response_format: 'json',
              temperature: 0.0
            });
            
            extractedText = transcription.text;
            console.log('Audio transcription completed successfully');
          } catch (audioError) {
            console.error('Audio transcription error:', audioError);
            extractedText = `Error transcribing audio file: ${audioError.message}`;
          }
          break;
        
        default:
          extractedText = 'Unsupported file type';
      }
    } catch (extractError) {
      console.error('Text extraction error:', extractError);
      extractedText = 'Error extracting text from file';
    }

    // clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      filename: req.file.originalname,
      text: extractedText,
      preview: extractedText.slice(0, 500) + (extractedText.length > 500 ? '...' : ''),
      wordCount: extractedText.split(/\s+/).filter(word => word.length > 0).length
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed: ' + error.message });
  }
});

// summarize text
app.post('/summarize', async (req, res) => {
  try {
    const { text, prompt, mode, persona, language, sentiment } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for summarization' });
    }

    // building the system prompt
    let systemPrompt = 'You are an expert summarizer. ';
    
    switch (persona) {
      case 'Developer':
        systemPrompt += 'Focus on technical details, code, implementations, and development decisions. ';
        break;
      case 'Manager':
        systemPrompt += 'Focus on decisions, blockers, deadlines, team dynamics, and actionable items. ';
        break;
      case 'Client':
        systemPrompt += 'Use simple language, avoid jargon, focus on outcomes and benefits. ';
        break;
    }

    if (mode === 'Detailed') {
      systemPrompt += 'Provide a comprehensive, detailed summary with sections and bullet points. ';
    } else {
      systemPrompt += 'Provide a concise, brief summary highlighting only the key points. ';
    }

    if (language && language !== 'English') {
      systemPrompt += `Provide the summary in ${language}. `;
    }

    const userPrompt = prompt || 'Please summarize the following transcript:';

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${userPrompt}\n\nTranscript:\n${text}` }
    ];

    const summary = await callGroq(messages);

    // Prepare response object
    const response = {
      success: true,
      summary: summary,
      metadata: {
        mode,
        persona,
        language,
        inputLength: text.length,
        summaryLength: summary.length
      }
    };

    // sentiment analysis with toggle
    if (sentiment) {
      try {
        const sentimentMessages = [
          {
            role: 'system',
            content: 'You are a sentiment analysis expert. Analyze the overall sentiment and tone of the given text. Provide a brief analysis including: 1) Overall sentiment (positive/negative/neutral), 2) Confidence level (high/medium/low), 3) Key emotional indicators, 4) Tone descriptors. 5) Display the result in beautiful UI with bullet points only.'
          },
          {
            role: 'user',
            content: `Please analyze the sentiment of this text:\n\n${text}`
          }
        ];

        const sentimentAnalysis = await callGroq(sentimentMessages);

        // sentiment classification
        const sentimentMatch = sentimentAnalysis.toLowerCase().match(/(positive|negative|neutral)/);
        const overallSentiment = sentimentMatch ? sentimentMatch[1] : 'neutral';

        response.sentimentData = {
          overall: overallSentiment,
          analysis: sentimentAnalysis,
          confidence: 'medium'
        };
      } catch (sentimentError) {
        console.error('Sentiment analysis error in summarize:', sentimentError);
        response.sentimentData = {
          overall: 'neutral',
          analysis: 'Sentiment analysis failed',
          confidence: 'low'
        };
      }
    }

    res.json(response);

  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ error: 'Summarization failed: ' + error.message });
  }
});

// sentiment analysis
app.post('/sentiment', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for sentiment analysis' });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a sentiment analysis expert. Analyze the overall sentiment and tone of the given text. Provide a brief analysis including: 1) Overall sentiment (positive/negative/neutral), 2) Confidence level (high/medium/low), 3) Key emotional indicators, 4) Tone descriptors.'
      },
      {
        role: 'user',
        content: `Please analyze the sentiment of this text:\n\n${text}`
      }
    ];

    const analysis = await callGroq(messages);

    // sentiment classification
    const sentimentMatch = analysis.toLowerCase().match(/(positive|negative|neutral)/);
    const overallSentiment = sentimentMatch ? sentimentMatch[1] : 'neutral';

    res.json({
      success: true,
      sentiment: overallSentiment,
      analysis: analysis,
      confidence: 'medium'
    });

  } catch (error) {
    console.error('Sentiment analysis error:', error);
    res.status(500).json({ error: 'Sentiment analysis failed: ' + error.message });
  }
});

// translation
app.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for translation' });
    }

    if (!targetLanguage) {
      return res.status(400).json({ error: 'Target language is required' });
    }

    const messages = [
      {
        role: 'system',
        content: `You are a professional translator. Translate the given text accurately to ${targetLanguage}. Maintain the original meaning, tone, and context. If the source language is not ${sourceLanguage || 'English'}, first identify the source language.`
      },
      {
        role: 'user',
        content: `Please translate this text to ${targetLanguage}:\n\n${text}`
      }
    ];

    const translation = await callGroq(messages);

    res.json({
      success: true,
      translatedText: translation,
      sourceLanguage: sourceLanguage || 'auto-detected',
      targetLanguage: targetLanguage
    });

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed: ' + error.message });
  }
});

// key points highlighting
app.post('/highlights', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required for highlights extraction' });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert at extracting key highlights from text. Extract the most important points, decisions, action items, and quotes. Format your response as JSON with the following structure: {"keyPoints": ["point1", "point2"], "decisions": ["decision1"], "actionItems": ["action1"], "quotes": ["quote1"], "openQuestions": ["question1"]}'
      },
      {
        role: 'user',
        content: `Extract highlights from this text:\n\n${text}`
      }
    ];

    const highlightsText = await callGroq(messages);
    
    // try to parse as JSON
    let highlights;
    try {
      highlights = JSON.parse(highlightsText);
    } catch {

      highlights = {
        keyPoints: highlightsText.split('\n').filter(line => line.trim().length > 0).slice(0, 5),
        decisions: [],
        actionItems: [],
        quotes: [],
        openQuestions: []
      };
    }

    res.json({
      success: true,
      highlights: highlights,
      rawResponse: highlightsText
    });

  } catch (error) {
    console.error('Highlights extraction error:', error);
    res.status(500).json({ error: 'Highlights extraction failed: ' + error.message });
  }
});

// Send email 
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, body, template } = req.body;
    
    if (!to || !body) {
      return res.status(400).json({ error: 'Email recipient and body are required' });
    }

    
    console.log('Email would be sent:', { to, subject, template, bodyLength: body.length });
    
    res.json({
      success: true,
      message: 'Email queued successfully (demo mode)',
      emailId: 'demo-' + Date.now()
    });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Email sending failed: ' + error.message });
  }
});

// extavting key points
app.post('/extract-key-points', async (req, res) => {
  try {
    const { originalText, summary } = req.body;
    
    if (!originalText || !summary) {
      return res.status(400).json({ error: 'Both original text and summary are required' });
    }

    const messages = [
      {
        role: 'system',
        content: 'You are an expert text analyst. Your job is to identify the key sentences or phrases from the original text that were most important for creating the given summary. Return a JSON array of the most relevant sentences or phrases (5-8 items max). Each item should be a string containing a key sentence or phrase from the original text.'
      },
      {
        role: 'user',
        content: `Original text:\n${originalText}\n\nSummary created:\n${summary}\n\nPlease identify the key sentences or phrases from the original text that were most important for creating this summary. Return only a JSON array of strings.`
      }
    ];

    const response = await callGroq(messages);
    
    try {
      // tring parse as Json
      const keyPoints = JSON.parse(response);
      if (Array.isArray(keyPoints)) {
        res.json({ success: true, keyPoints: keyPoints.slice(0, 8) });
      } else {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      // fallback
      const lines = response.split('\n').filter(line => 
        line.trim().length > 20 && 
        (line.includes('-') || line.includes('.') || line.includes('•'))
      ).slice(0, 8);
      res.json({ success: true, keyPoints: lines });
    }

  } catch (error) {
    console.error('Key points extraction error:', error);
    res.status(500).json({ error: 'Key points extraction failed: ' + error.message });
  }
});

// export DOCX
app.post('/export-docx', async (req, res) => {
  try {
    const { summary, keyPoints, originalText } = req.body;
    
    if (!summary) {
      return res.status(400).json({ error: 'Summary is required for export' });
    }

    // word rtx formate
    const rtfContent = `{\\rtf1\\ansi\\deff0 
{\\fonttbl {\\f0\\fswiss Arial;}{\\f1\\fmodern Courier New;}}
{\\colortbl;\\red65\\green124\\blue126;\\red0\\green0\\blue0;}
\\f0\\fs24

{\\cf1\\b\\fs36 SUMMARY REPORT\\par}
\\par
{\\b Generated on: ${new Date().toLocaleDateString()}\\par}
\\par\\par

{\\cf1\\b\\fs28 SUMMARY\\par}
\\par
${summary.replace(/\n/g, '\\par ')}
\\par\\par

{\\cf1\\b\\fs28 KEY POINTS\\par}
\\par
${keyPoints && keyPoints.length > 0 ? 
  keyPoints.map((point, i) => `${i + 1}. ${point}\\par `).join('') : 
  'No key points available\\par '
}

\\par
{\\i Generated by MangoDesk}
}`;

    res.setHeader('Content-Type', 'application/rtf');
    res.setHeader('Content-Disposition', 'attachment; filename="summary.rtf"');
    res.send(rtfContent);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed: ' + error.message });
  }
});

// send email with uses own SMTP credentials --> nodemailer
app.post('/send-email-with-auth', async (req, res) => {
  try {
    console.log('Email endpoint called with body:', req.body);
    const { senderEmail, senderPassword, recipientEmail, subject, body, provider } = req.body;
    
    if (!senderEmail || !senderPassword || !recipientEmail || !body) {
      return res.status(400).json({ error: 'All email fields are required' });
    }

    console.log('Creating SMTP configuration for provider:', provider);

    // defining smtp settings
    const smtpSettings = {
      gmail: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
      },
      outlook: {
        service: 'hotmail',
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
      },
      yahoo: {
        service: 'yahoo',
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure: false,
      },
      custom: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
      }
    };

    const config = smtpSettings[provider] || smtpSettings.gmail;
    console.log('SMTP config:', config);

    // creating transporter with user's credentials
    const transporter = nodemailer.createTransport({
      ...config,
      auth: {
        user: senderEmail,
        pass: senderPassword
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Transporter created, verifying...');
    // building and verifying SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP verification successful');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return res.status(400).json({ 
        error: 'Failed to authenticate with email provider. Please check your credentials. For Gmail, make sure to use App Password instead of regular password.' 
      });
    }

    // email
    const mailOptions = {
      from: {
        name: 'MangoDesk Summary',
        address: senderEmail
      },
      to: recipientEmail,
      subject: subject || 'Meeting Summary - MangoDesk',
      text: body,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #417C7E, #5A9B9E); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">MangoDesk Summary...</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e1e5e9; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #417C7E; margin-bottom: 20px;">
              <pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; white-space: pre-wrap; line-height: 1.6; color: #333; margin: 0;">${body}</pre>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e5e9; color: #6c757d; font-size: 14px;">
              <p style="margin: 5px 0;">Generated by <strong>MangoDesk</strong></p>
              <p style="margin: 5px 0;">${new Date().toLocaleDateString()} •  ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      `
    };

    // send email
    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', error);
    let errorMessage = 'Failed to send email';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your email and password. For Gmail, use App Password instead of regular password.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Email service not found. Please check your email provider settings.';
    } else if (error.responseCode === 535) {
      errorMessage = 'Invalid credentials. For Gmail, make sure 2-Step Verification is enabled and use App Password.';
    } else {
      errorMessage = error.message || 'Failed to send email';
    }
    
    res.status(500).json({ error: errorMessage });
  }
});

// chatbot 
app.post('/chat', async (req, res) => {
  try {
    const { question, documentText, conversationHistory } = req.body;
    
    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is required for Q&A' });
    }

    // building conversation context
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = '\n\nPrevious conversation:\n' + 
        conversationHistory.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n');
    }

    const messages = [
      {
        role: 'system',
        content: `You are an intelligent document assistant. Your job is to answer questions based on the provided document content. 

            Guidelines:
            - Answer questions directly and concisely based on the document content
            - If the answer is not in the document, say so clearly
            - Provide specific quotes or references when possible
            - If asked about topics not covered in the document, explain that the information is not available
            - Maintain a helpful and professional tone
            - Keep answers focused and relevant

            The document you're analyzing contains the following content:`
      },
      {
        role: 'user',
        content: `Document content:\n${documentText}\n\n${conversationContext}\n\nNew question: ${question}`
      }
    ];

    const answer = await callGroq(messages);

    res.json({
      success: true,
      answer: answer,
      question: question,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process question: ' + error.message });
  }
});

// error handling middleware
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

// start server
app.listen(PORT, () => {
  console.log(`Bro, MangoDesk Backend running on port ${PORT}`);
  console.log(`Good, Environment: ${process.env.NODE_ENV}`);
  console.log(`yo!!!, GROQ API Key configured: ${!!process.env.GROQ_API_KEY}`);
});

module.exports = app;
