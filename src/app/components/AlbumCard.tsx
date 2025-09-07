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
    <div className="album-card">
      <div className="album-cover">
        {loading ? (
          <div className="cover-image-placeholder">Loading...</div>
        ) : (
          <img 
            src={imageUrl} 
            alt={`${album.name} album cover`}
            className="cover-image"
          />
        )}
      </div>
      <div className="album-info">
        <h3 className="album-title">{album.name}</h3>
        <div className="album-details">
          <p className="album-year">{album.year_released}</p>
          <p className="album-tracks">{album.tracks} tracks</p>
          <p className="album-length">{album.length}</p>
        </div>
      </div>
    </div>
  );
}
