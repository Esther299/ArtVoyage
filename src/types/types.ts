export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  imageUrl: string;
  date: string;
  medium_display: string;
  source: string;
}

export interface Exhibition {
  id: string;
  name: string;
  date: string;
  artworks: Artwork[];
  userId: string;
  createdAt: Date;
}