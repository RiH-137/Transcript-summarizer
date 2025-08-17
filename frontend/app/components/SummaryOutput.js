'use client';
import { useState } from 'react';
import SummaryEditor from './SummaryEditor';

export default function SummaryOutput({ summary }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Summary</h3>
      </div>
      {open && (
        <div className="mt-3">
          <SummaryEditor initial={summary} />
        </div>
      )}
    </div>
  );
}
