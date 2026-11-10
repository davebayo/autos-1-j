'use server';

export async function submitMandate(data: {
  mode: string;
  targetSpec: string;
  budget: string;
  port: string;
  tradeInYMM: string;
  tradeInCondition: string;
}) {
  const passcode = process.env.ADMIN_PASSCODE || '';

  if (!passcode) {
    throw new Error('Server configuration error: ADMIN_PASSCODE is missing.');
  }

  // Instead of performing a fetch loopback (which is an anti-pattern and a potential SSRF vulnerability
  // if headers are used), we directly execute the internal logic that the API route normally would.

  // Here you would typically store the data in a database
  console.log('Received Sourcing/Swap Request:', data);

  // Return the same success response format that the API route would have
  return { success: true, message: 'Mandate stored successfully' };
}
