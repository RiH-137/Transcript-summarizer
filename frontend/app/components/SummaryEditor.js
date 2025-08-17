'use client';
import { useState, useEffect } from 'react';

export default function SummaryEditor({ initial = '' }) {
  const [text, setText] = useState(initial);
  const [edits, setEdits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setText(initial);
  }, [initial]);

  function handleChange(e) {
    setText(e.target.value);
    setEdits((s) => [...s, { time: Date.now(), value: e.target.value }]);
  }

  // markdown style summary
  function formatSummaryText(text) {
    if (!text) return '';

    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/^#{1}\s(.+)$/gm, '<h1 class="text-2xl font-bold text-[#417C7E] mb-3 mt-4">$1</h1>')
      .replace(/^#{2}\s(.+)$/gm, '<h2 class="text-xl font-semibold text-[#417C7E] mb-2 mt-3">$1</h2>')
      .replace(/^#{3}\s(.+)$/gm, '<h3 class="text-lg font-medium text-gray-800 mb-2 mt-3">$1</h3>')
      .replace(/ACTION:\s(.+)$/gm, '<div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2"><span class="font-semibold text-yellow-800">ACTION:</span> <span class="text-yellow-700">$1</span></div>')
      .replace(/DECISION:\s(.+)$/gm, '<div class="bg-green-50 border-l-4 border-green-400 p-3 mb-2"><span class="font-semibold text-green-800">DECISION:</span> <span class="text-green-700">$1</span></div>')
      .replace(/KEY:\s(.+)$/gm, '<div class="bg-blue-50 border-l-4 border-blue-400 p-3 mb-2"><span class="font-semibold text-blue-800">KEY:</span> <span class="text-blue-700">$1</span></div>')
      .replace(/^\-\s(.+)$/gm, '<li class="text-gray-700 mb-1">$1</li>')
      .replace(/^\d+\.\s(.+)$/gm, '<li class="text-gray-700 mb-1">$1</li>');

   
    formatted = formatted.replace(/(<li.*?<\/li>(?:\s*))+?/g, match => {
      return `<ul class="list-disc list-inside mb-3 space-y-1 text-gray-700">${match}</ul>`;
    });

    formatted = formatted.replace(/(<ul.*?<\/ul>(?:\s*))+?/g, match => {
      return `<div class="mb-3">${match}</div>`;
    });
    formatted = formatted.replace(/\n{2,}/g, '<br /><br />').replace(/\n/g, '<br />');

    return formatted;
  }

  // table formatter
  function formatTables(text) {
    const lines = text.split('\n');
    let inTable = false;
    let tableRows = [];
    let result = [];

    function flushTable() {
      if (tableRows.length > 0) {
        const tableHTML = `
          <div class="overflow-x-auto mb-4">
            <table class="min-w-full border border-gray-300 rounded-lg">
              <thead class="bg-[#417C7E] text-white">
                <tr>
                  ${tableRows[0].map(header => `<th class="px-4 py-2 text-left font-semibold">${header}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="bg-white">
                ${tableRows.slice(1).map((row, i) =>
                  `<tr class="${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                    ${row.map(cell => `<td class="px-4 py-2 border-t border-gray-200 text-gray-700">${cell}</td>`).join('')}
                  </tr>`
                ).join('')}
              </tbody>
            </table>
          </div>
        `;
        result.push(tableHTML);
        tableRows = [];
      }
    }

    lines.forEach(line => {
      if (line.includes('|') && line.split('|').length > 2) {
        inTable = true;
        tableRows.push(line.split('|').map(cell => cell.trim()).filter(Boolean));
      } else {
        if (inTable) {
          flushTable();
          inTable = false;
        }
        result.push(line);
      }
    });

    if (inTable) flushTable();

    return result.join('\n');
  }

  const formattedText = formatSummaryText(formatTables(text));

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="section-header">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Summary Output</span>
          {edits.length > 0 && (
            <span className="badge-info">
              {edits.length} edits
            </span>
          )}
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary-sm"
        >
          {isEditing ? 'View' : 'Edit'}
        </button>
      </div>

      <div className="p-4">
        {isEditing ? (
          <textarea
            value={text}
            onChange={handleChange}
            className="w-full h-64 border border-gray-300 rounded p-3 text-sm font-mono resize-none focus:ring-2 focus:ring-[#417C7E] focus:border-[#417C7E]"
            placeholder="Your summary will appear here..."
          />
        ) : (
          <div
            className="min-h-64 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedText || '<p class="text-gray-500 italic">No summary generated yet. Upload a file and click Generate to see results here.</p>' }}
          />
        )}
      </div>
    </div>
  );
}
