export interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  artist_bio?: string;
  date: string;
  medium_display: string;
  imageUrl: string;
  source: string;
  objectUrl: string;
  description:string;
}

export interface Exhibition {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  artworks: Artwork[];
  userId: string;
  createdAt: Date;
}
