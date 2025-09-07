export type AlbumResponse = {
  artist: string;
  albums: Album[];
}


export type Album = {
name: string;
year_released: number;
tracks: number;
length: string;
cover_image_path: string;
cover_image_id: number;
}

export type User = {
  name: string;
  email: string;
}