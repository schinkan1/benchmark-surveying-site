import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/authToken';
import { getSiteContent } from '@/lib/supabase';
import Editor from '@/components/admin/Editor';

export default async function AdminPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect('/admin/login');
  }

  const content = await getSiteContent();
  return <Editor initialContent={content} />;
}
