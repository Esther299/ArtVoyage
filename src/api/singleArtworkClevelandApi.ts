import axios from "axios";
import { Artwork } from "../types/types";

const API_URL = "https://openaccess-api.clevelandart.org/api/artworks";

export const fetchSingleArtworkClevelandApi = async (
  id: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/${id}`
    );

    if (response.data) {
      const itemData = response.data.data;

      const artistBio =
        itemData.creators[0]?.description.match(/\(([^)]+)\)/)?.[1] || "";
      const artistName =
        itemData.creators[0]?.description.match(/^([^\(]+)/)?.[1] ||
        "Unknown Artist";
      const cleanedDate =
        itemData.creation_date?.replace(/\b(c\.|circa)\s?/gi, "") || "";
        let image = "";
        if (typeof itemData.images === "string") {
          image = itemData.images;
        } else if (itemData.images && itemData.images.web) {
          image = itemData.images.web.url;
        }

      return [
        {
          id: itemData.id,
          title: itemData.title,
          artist_title: artistName,
          artist_bio: artistBio,
          date: cleanedDate,
          medium_display: itemData.type + " " + itemData.technique,
          imageUrl: image,
          source: "cleveland",
          objectUrl: itemData.url,
          description: itemData.description,
          copyright: itemData.copyright || "The Cleveland Museum of Art",
        },
      ];
    } else {
      throw new Error("Artwork not found.");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Axios error fetching artwork from Chicago: ${error.message}`
      );
    } else {
      throw new Error(
        `Unexpected error fetching artwork from Chicago: ${error.message}`
      );
    }
  }
};
