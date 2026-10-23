import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { videoSource, MAX_UPLOAD_BYTES } from './video';

const videoSchema = z.object({ id: z.string().uuid().optional(), title: z.string().trim().min(1).max(200), description: z.string().max(10000), category: z.string().min(1), video_url: z.string().max(2000), video_path: z.string().nullable(), thumbnail_path: z.string().nullable(), published: z.boolean(), position: z.number().int().nonnegative() });
export const publicPortfolio = createServerFn({ method: 'GET' }).handler(async () => {
  const { publicClient, resolveMedia } = await import('./portfolio.server');
  const client = publicClient();
  const [categories, videos] = await Promise.all([client.from('portfolio_categories').select('*').order('position'), client.from('portfolio_videos').select('*').eq('published', true).order('position')]);
  if (categories.error || videos.error) throw new Error('Unable to load portfolio.');
  return { categories: categories.data, videos: await resolveMedia(videos.data) };
});
export const adminStatus = createServerFn({ method: 'GET' }).handler(async () => {
  const { adminSession } = await import('./portfolio.server');
  return Boolean((await adminSession()).data.admin);
});
export const adminLogin = createServerFn({ method: 'POST' }).inputValidator(z.object({ username: z.string().max(100), password: z.string().max(512) })).handler(async ({ data }) => {
  const { createHash, timingSafeEqual } = await import('node:crypto');
  const { getRequestIP } = await import('@tanstack/react-start/server');
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { adminSession } = await import('./portfolio.server');
  const key = createHash('sha256').update(getRequestIP({ xForwardedFor: true }) || 'unknown').digest('hex');
  const { data: count, error } = await supabaseAdmin.rpc('record_admin_attempt', { attempt_key: key });
  if (error || count > 10) return { ok: false, error: 'Too many attempts. Try again in 15 minutes.' };
  const expected = process.env['ADMIN_PASSWORD'];
  if (!expected || expected.length < 12) return { ok: false, error: 'A private password of at least 12 characters must be configured.' };
  const matches = timingSafeEqual(createHash('sha256').update(data.password).digest(), createHash('sha256').update(expected).digest());
  if (!matches || data.username !== 'admin') return { ok: false, error: 'Incorrect username or password.' };
  await (await adminSession()).update({ admin: true });
  return { ok: true, error: '' };
});
export const adminLogout = createServerFn({ method: 'POST' }).handler(async () => { const { adminSession } = await import('./portfolio.server'); await (await adminSession()).clear(); return true; });
export const adminPortfolio = createServerFn({ method: 'GET' }).handler(async () => {
  const { requireAdmin, resolveMedia } = await import('./portfolio.server');
  const client = await requireAdmin();
  const [categories, videos] = await Promise.all([client.from('portfolio_categories').select('*').order('position'), client.from('portfolio_videos').select('*').order('position')]);
  if (categories.error || videos.error) throw new Error('Unable to load portfolio.');
  return { categories: categories.data, videos: await resolveMedia(videos.data) };
});
export const saveVideo = createServerFn({ method: 'POST' }).inputValidator(videoSchema).handler(async ({ data }) => {
  const { requireAdmin } = await import('./portfolio.server'); const client = await requireAdmin();
  if (!data.video_path && !videoSource(data.video_url)) throw new Error('Use a YouTube, Vimeo, or direct MP4/WebM/MOV link.');
  for (const path of [data.video_path, data.thumbnail_path]) if (path && !/^media\/[\w.-]+$/.test(path)) throw new Error('Invalid media path.');
  const { error } = await client.from('portfolio_videos').upsert(data);
  if (error) throw new Error('Unable to save video.'); return true;
});
export const deleteVideo = createServerFn({ method: 'POST' }).inputValidator(z.string().uuid()).handler(async ({ data }) => {
  const { requireAdmin } = await import('./portfolio.server'); const client = await requireAdmin();
  const { data: row, error: readError } = await client.from('portfolio_videos').select('video_path,thumbnail_path').eq('id', data).single();
  if (readError) throw new Error('Video not found.');
  const { error } = await client.from('portfolio_videos').delete().eq('id', data); if (error) throw new Error('Unable to delete video.');
  const paths = [row.video_path, row.thumbnail_path].filter((path): path is string => Boolean(path)); if (paths.length) await client.storage.from('portfolio-media').remove(paths); return true;
});
export const saveCategory = createServerFn({ method: 'POST' }).inputValidator(z.object({ id: z.string().min(1).max(100), label: z.string().trim().min(1).max(100), position: z.number().int().nonnegative() })).handler(async ({ data }) => {
  const { requireAdmin } = await import('./portfolio.server'); const client = await requireAdmin(); const { error } = await client.from('portfolio_categories').upsert(data); if (error) throw new Error('Unable to save category.'); return true;
});
export const deleteCategory = createServerFn({ method: 'POST' }).inputValidator(z.string()).handler(async ({ data }) => {
  const { requireAdmin } = await import('./portfolio.server'); const client = await requireAdmin(); const { error } = await client.from('portfolio_categories').delete().eq('id', data); if (error) throw new Error('Move or delete videos in this category first.'); return true;
});
export const prepareUpload = createServerFn({ method: 'POST' }).inputValidator(z.object({ name: z.string().max(255), size: z.number().positive().max(MAX_UPLOAD_BYTES), kind: z.enum(['video', 'image']) })).handler(async ({ data }) => {
  const { requireAdmin } = await import('./portfolio.server'); const client = await requireAdmin();
  const ext = data.name.split('.').at(-1)?.toLowerCase();
  if (!ext || !(data.kind === 'video' ? ['mp4','webm','mov'] : ['jpg','jpeg','png','webp']).includes(ext)) throw new Error('Unsupported file format.');
  const path = `media/${crypto.randomUUID()}.${ext}`;
  const { data: upload, error } = await client.storage.from('portfolio-media').createSignedUploadUrl(path);
  if (error) throw new Error('Unable to start upload.');
  const serverUrl = process.env['SUPABASE_URL']; const browserUrl = import.meta.env.VITE_SUPABASE_URL;
  return { path, url: serverUrl && browserUrl ? upload.signedUrl.replace(serverUrl, browserUrl) : upload.signedUrl };
});