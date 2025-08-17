'use client';
export default function SummaryOptions({ mode, setMode, persona, setPersona, sentiment, setSentiment }) {
  const modes = ['Concise', 'Detailed'];
  const personas = ['Developer', 'Manager', 'Client'];

  return (
    <div className="section-card">
      {/* option section */}
      <div className="mb-4">
        <label className="label-text">Summary Mode</label>
        <div className="flex space-x-3">
          {modes.map((modeOption) => (
            <button
              key={modeOption}
              onClick={() => setMode(modeOption)}
              className={`btn-selectable ${mode === modeOption ? 'selected' : ''}`}
            >
              <span className="text-sm font-medium">{modeOption}</span>
            </button>
          ))}
        </div>
      </div>

      {/* persona section */}
      <div className="mb-4">
        <label className="label-text">Target Audience</label>
        <div className="grid-persona">
          {personas.map((personaOption) => (
            <button
              key={personaOption}
              onClick={() => setPersona(personaOption)}
              className={`card-persona ${persona === personaOption ? 'selected' : ''}`}
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
          className={`toggle-switch ${sentiment ? 'on' : 'off'}`}
        >
          <span className={`toggle-knob ${sentiment ? 'on' : 'off'}`} />
        </button>
      </div>
    </div>
  );
}
