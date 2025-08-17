'use client';
export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Mango<span className="text-[#417C7E]">Desk</span></h1>
          <p className="text-sm text-gray-500">Transcript summarizer — concise, detailed, multi-persona</p>
        </div>
      </div>
    </header>
  );
}
