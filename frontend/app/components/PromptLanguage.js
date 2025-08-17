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
    <div className="section-card-lg">
      <div className="mb-4">
        <label className="label-text-compact">Quick Prompts</label>
        <div className="grid-3-cols">
          {PREDEFINED_PROMPTS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePresetChange(preset.label)}
              className={`btn-selectable p-3 text-left ${
                selectedPreset === preset.label ? 'selected' : ''
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
        <label className="label-text">Custom Prompt</label>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className="textarea-field h-24" 
          placeholder="Describe how you want the transcript to be summarized..." 
        />
      </div>

      {/* language sec  */}
      <div className="mb-4">
        <label className="label-text">Output Language</label>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setLang(language)}
              className={`btn-language ${lang === language ? 'selected' : ''}`}
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
          className="btn-primary-lg"
        >
          <span>Generate Summary</span>
        </button>
      </div>
    </div>
  );
}
