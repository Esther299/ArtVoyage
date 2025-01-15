import axios from "axios";
import { Artwork } from "../types/types";

interface ChicagoArtworksResponse {
  data: {
    id: number;
  }[];
}

const API_URL = "https://api.artic.edu/api/v1/artworks/search";

export const fetchChicagoArtworks = async (
  searchQuery: string,
  queryParam: string
): Promise<Artwork[]> => {
  const query = {
    query: {
      bool: {
        must: [
          {
            match: { [queryParam]: searchQuery },
          },
          { term: { is_on_view: true } },
        ],
      },
    },
  };

  try {
    const response = await axios.post<ChicagoArtworksResponse>(API_URL, query, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data, "<--searchData");

    const searchData = response.data.data;

    const fetchArtworkData = searchData.map((item: any) =>
      axios.get(`https://api.artic.edu/api/v1/artworks/${item.id}`, {
        params: {
          fields: "id,title,artist_display,thumbnail,date_display,medium_display",
        },
      })
    );

    const artworkData = await Promise.all(fetchArtworkData);

    console.log(artworkData, "<---artworkData")
    const artworks: Artwork[] = artworkData.map((response) => {
      const itemData = response.data.data;
      console.log(itemData)
      return {
        id: itemData.id,
        title: itemData.title,
        artist_display: itemData.artist_display,
        imageUrl: itemData.thumbnail.lqip || "",
        date: itemData.date_display,
        medium_display: itemData.medium_display,
        source: "Chicago Art Museum",
      };
    });

    return artworks;
  } catch (error: any) {
    console.error(
      "Error fetching artworks from Chicago:",
      error.message || error
    );
    return [];
  }
};
