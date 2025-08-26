'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LandingPage({ onNavigateToApp }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Features data
  const features = [
    {
      title: "AI-Powered Transcription",
      description: "Convert audio to text with advanced AI technology for accurate transcription.",
     
    },
    {
      title: "Smart Summarization", 
      description: "Get intelligent summaries of your meetings and conversations instantly.",
      
    },
    {
      title: "Multi-Language Support",
      description: "Process content in multiple languages with seamless translation capabilities.",
      
    },
    {
      title: "Real-time Processing",
      description: "Experience fast, real-time processing of your audio content.",
      
    },
    {
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security measures.",
      
    },
    {
      title: "Export Options",
      description: "Export your transcripts and summaries in various formats.",
      
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(65,124,126,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(65,124,126,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="text-center max-w-6xl mx-auto relative z-10">
          {/* Main Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900">
              Apple<span className="text-[#417C7E]">Desk</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
              Transform your audio content into intelligent insights with AI-powered transcription and summarization
            </p>
          </motion.div>

          {/* Call-to-Action Circle */}
          <motion.div
            className="flex justify-center mb-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={onNavigateToApp}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-32 h-32 rounded-full bg-[#417C7E] flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-[#417C7E]/20 transition-all duration-300">
                <svg 
                  className="w-10 h-10 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-[#417C7E] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Features Preview Tags */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 text-sm"
          >
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200">AI Transcription</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200">Smart Summaries</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200">Multi-Language</span>
            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200">Real-time Processing</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-4 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Powerful <span className="text-[#417C7E]">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your audio content into actionable insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="section-card-lg hover:shadow-lg transition-all duration-300 group hover:border-[#417C7E]/20"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section 
        className="py-20 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to get started?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust AppleDesk for their audio processing needs.
            </p>
            <motion.button
              onClick={onNavigateToApp}
              className="btn-primary-lg text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch AppleDesk
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 AppleDesk. Built with ❤️ for better audio processing.
          </p>
        </div>
      </footer>
    </div>
  );
}
