'use client';

import type { AlbumResponse, User } from '@/app/types';
import AlbumCard from './AlbumCard';

interface TriviaProps {
  data: AlbumResponse;
  user: User;
  onReset: () => void;
}

export default function Trivia({ data, user, onReset }: TriviaProps) {
  return (
    <>
      <header className="header">
        <h1 className="main-title">Beatles Albums</h1>
        <p className="artist-info"><b>Artist:</b> {data.artist}</p>
        <p className="total-info"><b>Total Albums:</b> {data.albums.length}</p>
        <p className="user-info">
          Welcome {user.name} ({user.email}) ·{' '}
          <button className="link-btn" onClick={onReset}>Change user</button>
        </p>
      </header>

      <div className="albums-grid">
        {data.albums.map(album => (
          <AlbumCard key={album.cover_image_id} album={album} />
        ))}
      </div>

      <style jsx>{`
        .link-btn { background: none; border: none; cursor: pointer; padding: 0; text-decoration: underline; }
      `}</style>
    </>
  );
}
