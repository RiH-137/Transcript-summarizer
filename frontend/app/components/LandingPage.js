'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function LandingPage({ onNavigateToApp }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  const sliderWidth = 320;
  const handleWidth = 56;
  const maxDrag = sliderWidth - handleWidth;
  const x = useMotionValue(0);
  const fillWidth = useTransform(x, [0, maxDrag], [handleWidth, sliderWidth]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const normalized = Math.min(Math.max(latest / maxDrag, 0), 1);
      setDragProgress(normalized);
    });

    return () => unsubscribe();
  }, [x, maxDrag]);

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
        className="min-h-screen flex items-center justify-center px-4 bg-gray-100 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gray-200/30" />
        
        <div className="text-center max-w-6xl mx-auto relative z-10">
          {/* Main Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900">
              Apple<span className="text-gray-900">Desk</span>
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
              <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-[#1f2937]/20 transition-all duration-300">
                <svg 
                  className="w-10 h-10 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-gray-800 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
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
              Powerful <span className="text-gray-900">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your audio content into actionable insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="section-card-lg hover:shadow-lg transition-all duration-300 group hover:border-gray-700/20"
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

            <div className="flex justify-center mb-4">
              <motion.div
                className="relative w-80 h-16 rounded-full border-2 border-gray-300 bg-gray-100 overflow-hidden shadow-inner"
                animate={{
                  borderColor: dragProgress > 0.05 ? '#4b5563' : '#d1d5db'
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gray-800"
                  style={{ width: fillWidth }}
                  animate={{ opacity: dragProgress > 0 ? 0.9 : 0.7 }}
                  transition={{ duration: 0.2 }}
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <motion.span
                    className="text-sm md:text-base font-medium"
                    animate={{
                      color: dragProgress > 0.35 ? '#f9fafb' : '#374151'
                    }}
                  >
                    {isLaunching
                      ? 'Launching...'
                      : dragProgress < 0.15
                        ? 'Slide to launch AppleDesk'
                        : dragProgress < 0.85
                          ? 'Keep sliding...'
                          : 'Release to start'}
                  </motion.span>
                </div>

                <motion.button
                  type="button"
                  aria-label="Slide to launch AppleDesk"
                  className="absolute top-1 left-1 z-10 w-14 h-14 rounded-full bg-white border border-gray-300 shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center"
                  style={{ x }}
                  drag="x"
                  dragConstraints={{ left: 0, right: maxDrag }}
                  dragElastic={0.02}
                  whileDrag={{ scale: 1.05 }}
                  onDragEnd={() => {
                    if (dragProgress >= 0.92 && !isLaunching) {
                      setIsLaunching(true);
                      animate(x, maxDrag, { duration: 0.15 });
                      setTimeout(() => onNavigateToApp(), 250);
                    } else {
                      animate(x, 0, { type: 'spring', stiffness: 520, damping: 36 });
                    }
                  }}
                >
                  <motion.svg
                    className="w-5 h-5 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: dragProgress * 20 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </div>

            <motion.p
              className="text-sm text-gray-500"
              animate={{ opacity: dragProgress > 0.15 ? 0 : 1 }}
            >
              Drag the handle to the right to enter the app
            </motion.p>
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

