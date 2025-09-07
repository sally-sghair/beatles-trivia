import type { AlbumResponse, Album } from '@/app/types';


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
      const txt = await res.text().catch(() => "");
      throw new Error(`Failed to fetch albums: ${res.status} ${res.statusText}\n${txt}`);
    }
  } catch (e) {
    throw new Error(`Failed to fetch albums from ${baseApiUrl}: ${String(e)}`);
  }
}

export async function getAlbumCover(id: number): Promise<Album> {
  const baseApiUrl = process.env.API_BASE_URL;
  if (!baseApiUrl) {
    throw new Error('API_BASE_URL environment variable is not defined');
  }
  
  const res = await fetch(baseApiUrl, {
    headers: { Accept: "application/json" },
  });
  
  if (res.ok) {
    const data = (await res.json()) as AlbumResponse;
    const album = data.albums.find(a => a.cover_image_id === id);
    if (!album) {
      throw new Error(`Album with id ${id} not found`);
    }
    return album;
  } else {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to fetch album cover: ${res.status} ${res.statusText}\n${txt}`);
  }
}

export async function getAlbumCoverClient(id: number): Promise<Album> {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseApiUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not defined');
  }
  
  const res = await fetch(baseApiUrl, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  
  if (res.ok) {
    const data = (await res.json()) as AlbumResponse;
    const album = data.albums.find(a => a.cover_image_id === id);
    if (!album) {
      throw new Error(`Album with id ${id} not found`);
    }
    return album;
  } else {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to fetch album cover: ${res.status} ${res.statusText}\n${txt}`);
  }
}

export function getAlbumCoverUrl(path: string): string {
  // Use the public base on the client; fall back to server base if available
  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.API_BASE_URL;

  if (!base) throw new Error('Public API base URL is not defined');

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
