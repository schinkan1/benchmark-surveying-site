import { NextResponse } from 'next/server';
import { insertLead } from '@/lib/supabase';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, message } = body || {};

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    await insertLead({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 60) : null,
      message: String(message).slice(0, 4000),
    });
  } catch (err) {
    console.error('Failed to save lead:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
