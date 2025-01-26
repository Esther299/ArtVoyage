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
  copyright:string;
  firestoreId?: string;
}

export interface Exhibition {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  artworks: Artwork[];
  userId: string;
  image:string;
  createdAt: Date;
}
