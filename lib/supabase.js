import { createClient } from '@supabase/supabase-js';

// Server-only client. Uses the service role key, so this file must never be
// imported into a Client Component or exposed to the browser.
let client;

export function getSupabase() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
      );
    }
    client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export async function getSiteContent() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', 1)
    .single();

  if (error) throw error;
  return data.content;
}

export async function updateSiteContent(content) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('site_content')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', 1);

  if (error) throw error;
}

export async function insertLead({ name, email, phone, message }) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from('leads')
    .insert([{ name, email, phone, message }]);

  if (error) throw error;
}

export async function getLeads() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
