import { NextResponse } from 'next/server';
import { insertApplication } from '@/lib/supabase';

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  const name = form.get('name');
  const email = form.get('email');
  const phone = form.get('phone');
  const position = form.get('position');
  const message = form.get('message');
  const resumeFile = form.get('resume');

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  let resumeToStore = null;
  if (resumeFile && typeof resumeFile === 'object' && resumeFile.size > 0) {
    if (resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: 'Resume file is too large (8MB max).' }, { status: 400 });
    }
    if (resumeFile.type && !ALLOWED_TYPES.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Resume must be a PDF or Word document.' },
        { status: 400 }
      );
    }
    resumeToStore = resumeFile;
  }

  try {
    await insertApplication({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: phone ? String(phone).slice(0, 60) : null,
      position: position ? String(position).slice(0, 120) : null,
      message: message ? String(message).slice(0, 4000) : null,
      resumeFile: resumeToStore,
    });
  } catch (err) {
    console.error('Failed to save application:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
