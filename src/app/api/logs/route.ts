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
export async function logError({
  error,
  stack,
  timestamp,
}: {
  error: string;
  stack: string;
  timestamp: string;
}) {
  try {
    const logEntry =
      JSON.stringify({
        timestamp,
        error,
        stack,
      }) + '\n';
    await ensureLogDirectory();
    await fs.appendFile(logFilePath, logEntry, 'utf8');
    return;
  } catch (err) {
    console.error('Error logging to file:', err);
    throw new Error();
  }
}
export async function POST(request: Request) {
  try {
    const { error, stack, timestamp } = await request.json();

    await logError({ error, stack, timestamp });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error logging to file:', err);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}
