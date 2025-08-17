const summarizeChannel = (callGroq) => async (req, res) => {
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
};

module.exports = summarizeChannel;
