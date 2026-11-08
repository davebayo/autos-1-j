'use server'

export async function submitMandate(data: Record<string, string>) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/store` : 'http://localhost:3000/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-passcode': process.env.ADMIN_PASSCODE || ''
      },
      body: JSON.stringify(data)
    });
    return { success: res.ok };
  } catch (err) {
    console.error("Failed to persist request", err);
    return { success: false };
  }
}
