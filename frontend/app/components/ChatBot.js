'use client';
import { useState } from 'react';

export default function ChatBot({ documentText }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !documentText) return;

    const newQuestion = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const userMessage = { type: 'user', content: newQuestion, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);

    try {
      
        // context
      const conversationHistory = messages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .map(msg => ({
          question: msg.type === 'user' ? msg.content : '',
          answer: msg.type === 'bot' ? msg.content : ''
        }))
        .filter(item => item.question && item.answer);

      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          documentText: documentText,
          conversationHistory: conversationHistory
        })
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = { 
          type: 'bot', 
          content: data.answer, 
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        type: 'bot', 
        content: `Error: ${error.message}`, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  if (!documentText) {
    return (
      <div className="section-card">
        <h3 className="font-medium text-gray-800 mb-3">Document Q&A</h3>
        <p className="text-gray-500 text-sm">Upload a document to start asking questions about its content.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Document Q&A...</h3>
          {messages.length > 0 && (
            <span className="badge-gray">
              {messages.length} messages
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Chat Messages */}
        <div className="mb-4 max-h-80 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">Ask me anything about your document!</p>
                <p className="text-xs mt-1 text-gray-400">Try: "What are the key points?" or "Summarize the main ideas"</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`chat-message ${message.type === 'user' ? 'user ml-4' : 'bot mr-4'}`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-white' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-typing">
                  <div className="flex items-center space-x-2">
                    <div className="loading-dots flex space-x-1">
                      <div style={{ animationDelay: '0.0s' }}></div>
                      <div style={{ animationDelay: '0.1s' }}></div>
                      <div style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* input area*/}
          <div className="border-t pt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                placeholder="Ask a question about your document..."
                className="input-field-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="btn-primary-sm"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
            
            {messages.length > 0 && (
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={clearChat}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear chat
                </button>
                <div className="text-xs text-gray-400">
                  Press Enter to send
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
