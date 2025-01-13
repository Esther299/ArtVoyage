import axios from "axios";
import { Artwork } from "../types/types";

const CHICAGO_API_URL = "https://api.artic.edu/api/v1/artworks/search";

export const fetchFromChicagoArtInstitute = async (
  query: string,
  page: number
): Promise<Artwork[]> => {
  const searchResponse = await axios.get(CHICAGO_API_URL, {
    params: {
      q: query,
      page,
      facets: "id",
    },
  });

  const searchData = searchResponse.data.data;

  const artworks: Artwork[] = [];

  for (const item of searchData) {
    const itemResponse = await axios.get(
      `https://api.artic.edu/api/v1/artworks/${item.id}`,
      {
        params: {
          fields:
            "id,title,artist_title,thumbnail,date_display,department_title,medium_display,dimensions",
        },
      }
    );
    const itemData = itemResponse.data.data;
    artworks.push({
      id: itemData.id,
      title: itemData.title || "Untitled",
      artist: itemData.artist_title || "Unknown",
      imageUrl: itemData.thumbnail?.lqip || item.primary_image_url || "",
      date: itemData.date_display || "Unknown",
      medium: itemData.medium_display || "Unknown",
    });
  }

  return artworks;
};
