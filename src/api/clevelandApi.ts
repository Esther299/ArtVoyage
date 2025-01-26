import axios from "axios";
import { Artwork } from "../types/types";

interface CreatorResponse {
  data: {
    id: number;
    artworks: { id: number }[];
  }[];
}

interface ArtworkDetailResponse {
  data: {
    id: number;
    title: string;
    technique: string;
    type: string;
    creators: { description: string }[];
    creation_date: string;
    images: { web?: { url: string } } | string;
    url: string;
    description: string;
    copyright: string;
  } | null;
}

interface SearchResponse {
  data: {
    id: number;
  }[];
}

const API_URL = "https://openaccess-api.clevelandart.org/api/artworks";
const CREATOR_URL = "https://openaccess-api.clevelandart.org/api/creators";

const fetchArtworkDetails = async (
  artworkId: number
): Promise<Artwork | null> => {
  try {
    const response = await axios.get<ArtworkDetailResponse>(
      `${API_URL}/${artworkId}`
    );

    if (response.data && response.data.data) {
      const artwork = response.data.data;

      console.log(artwork)
      const artistBio =
        artwork.creators[0]?.description.match(/\(([^)]+)\)/)?.[1] || "";
      const artistName =
        artwork.creators[0]?.description.match(/^([^\(]+)/)?.[1] ||
        "Unknown Artist";
       let image = "";
       if (typeof artwork.images === "string") {
         image = artwork.images;
       } else if (artwork.images && artwork.images.web) {
         image = artwork.images.web.url;
       }

      return {
        id: artwork.id,
        title: artwork.title,
        artist_title: artistName,
        artist_bio: artistBio,
        date: artwork.creation_date,
        medium_display: artwork.type + " " + artwork.technique,
        imageUrl: image,
        source: "cleveland",
        objectUrl: artwork.url,
        description: artwork.description,
        copyright: artwork.copyright || "The Cleveland Museum of Art",
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return null;
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error("An error occured for this artwork");
    }
  }
};

export const fetchClevelandArtworks = async (
  searchQuery: string,
  queryParam: string
): Promise<Artwork[]> => {
  try {
    const encodedQuery = encodeURIComponent(searchQuery);

    let searchData;

    if (queryParam === "title") {
      const response = await axios.get<SearchResponse>(
        `${API_URL}?title=${encodedQuery}`
      );
      console.log(`${API_URL}?title=${encodedQuery}`);
      searchData = response.data.data;
    } else if (queryParam === "artist") {
      const response = await axios.get<CreatorResponse>(
        `${CREATOR_URL}?name=${encodedQuery}`
      );
      console.log(`${CREATOR_URL}?name=${encodedQuery}`);
      searchData = response.data.data[0]?.artworks || [];
    }
    if (searchData) {
      const fetchArtworkData = searchData.map(async (item) => {
        return await fetchArtworkDetails(item.id);
      });

      const artworks = await Promise.all(fetchArtworkData);

      return artworks.filter((artwork) => artwork !== null) as Artwork[];
    } else {
      throw new Error("No artworks found.");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error fetching artworks: ${error.message}`);
    } else {
      throw new Error(`Unexpected error fetching artworks: ${error}`);
    }
  }
};
