import type { AlbumResponse } from '@/app/types';


export default async function getAlbums(): Promise<AlbumResponse> {
  const baseApiUrl = process.env.API_BASE_URL;
  
  if (!baseApiUrl) {
    throw new Error('API_BASE_URL environment variable is not defined');
  }
  
  try {
    const res = await fetch(baseApiUrl, {
      headers: { Accept: "application/json" },
    });
    
    if (res.ok) {
      return (await res.json()) as AlbumResponse;
    } else {
      throw new Error(`Failed to fetch albums: ${res.status} ${res.statusText}`);
    }
  } catch {
    throw new Error('Failed to fetch albums');
  }
}


export function getAlbumCoverUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL;

  if (!base) throw new Error('Public API base URL is not defined');

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
