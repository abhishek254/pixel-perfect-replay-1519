export const MAX_UPLOAD_BYTES = 500 * 1024 * 1024;
export function videoSource(value: string): { kind: 'video' | 'embed'; url: string } | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be' || host === 'youtube.com' || host === 'm.youtube.com') {
      const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).at(-1);
      return id && /^[\w-]{11}$/.test(id) ? { kind: 'embed', url: `https://www.youtube-nocookie.com/embed/${id}` } : null;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).at(-1);
      return id && /^\d+$/.test(id) ? { kind: 'embed', url: `https://player.vimeo.com/video/${id}${url.searchParams.get('h') ? `?h=${encodeURIComponent(url.searchParams.get('h') || '')}` : ''}` } : null;
    }
    return /\.(mp4|webm|mov)(\?|$)/i.test(value) || url.pathname.includes('/storage/v1/') ? { kind: 'video', url: value } : null;
  } catch { return null; }
}