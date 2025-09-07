import getAlbums from "@/utils/api";
import AlbumCard from "./components/AlbumCard";



export default async function Home() {
  const data = await getAlbums(); 

  return (
    <main className="main-container">
      <header className="header">
        <h1 className="main-title">Beatles Albums</h1>
        <p className="artist-info"><b>Artist:</b> {data.artist}</p>
        <p className="total-info"><b>Total Albums:</b> {data.albums.length}</p>
      </header>

      <div className="albums-grid">
        {data.albums.map((album) => (
          <AlbumCard key={album.cover_image_id} album={album} />
        ))}
      </div>
    </main>
  );
}