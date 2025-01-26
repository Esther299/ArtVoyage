import axios from "axios";
import { Artwork } from "../types/types";

export const fetchSingleArtworkClevelandApi = async (
  id: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks" + id
    );

    if (response.data) {
      const itemData = response.data.data;

      const artistBio =
        itemData.creators[0]?.description.match(/\(([^)]+)\)/)?.[1] || "";
      const artistName =
        itemData.creators[0]?.description.match(/^([^\(]+)/)?.[1] ||
        "Unknown Artist";
        console.log(itemData)

      return [
        {
          id: itemData.id,
          title: itemData.title,
          artist_title: artistName,
          artist_bio: artistBio,
          date: itemData.creation_date,
          medium_display: itemData.type + " " + itemData.technique,
          imageUrl: itemData.images?.[0]?.web?.url || "",
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
