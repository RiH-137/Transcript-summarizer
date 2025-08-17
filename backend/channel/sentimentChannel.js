const sentimentChannel = (callGroq) => async (req, res) => {
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
};

module.exports = sentimentChannel;
