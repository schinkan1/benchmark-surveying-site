import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/authToken';
import { getApplications } from '@/lib/supabase';

export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const applications = await getApplications();
    return NextResponse.json({ applications });
  } catch (err) {
    console.error('Failed to load applications:', err);
    return NextResponse.json({ error: 'Failed to load applications.' }, { status: 500 });
  }
}
