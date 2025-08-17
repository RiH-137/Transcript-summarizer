import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  // stub: in real app send via SMTP or 3rd party
  console.log('send-email', body);
  return NextResponse.json({ ok: true, message: 'Email queued (stub)' });
}
