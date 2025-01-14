import axios from "axios";
import { Artwork } from "../types/types";

const API_URL = "https://api.artic.edu/api/v1/artworks/search";

interface SearchQuery {
  query: {
    bool: {
      must: Array<{ match: { [key: string]: string } } | {}>;
    };
  };
}

interface ChicagoArtworksResponse {
  data: Artwork[];
}

export const fetchChicagoArtworks = async (
  searchQuery: string,
  searchType: string
): Promise<Artwork[]> => {
  const query: SearchQuery = {
    query: {
      bool: {
        must: [
          searchType === "artistor"
            ? { match: { artist_display: searchQuery } }
            : {},
          searchType === "title" ? { match: { title: searchQuery } } : {},
          searchType === "medium"
            ? { match: { medium_display: searchQuery } }
            : {},
        ].filter(Boolean),
      },
    },
  };

  try {
    const response = await axios.post<ChicagoArtworksResponse>(API_URL, query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data || [];
  } catch (error: any) {
    console.error(
      "Error fetching artworks from Chicago:",
      error.response?.data || error.message
    );
    return [];
  }
};
