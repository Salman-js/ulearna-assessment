import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { error, stack, timestamp } = await request.json();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error logging to file:', err);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}
