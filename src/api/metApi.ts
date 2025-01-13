import axios from "axios";
import { Artwork } from "../types/types";

const MET_API_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/search";


export const fetchFromMetMuseum = async (
  query: string,
): Promise<Artwork[]> => {
  const searchResponse = await axios.get(MET_API_URL, {
    params: { q: query },
  });

  const searchData = searchResponse.data;

  if (!searchData.objectIDs) return [];

  const artworks: Artwork[] = [];

  for (const id of searchData.objectIDs) {
    const objectResponse = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    const objectData = objectResponse.data;
    artworks.push({
      id: objectData.objectID,
      title: objectData.title || "Untitled",
      artist: objectData.artistDisplayName || "Unknown",
      imageUrl: objectData.primaryImage || "",
      date: objectData.objectDate || "Unknown",
      medium: objectData.medium || "Unknown",
    });
  }

  return artworks;
};

