import { NextResponse } from 'next/server';

export async function POST(request) {
  const { text, target } = await request.json();
  // stub: return the same text with a note
  return NextResponse.json({ text: `[${target} translation stub] ` + text });
}
