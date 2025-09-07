'use client';

import type { Album } from '@/app/types';
import { useState, useEffect } from 'react';
import { getAlbumCoverClient, getAlbumCoverUrl } from '@/utils/api';



interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbumCover() {
      try {
        const coverData = await getAlbumCoverClient(album.cover_image_id);
        setImageUrl(getAlbumCoverUrl(coverData.cover_image_path));
      } catch (error) {
        console.error('Failed to fetch album cover:', error);
        setImageUrl(getAlbumCoverUrl(album.cover_image_path));
      } finally {
        setLoading(false);
      }
    }

    fetchAlbumCover();
  }, [album.cover_image_id, album.cover_image_path]);

  return (
    <div className="text-center">
      {loading ? (
        <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-gray-500">
          Loading...
        </div>
      ) : (
        <img 
          src={imageUrl} 
          alt="Album cover"
          className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
        />
      )}
    </div>
  );
}
