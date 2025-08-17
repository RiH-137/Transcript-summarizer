import { NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '../../config/api';

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // transcription using Whisper-large-v3-turbo
    const backendForm = new FormData();
    backendForm.append('file', file);

    const response = await fetch(API_URLS.UPLOAD, {
      method: 'POST',
      body: backendForm,
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        text: result.text,
        preview: result.preview || result.text.slice(0, 400),
        wordCount: result.wordCount
      });
    } else {
      return NextResponse.json({ error: result.error || 'Transcription failed' }, { status: 500 });
    }

  } catch (error) {
    console.error('Transcription API error:', error);
    return NextResponse.json({ error: 'Transcription service error' }, { status: 500 });
  }
}
