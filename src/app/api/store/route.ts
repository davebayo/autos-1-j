import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const adminPasscode = request.headers.get('x-admin-passcode');

  // Load passcode from environment variables instead of hardcoding
  const expectedPasscode = process.env.ADMIN_PASSCODE;

  if (!expectedPasscode || adminPasscode !== expectedPasscode) {
    return NextResponse.json(
      { error: 'Unauthorized. Invalid or missing x-admin-passcode.' },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();

    // Here you would typically store the data in a database
    console.log('Received Sourcing/Swap Request:', data);

    return NextResponse.json({ success: true, message: 'Mandate stored successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
