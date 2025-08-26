'use client';
import { useState } from 'react';
import Header from './components/Header';
import UploadPaste from './components/UploadPaste';
import SummaryOptions from './components/SummaryOptions';
import PromptLanguage from './components/PromptLanguage';
import SummaryOutput from './components/SummaryOutput';
import SentimentDisplay from './components/SentimentDisplay';
import KeyPoints from './components/KeyPoints';
import ExportSection from './components/ExportSection';
import EmailSection from './components/EmailSection';
import ChatBot from './components/ChatBot';
import FeaturesSection from './components/FeaturesSection';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import HelpModal from './components/HelpModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { API_URLS } from './config/api';

export default function AppleDeskPage() {
  const [showLanding, setShowLanding] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [text, setText] = useState('');
  const [mode, setMode] = useState('Concise');
  const [persona, setPersona] = useState('Developer');
  const [sentiment, setSentiment] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [lang, setLang] = useState('English');
  const [summary, setSummary] = useState('');
  const [keyPoints, setKeyPoints] = useState([]);
  const [sentimentData, setSentimentData] = useState(null);

  async function generate() {
    console.log('Generate called with text:', text?.substring(0, 100), '...');
    console.log('Prompt:', prompt);
    console.log('Mode:', mode, 'Persona:', persona, 'Lang:', lang);
    
    if (!text.trim()) {
      setSummary('Please upload a file or enter some text first.');
      return;
    }

    setSummary('Generating summary...');
    
    try {
      const payload = {
        text, 
        prompt, 
        mode, 
        persona, 
        language: lang,
        sentiment: sentiment
      };
      console.log('Sending payload:', payload);
      
      const res = await fetch(API_URLS.SUMMARIZE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', res.status);      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Summarization failed' }));
        throw new Error(errorData.error || `Request failed: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setSummary(data.summary);
        setSentimentData(data.sentimentData || null);
        console.log('Summary set successfully');
      } else {
        throw new Error(data.error || 'Summarization failed');
      }
    } catch (err) {
      console.error('Summarization error:', err);
      setSummary(`Error: ${err.message}`);
    }
  }

  // If showing landing page, render it
  if (showLanding) {
    return <LandingPage onNavigateToApp={() => setShowLanding(false)} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
      <div className="w-full max-w-7xl">
        <Header />
        <UploadPaste onTextChange={setText} />
        <SummaryOptions
          mode={mode}
          setMode={setMode}
          persona={persona}
          setPersona={setPersona}
          sentiment={sentiment}
          setSentiment={setSentiment}
        />
        <PromptLanguage 
          prompt={prompt} 
          setPrompt={setPrompt} 
          lang={lang} 
          setLang={setLang} 
          onGenerate={generate}
        />
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
         
         {/* summary */}
          <div className="xl:col-span-2 space-y-6">
            <SummaryOutput summary={summary} />
            {sentimentData && <SentimentDisplay sentimentData={sentimentData} />}
            <EmailSection summary={summary} keyPoints={keyPoints} />
          </div>
          
          {/* sidebar */}
          <div className="space-y-6">
            <ChatBot documentText={text} />
            <KeyPoints 
              originalText={text} 
              summary={summary} 
              onKeyPointsUpdate={setKeyPoints}
            />
            <ExportSection 
              summary={summary} 
              originalText={text} 
              keyPoints={keyPoints} 
            />
          </div>
        </div>
        <Footer 
          onOpenHelp={() => setShowHelp(true)} 
          onOpenPrivacyPolicy={() => setShowPrivacyPolicy(true)}
        />
      </div>
      
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
      
    </main>
  );
}
