import axios from "axios";
import { Artwork } from "../types/types";

export const fetchMetArtworkDetails = async (
  type: string,
  query: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get<Artwork[]>(`/.netlify/functions/proxy`, {
      params: { type, q: query },
    });

    const resposeData = response.data;
    const artworks = resposeData.map((object: any) => {
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
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch artwork details.");
  }
};

export default fetchMetArtworkDetails;
