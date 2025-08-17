const fs = require('fs');
const path = require('path');


const uploadChannel = (groq) => async (req, res) => {
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
};

module.exports = uploadChannel;
