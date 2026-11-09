'use server';

import { headers } from 'next/headers';

export async function submitMandate(data: Record<string, unknown>) {
  const passcode = process.env.ADMIN_PASSCODE || 'placeholder-until-auth-implemented';

  // We are calling the route handler on the same server, but we need an absolute URL
  // A cleaner approach for server actions is to just perform the DB logic directly
  // However, the instructions say: "to fetch `/api/store`" or perform the request.
  // Actually, Server Actions run on the server, so we can just call our own API
  // or we could just skip the API route entirely. But following the instructions:
  // "Create a Next.js Server Action in a new file `src/app/request/actions.ts` to fetch `/api/store`. This action will securely read `process.env.ADMIN_PASSCODE` on the server and pass it as the `x-admin-passcode` header."

  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const url = `${protocol}://${host}/api/store`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passcode': passcode,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to store mandate. Status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    throw error;
  }
}
