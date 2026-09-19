import { NextRequest, NextResponse } from 'next/server';
import { askGeminiSafari } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = (body.query || '').trim();

    if (!query) {
      return NextResponse.json(
        { error: 'Please provide an animal question for Zoe!' },
        { status: 400 }
      );
    }

    const response = await askGeminiSafari(query);
    return NextResponse.json(response);
  } catch (err: unknown) {
    console.error('Search API error:', err);
    return NextResponse.json(
      { error: 'Failed to explore with Safari Guide' },
      { status: 500 }
    );
  }
}
