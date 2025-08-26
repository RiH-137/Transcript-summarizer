'use client';

import { useState } from 'react';
import HelpModal from './HelpModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function Header() {
  const [showHelp, setShowHelp] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  return (
    <>
      <header className="w-full flex items-center justify-between py-4 px-2 border-b bg-white">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Apple<span className="text-[#417C7E]">Desk</span></h1>
            <p className="text-sm text-gray-500">Transcript summarizer — concise, detailed, multi-persona</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowHelp(true)}
            className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition flex items-center space-x-2"
            title="Open Help Center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help</span>
          </button>
          <a
            href="https://github.com/RiH-137/AppleDesk/blob/project/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          >
            Documentation
          </a>
          <a
            href="https://github.com/RiH-137/AppleDesk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            GitHub
          </a>
          <button
            onClick={() => setShowPrivacyPolicy(true)}
            className="px-3 py-1 rounded bg-purple-100 text-purple-700 hover:bg-purple-200 transition flex items-center space-x-2"
            title="View Privacy Policy & Technical Details"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Privacy</span>
          </button>
        </div>
      </header>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </>
  );
}
