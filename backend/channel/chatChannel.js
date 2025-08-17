const chatChannel = (callGroq) => async (req, res) => {
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
};

module.exports = chatChannel;
