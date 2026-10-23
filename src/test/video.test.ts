import { describe, expect, it } from 'vitest';
import { videoSource, MAX_UPLOAD_BYTES } from '@/lib/video';
describe('Portfolio video sources', () => {
  it('plays shared YouTube links using a safe embed', () => { expect(videoSource('https://youtu.be/dQw4w9WgXcQ')).toEqual({ kind: 'embed', url: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }); });
  it('plays shared Vimeo links', () => { expect(videoSource('https://vimeo.com/123456')).toEqual({ kind: 'embed', url: 'https://player.vimeo.com/video/123456' }); });
  it('supports directly uploaded videos', () => { expect(videoSource('https://example.com/video.mp4')?.kind).toBe('video'); });
  it('rejects unsafe or unsupported links', () => { expect(videoSource('javascript:alert(1)')).toBeNull(); expect(videoSource('https://example.com/page')).toBeNull(); });
  it('limits uploads to 500 MB', () => { expect(MAX_UPLOAD_BYTES).toBe(524288000); });
});