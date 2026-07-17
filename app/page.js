import { getSiteContent } from '@/lib/supabase';
import Site from '@/components/Site';

// Re-fetch content periodically rather than caching it forever, so edits
// made in /admin show up without a full redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const content = await getSiteContent();
  return <Site content={content} />;
}
