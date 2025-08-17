'use client';

export default function FeaturesSection() {
  const features = [
    {
      title: "File Upload & Processing",
      description: "Support for multiple file formats including PDF, DOCX, TXT, and audio files (MP3, WAV, M4A) with automatic text extraction and transcription."
    },
    {
      title: "AI-Powered Summarization",
      description: "Generate intelligent summaries with customizable modes (Concise/Detailed) and personas (Developer/Manager/Client) for different audiences."
    },
    {
      title: "Audio Transcription",
      description: "Advanced audio transcription using Whisper-large-v3-turbo model for accurate speech-to-text conversion with support for multiple audio formats."
    },
    {
      title: "Sentiment Analysis",
      description: "Comprehensive sentiment analysis with confidence scoring, emotional indicators, and tone descriptors to understand document sentiment."
    },
    {
      title: "Document Q&A Chatbot",
      description: "Interactive chatbot that answers specific questions about your uploaded documents using AI-powered natural language processing."
    },
    {
      title: "Key Points Extraction",
      description: "Automatically identify and extract the most important sentences and phrases from your documents for quick reference."
    },
    {
      title: "Email Integration",
      description: "Send formatted summaries via email using your own SMTP credentials with support for Gmail, Outlook, Yahoo, and custom providers."
    },
    {
      title: "Multi-Language Support",
      description: "Generate summaries and process documents in multiple languages including English, Spanish, French, German, and more."
    },
    {
      title: "Export Functionality",
      description: "Export summaries and key points to RTF format for easy sharing and documentation purposes."
    },
    {
      title: "Real-Time Processing",
      description: "Fast and efficient document processing with real-time feedback and progress indicators for all operations."
    },
    {
      title: "Secure Processing",
      description: "Your documents and credentials are processed securely with no permanent storage and automatic cleanup after processing."
    },
    {
      title: "Responsive Design",
      description: "Fully responsive interface that works seamlessly across desktop, tablet, and mobile devices with an intuitive user experience."
    }
  ];

  return (
    <div className="mt-16 bg-gradient-to-br from-teal-50 to-teal-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-800 mb-4">
            Powerful Features for Document Intelligence
          </h2>
          <p className="text-lg text-teal-600 max-w-2xl mx-auto">
            MangoDesk combines advanced AI technology with intuitive design to transform how you work with documents
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
            >
              <div className="mb-4">
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-teal-100">
                <div className="feature-progress-bg">
                  <div className="feature-progress-fill"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-md">
            <a href="#"><span>MangoDesk</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
