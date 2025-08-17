'use client';
export default function SummaryOptions({ mode, setMode, persona, setPersona, sentiment, setSentiment }) {
  const modes = ['Concise', 'Detailed'];
  const personas = ['Developer', 'Manager', 'Client'];

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      {/* option section */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Summary Mode</label>
        <div className="flex space-x-3">
          {modes.map((modeOption) => (
            <button
              key={modeOption}
              onClick={() => setMode(modeOption)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                mode === modeOption
                  ? 'border-[#417C7E] bg-[#417C7E] text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#417C7E] hover:bg-[#417C7E]/5'
              }`}
            >
              <span className="text-sm font-medium">{modeOption}</span>
            </button>
          ))}
        </div>
      </div>

      {/* persona section */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Target Audience</label>
        <div className="grid grid-cols-3 gap-3">
          {personas.map((personaOption) => (
            <button
              key={personaOption}
              onClick={() => setPersona(personaOption)}
              className={`px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                persona === personaOption
                  ? 'border-[#417C7E] bg-[#417C7E] text-white shadow-lg'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-[#417C7E] hover:bg-[#417C7E]/5'
              }`}
            >
              <div className="text-center">
                <div className="text-lg mb-1">
                  {personaOption === 'Developer'}
                  {personaOption === 'Manager'}
                  {personaOption === 'Client'}
                </div>
                <span className="text-sm font-medium">{personaOption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* sentement analys */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Include Sentiment Analysis</label>
        <button
          onClick={() => setSentiment(!sentiment)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            sentiment ? 'bg-[#417C7E]' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              sentiment ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
