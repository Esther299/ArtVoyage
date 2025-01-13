import { Timestamp } from "firebase/firestore";

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  date: string,
  medium: string;
}

export interface Exhibition {
  title: string;
  description: string;
  createDate: Timestamp;
  location: string;
  curator: string;
  artworks: Artwork[];
}



