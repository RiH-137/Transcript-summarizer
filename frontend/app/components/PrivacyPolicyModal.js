'use client';

import { useState } from 'react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-50 bg-opacity-90 border-b border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Privacy Policy & Technical Details</h2>
              <p className="text-sm text-blue-700 mt-1">Understanding how AppleDesk protects your data and operates</p>
            </div>
            <button
              onClick={onClose}
              className="text-blue-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            
            {/* Privacy-First Approach */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Privacy-Focused Temporary Storage
              </h3>
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <h4 className="font-semibold text-green-900 mb-3">How We Handle Your Files</h4>
                <div className="space-y-3 text-green-800">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 mt-1">▪</span>
                    <div>
                      <p className="font-medium">Temporary Storage Only</p>
                      <p className="text-sm text-green-700">Files are stored temporarily in our server&apos;s &apos;uploads&apos; directory during processing and automatically deleted immediately after processing completes.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 mt-1">▪</span>
                    <div>
                      <p className="font-medium">No Permanent Storage</p>
                      <p className="text-sm text-green-700">We do not maintain any database or permanent storage of your documents, transcripts, or summaries.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-600 mt-1">▪</span>
                    <div>
                      <p className="font-medium">Session-Based Processing</p>
                      <p className="text-sm text-green-700">Each session is independent, and no data persists between sessions or users.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Nodemailer Integration */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Nodemailer Email Service
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h4 className="font-semibold text-blue-900 mb-3">What is Nodemailer?</h4>
                <div className="space-y-3 text-blue-800">
                  <p className="text-sm">Nodemailer is a secure, industry-standard Node.js module for sending emails programmatically.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">How We Use It</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Send summaries directly to your email</li>
                        <li>• Export processed documents</li>
                        <li>• Deliver key insights and analyses</li>
                        <li>• Share results with team members</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-900 mb-2">Security Features</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• SMTP authentication required</li>
                        <li>• Encrypted email transmission</li>
                        <li>• No email addresses stored</li>
                        <li>• Session-based email sending</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-time Progress Tracking */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Real-time Progress Tracking
              </h3>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
                <h4 className="font-semibold text-purple-900 mb-3">How Progress Tracking Works</h4>
                <div className="space-y-4 text-purple-800">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">File Upload Progress</h5>
                    <p className="text-sm text-purple-700">Real-time upload progress bars show file transfer status using JavaScript FileReader API and server-side progress events.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">AI Processing Status</h5>
                    <p className="text-sm text-purple-700">Live updates during transcription, summarization, and analysis phases using WebSocket-like status polling.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="font-medium text-purple-900 mb-2">Processing Stages</h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">File Upload</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Text Extraction</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">AI Analysis</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Results Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RTF Export Functionality */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                Export to RTF (Rich Text Format)
              </h3>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                <h4 className="font-semibold text-orange-900 mb-3">What is RTF Export?</h4>
                <div className="space-y-4 text-orange-800">
                  <p className="text-sm">RTF (Rich Text Format) is a document file format that preserves formatting and is compatible with most word processors.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h5 className="font-medium text-orange-900 mb-2">Export Features</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Formatted summaries with headings</li>
                        <li>• Bullet points and structured content</li>
                        <li>• Sentiment analysis results</li>
                        <li>• Key points highlighting</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                      <h5 className="font-medium text-orange-900 mb-2">Compatibility</h5>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Microsoft Word</li>
                        <li>• Google Docs</li>
                        <li>• LibreOffice Writer</li>
                        <li>• Most text editors</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <span className="font-medium">Technical Implementation:</span> Server-side RTF generation with proper encoding, formatting preservation, and instant download capability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security & Technical Architecture */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                Data Security & Architecture
              </h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium text-red-900">Security Measures</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• CORS (Cross-Origin Resource Sharing) enabled</li>
                      <li>• File type validation and size limits</li>
                      <li>• Environment variable protection</li>
                      <li>• Secure API key management</li>
                      <li>• HTTPS encryption in production</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium text-red-900">Technical Stack</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Next.js frontend with React</li>
                      <li>• Node.js Express backend</li>
                      <li>• Groq AI for processing</li>
                      <li>• Whisper for transcription</li>
                      <li>• Multer for file handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Support */}
            <section className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Questions About Our Privacy Policy?</h3>
              <p className="text-gray-600 text-sm mb-4">
                We&apos;re committed to transparency about how AppleDesk works and protects your data. If you have any questions about our privacy practices or technical implementation, please contact us.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:101rishidsr@gmail.com" 
                   className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                  Email Support
                </a>
                <a href="https://github.com/RiH-137/Transcript-summarizer" 
                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  View Source Code
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
