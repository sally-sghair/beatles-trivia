'use client';

import type { Album } from '@/app/types';
import { useState, useEffect } from 'react';
import { getAlbumCoverUrl } from '@/utils/api';




interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const url = getAlbumCoverUrl(album.cover_image_path);
      setImageUrl(url);
    } catch (error) {
      console.error('Failed to generate album cover URL:', error);
    } finally {
      setLoading(false);
    }
  }, [album.cover_image_path]);

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
