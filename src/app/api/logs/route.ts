import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs', 'errors.log');

async function ensureLogDirectory() {
  const logDir = path.dirname(logFilePath);
  try {
    await fs.mkdir(logDir, { recursive: true });
  } catch (err) {
    console.error('Failed to create logs directory:', err);
  }
}

export async function POST(request: Request) {
  try {
    const { error, stack, componentStack, timestamp } = await request.json();
    const logEntry =
      JSON.stringify({
        timestamp,
        error,
        stack,
        componentStack,
      }) + '\n';

    await ensureLogDirectory();
    await fs.appendFile(logFilePath, logEntry, 'utf8');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error logging to file:', err);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}
