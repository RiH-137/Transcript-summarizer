const keyPointsChannel = (callGroq) => async (req, res) => {
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
      // try to parse as JSON
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
};

module.exports = keyPointsChannel;
