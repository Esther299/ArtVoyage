import axios from "axios";
import { Artwork } from "../types/types";

interface ChicagoArtworksResponse {
  data: {
    id: number;
    image_id: string;
  }[];
}

const API_URL = "https://api.artic.edu/api/v1/artworks/search";
const IIIF_BASE_URL = "https://www.artic.edu/iiif/2";

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

    const searchData = response.data.data;

    const fetchArtworkData = searchData.map((item) =>
      axios.get(`https://api.artic.edu/api/v1/artworks/${item.id}`, {
        params: {
          fields:
            "id,title,artist_display,artist_title,medium_display,image_id,date_display,description,copyright_notice",
        },
      })
    );

    const artworkData = await Promise.all(fetchArtworkData);

    const artworks: Artwork[] = artworkData.map((response) => {
      
      const itemData = response.data.data;
      const imageUrl = itemData.image_id
        ? `${IIIF_BASE_URL}/${itemData.image_id}/full/843,/0/default.jpg`
        : "";

        const artistBio = itemData.artist_display.match(/\(([^)]+)\)/);
        const bio = artistBio ? artistBio[1] : null;

      return {
        id: itemData.id,
        title: itemData.title,
        artist_title: itemData.artist_title,
        artist_bio: bio,
        date: itemData.date_display,
        medium_display: itemData.medium_display,
        imageUrl: imageUrl || "",
        source: "chicago",
        objectUrl: "https://www.artic.edu/collection",
        description: itemData.description,
        copyright: itemData.copyright_notice || "The Chicago Art Institute",
      };
    });
    

    return artworks;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Axios error fetching artworks from Chicago: ${error.message}
        `
      );
    } else {
      throw new Error(
        `Unexpected error fetching artworks from Chicago: ${error} `
      );
    }
  }
};
