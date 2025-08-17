'use client';
import { useState } from 'react';

const PREDEFINED_PROMPTS = [
  {
    label: "Executive Summary",
    value: "Create a concise executive summary highlighting key decisions, action items, and important deadlines. Focus on business impact and next steps. If there are tabular details, present them as a clean, well-formatted table."
  },
  {
    label: "Technical Review",
    value: "Summarize technical discussions, architectural decisions, code reviews, and implementation details. Keep technical terminology intact. If there are tabular details, present them as a clean, well-formatted table."
  },
  {
    label: "Meeting Minutes",
    value: "Generate formal meeting minutes with attendees, agenda items discussed, decisions made, and action items assigned to specific people. If there are tabular details, present them as a clean, well-formatted table."
  },
  {
    label: "Bullet Points for Executives",
    value: "Summarize in bullet points for executives, focusing on high-level strategic points, key decisions, financial implications, and critical action items. Use clear, concise bullet points that can be quickly scanned by leadership."
  },
  {
    label: "Action Items Only",
    value: "Highlight only action items from the transcript. Extract specific tasks, responsibilities, deadlines, and who is assigned to each item. Format as a numbered list for easy tracking and follow-up."
  },
  {
    label: "Key Insights",
    value: "Identify key insights, important quotes, and main takeaways from the discussion. Highlight any concerns or risks mentioned. If there are tabular details, present them as a clean, well-formatted table."
  },
  {
    label: "Client Briefing",
    value: "Create a client-friendly summary avoiding technical jargon. Focus on progress, outcomes, and what this means for the project. If there are tabular details, present them as a clean, well-formatted table."
  }
];

export default function PromptLanguage({ prompt, setPrompt, lang, setLang, onGenerate }) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];

  const handlePresetChange = (presetLabel) => {
    setSelectedPreset(presetLabel);
    const preset = PREDEFINED_PROMPTS.find(p => p.label === presetLabel);
    if (preset) {
      setPrompt(preset.value);
    }
  };

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Prompts</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PREDEFINED_PROMPTS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetChange(preset.label)}
              className={`p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedPreset === preset.label
                  ? 'border-[#417C7E] bg-[#417C7E]/5 text-[#417C7E]'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#417C7E]/50 hover:bg-[#417C7E]/5'
              }`}
            >
              <div className="text-xs font-semibold mb-1">{preset.label}</div>
              <div className="text-xs opacity-75 line-clamp-2">
                {preset.value.substring(0, 60)}...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Prompt</label>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className="w-full border-2 border-gray-200 rounded-lg p-3 h-24 focus:border-[#417C7E] focus:ring-2 focus:ring-[#417C7E]/20 transition-all" 
          placeholder="Describe how you want the transcript to be summarized..." 
        />
      </div>

      {/* language sec  */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Output Language</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setLang(language)}
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                lang === language
                  ? 'border-[#417C7E] bg-[#417C7E] text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#417C7E] hover:bg-[#417C7E]/5'
              }`}
            >
              <span className="text-sm font-medium">
                {language === 'English' && '🇺🇸'} 
                {language === 'Hindi' && '🇮🇳'} 
                {language === 'Spanish' && '🇪🇸'} 
                {language === 'French' && '🇫🇷'} 
                {language === 'German' && '🇩🇪'} 
                {' '}{language}
              </span>
            </button>
          ))}
        </div>
      </div>



      <div className="flex items-center justify-end space-x-3">
        <button 
          onClick={onGenerate} 
          className="px-6 py-2 rounded-lg bg-[#417C7E] text-white hover:bg-[#2d5759] transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <span>Generate Summary</span>
        </button>
      </div>
    </div>
  );
}
