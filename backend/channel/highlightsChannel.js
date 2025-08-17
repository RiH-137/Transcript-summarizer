const highlightsChannel = (callGroq) => async (req, res) => {
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
};

module.exports = highlightsChannel;
