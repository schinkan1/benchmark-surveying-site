import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/authToken';
import { getSiteContent, updateSiteContent } from '@/lib/supabase';

function isAuthed() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  try {
    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (err) {
    console.error('Failed to load content:', err);
    return NextResponse.json({ error: 'Failed to load content.' }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!body || typeof body.content !== 'object') {
    return NextResponse.json({ error: 'Missing content object.' }, { status: 400 });
  }

  try {
    await updateSiteContent(body.content);
  } catch (err) {
    console.error('Failed to update content:', err);
    return NextResponse.json({ error: 'Failed to save content.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
