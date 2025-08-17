import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  // body: { text, prompt, mode, persona, lang }
  // stub: return a fake processed summary and metadata
  const { text = '', prompt = '', mode = 'Concise', persona = 'Developer' } = body || {};
  const summary = `(${mode} • ${persona}) Processed summary for: ${text.slice(0, 200)}`;
  const highlights = ['Key decision: ...', 'Open question: ...'];
  const trace = [{ excerpt: text.slice(0, 120), reason: 'intro' }];
  const sentiment = 'neutral';
  return NextResponse.json({ summary, highlights, trace, sentiment });
}
