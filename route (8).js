import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/authToken';
import { getResumeSignedUrl } from '@/lib/supabase';

export async function GET(request) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get('path');
  if (!path) {
    return NextResponse.json({ error: 'Missing path.' }, { status: 400 });
  }

  try {
    const url = await getResumeSignedUrl(path);
    return NextResponse.redirect(url);
  } catch (err) {
    console.error('Failed to create signed URL:', err);
    return NextResponse.json({ error: 'Failed to load resume.' }, { status: 500 });
  }
}
