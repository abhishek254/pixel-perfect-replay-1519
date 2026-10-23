import { useSession, getRequestUrl, setResponseHeader } from '@tanstack/react-start/server';
import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export function adminSession() {
  const password = process.env['SESSION_SECRET'];
  if (!password) throw new Error('Admin access is not configured.');
  return useSession<{ admin?: boolean }>({ password, name: 'portfolio-admin', maxAge: 3600, cookie: { httpOnly: true, secure: getRequestUrl().protocol === 'https:', sameSite: 'strict', path: '/' } });
}
export async function requireAdmin() {
  setResponseHeader('Cache-Control', 'no-store');
  const session = await adminSession();
  if (!session.data.admin) throw new Error('Please sign in to continue.');
  return supabaseAdmin;
}
export function publicClient() {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Portfolio unavailable.');
  return createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_')) headers.delete('Authorization'); headers.set('apikey', key); return fetch(input, { ...init, headers }); } } });
}
export async function resolveMedia<T extends { video_path: string | null; thumbnail_path: string | null; video_url: string }>(rows: T[]) {
  return Promise.all(rows.map(async (row) => {
    async function signed(path: string | null) {
      if (!path) return '';
      const { data, error } = await supabaseAdmin.storage.from('portfolio-media').createSignedUrl(path, 7200);
      if (error) throw new Error('Unable to load video media.');
      const browserUrl = import.meta.env.VITE_SUPABASE_URL;
      const serverUrl = process.env['SUPABASE_URL'];
      return serverUrl && browserUrl ? data.signedUrl.replace(serverUrl, browserUrl) : data.signedUrl;
    }
    return { ...row, videoUrl: row.video_path ? await signed(row.video_path) : row.video_url, thumbnail: await signed(row.thumbnail_path) };
  }));
}