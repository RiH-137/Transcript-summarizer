'use client';

import { useState } from 'react';

export default function HelpModal({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('getting-started');

  if (!isOpen) return null;

  const helpSections = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome to AppleDesk!</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Step 1: Upload Your Content</h4>
              <p className="text-blue-800 text-sm">Upload text files (PDF, DOCX, TXT) or audio files (MP3, WAV, M4A) up to 100MB.</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-green-900 mb-2">Step 2: Choose Your Settings</h4>
              <p className="text-green-800 text-sm">Select summarization mode (Concise/Detailed) and persona (Developer/Manager/Client).</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Step 3: Generate & Analyze</h4>
              <p className="text-purple-800 text-sm">Get AI-powered summaries, sentiment analysis, and key insights instantly.</p>
            </div>
          </div>
        </div>
      )
    },
    'file-upload': {
      title: 'File Upload & Processing',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Supported File Formats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Text Files</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center"><span className="mr-2">•</span>PDF documents</li>
                <li className="flex items-center"><span className="mr-2">•</span>DOCX files</li>
                <li className="flex items-center"><span className="mr-2">•</span>ODT documents</li>
                <li className="flex items-center"><span className="mr-2">•</span>Plain text (.txt)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Audio Files</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center"><span className="mr-2">•</span>MP3 audio files</li>
                <li className="flex items-center"><span className="mr-2">•</span>WAV recordings</li>
                <li className="flex items-center"><span className="mr-2">•</span>M4A files</li>
                <li className="flex items-center"><span className="mr-2">•</span>Max size: 100MB</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Processing Tips</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Audio files are automatically transcribed using Whisper AI</li>
              <li>• Processing time depends on file size and content</li>
              <li>• Files are temporarily stored and automatically deleted</li>
            </ul>
          </div>
        </div>
      )
    },
    'ai-features': {
      title: 'AI Features',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Capabilities</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-3 pr-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Smart Summarization</h4>
              <p className="text-sm text-gray-700 mb-3">Generate concise or detailed summaries tailored to different personas:</p>
              <div className="ml-4 space-y-2">
                <div className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Developer:</span>
                  <span className="text-sm text-gray-600">Technical focus, code implementations</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Manager:</span>
                  <span className="text-sm text-gray-600">Decisions, deadlines, action items</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-900 mr-2">Client:</span>
                  <span className="text-sm text-gray-600">Simple language, outcomes-focused</span>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Sentiment Analysis</h4>
              <p className="text-sm text-gray-700">Comprehensive emotional analysis with confidence scoring, tone descriptors, and key indicators.</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 py-3 pr-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Key Points Extraction</h4>
              <p className="text-sm text-gray-700">Automatically identify and extract the most important points, decisions, and action items.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 py-3 pr-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Q&A</h4>
              <p className="text-sm text-gray-700">Chat with your documents using our AI-powered chatbot for specific questions and insights.</p>
            </div>
          </div>
        </div>
      )
    },
    'customization': {
      title: 'Customization Options',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Experience</h3>
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-3">Summarization Modes</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <div>
                    <p className="font-medium text-indigo-900">Concise Mode</p>
                    <p className="text-sm text-indigo-700">Brief summaries highlighting only key points</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-600 mt-1">■</span>
                  <div>
                    <p className="font-medium text-indigo-900">Detailed Mode</p>
                    <p className="text-sm text-indigo-700">Comprehensive summaries with sections and bullet points</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-900 mb-3">Language Support</h4>
              <p className="text-sm text-teal-700 mb-3">Generate summaries in multiple languages:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full border border-teal-300">English</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full border border-teal-300">Spanish</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full border border-teal-300">French</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full border border-teal-300">German</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full border border-teal-300">And more...</span>
              </div>
            </div>
            
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg">
              <h4 className="font-semibold text-rose-900 mb-3">Export Options</h4>
              <ul className="text-sm text-rose-700 space-y-2">
                <li className="flex items-center"><span className="mr-2">•</span>RTF format for word processors</li>
                <li className="flex items-center"><span className="mr-2">•</span>Email integration with SMTP</li>
                <li className="flex items-center"><span className="mr-2">•</span>Copy to clipboard functionality</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Issues & Solutions</h3>
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-red-900 mb-2">Upload Failed</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Check file size (max 100MB)</li>
                <li>• Ensure supported format (PDF, DOCX, TXT, MP3, WAV, M4A)</li>
                <li>• Try refreshing the page</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Processing Takes Too Long</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Large files require more processing time</li>
                <li>• Audio transcription can take 2-5 minutes</li>
                <li>• Check your internet connection</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Poor Quality Results</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Ensure clear audio quality for transcription</li>
                <li>• Try different persona settings</li>
                <li>• Use detailed mode for comprehensive analysis</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Need More Help?</h4>
              <p className="text-sm text-blue-700 mb-2">Contact our support team:</p>
              <div className="space-y-1">
                <a href="mailto:101rishidsr@gmail.com" className="text-blue-600 hover:text-blue-800 text-sm block">Email Support</a>
                <a href="https://github.com/RiH-137/Transcript-summarizer" className="text-blue-600 hover:text-blue-800 text-sm block">Report Issues</a>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'api-reference': {
      title: 'API Reference',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Developer Resources</h3>
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Core Endpoints</h4>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-sans">POST</span>
                  <span className="text-gray-700">/upload</span>
                  <span className="text-gray-500 font-sans">- File upload & transcription</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-sans">POST</span>
                  <span className="text-gray-700">/summarize</span>
                  <span className="text-gray-500 font-sans">- Text summarization</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-sans">POST</span>
                  <span className="text-gray-700">/sentiment</span>
                  <span className="text-gray-500 font-sans">- Sentiment analysis</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white rounded border">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-sans">POST</span>
                  <span className="text-gray-700">/chat</span>
                  <span className="text-gray-500 font-sans">- Q&A chatbot</span>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-3">AI Models Used</h4>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li><span className="font-medium">Groq AI:</span> Llama3-8B-8192 for text processing</li>
                <li><span className="font-medium">Whisper:</span> Large v3 Turbo for audio transcription</li>
                <li><span className="font-medium">Temperature:</span> 0.1 for consistent responses</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Documentation Links</h4>
              <div className="space-y-2">
                <a href="https://github.com/RiH-137/Transcript-summarizer/blob/master/README.md" 
                   className="text-green-600 hover:text-green-800 text-sm block">Full Documentation</a>
                <a href="https://console.groq.com/playground" 
                   className="text-green-600 hover:text-green-800 text-sm block">Groq API Playground</a>
                <a href="https://github.com/RiH-137/Transcript-summarizer" 
                   className="text-green-600 hover:text-green-800 text-sm block">Source Code</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex overflow-hidden border border-gray-200">
        {/* Sidebar Navigation */}
        <div className="w-72 bg-gray-50 bg-opacity-90 backdrop-blur-sm border-r border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Help Center</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-1">
            {Object.entries(helpSections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  activeSection === key
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span className="text-base font-medium">{section.icon}</span>
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-xs text-blue-700 mb-2 font-medium">Need more help?</p>
              <a href="mailto:101rishidsr@gmail.com" 
                 className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
        
        {/* Content Area fetch */}
        <div className="flex-1 p-8 overflow-y-auto bg-white bg-opacity-95">
          <div className="max-w-4xl">
            {helpSections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
}
