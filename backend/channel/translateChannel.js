const translateChannel = (callGroq) => async (req, res) => {
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
};

module.exports = translateChannel;
