import axios from "axios";
import { Artwork } from "../types/types";

export const fetchMetApi = async (
  type: string,
  query: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get<Artwork[]>(
      "/.netlify/functions/fetchMetArtworkDetails",
      {
        params: { type, q: query },
      }
    );

    const responseData = response.data;
    const artworks = responseData.map((object: any) => {
      return {
        id: object.objectID,
        title: object.title,
        artist_display: object.artistDisplayName + object.artistDisplayBio,
        imageUrl: object.primaryImage || "",
        date: object.objectDate || "Unknown",
        medium_display: object.medium,
        source: "Met Museum",
      };
    });
    return artworks;
  } catch (error) {
    throw error;
  }
};
