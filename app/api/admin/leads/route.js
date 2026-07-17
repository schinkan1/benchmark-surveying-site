import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/authToken';
import { getLeads } from '@/lib/supabase';

export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    console.error('Failed to load leads:', err);
    return NextResponse.json({ error: 'Failed to load leads.' }, { status: 500 });
  }
}
