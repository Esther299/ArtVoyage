import axios from "axios";
import { Artwork } from "../types/types";

const IIIF_BASE_URL = "https://www.artic.edu/iiif/2";

export const fetchSingleArtworkChicagoDetails = async (
  id: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get(
      "https://api.artic.edu/api/v1/artworks/" + id,
      {
        params: {
          fields:
            "id,title,artist_display,artist_title,medium_display,image_id,date_display,description",
        },
      }
    );

    if (response.data && response.data.data) {
      const itemData = response.data.data;
      const imageUrl = itemData.image_id
        ? `${IIIF_BASE_URL}/${itemData.image_id}/full/843,/0/default.jpg`
        : "";

      const artistBio = itemData.artist_display.match(/\(([^)]+)\)/);
      const bio = artistBio ? artistBio[1] : null;

      return [
        {
          id: itemData.id,
          title: itemData.title,
          artist_title: itemData.artist_title,
          artist_bio: bio,
          date: itemData.date_display,
          medium_display: itemData.medium_display,
          imageUrl: imageUrl || "",
          source: "The Chicago Art Institute",
          objectUrl: "https://www.artic.edu/collection",
          description: itemData.description,
        },
      ];
    } else {
      console.error("Artwork not found.");
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
