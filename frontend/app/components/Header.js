'use client';
export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-2 border-b bg-white">
      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Apple<span className="text-[#417C7E]">Desk</span></h1>
          <p className="text-sm text-gray-500">Transcript summarizer — concise, detailed, multi-persona</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="https://github.com/RiH-137/Transcript-summarizer/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          Documentation
        </a>
        <a
          href="https://github.com/RiH-137/Transcript-summarizer"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
