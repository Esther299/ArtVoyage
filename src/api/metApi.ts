import axios from "axios";
import { Artwork } from "../types/types";

export const fetchMetArtworkDetails = async (
  type: string,
  query: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get<Artwork[]>(
      `/.netlify/functions/fetchMetArtworkDetails`,
      {
        params: { type, q: query },
      }
    );

    console.log(response.data);
    // const resposeData = response.data
    //  const artworks = resposeData.map((object) => {
    //    return {
    //      id: object.objectID,
    //      title: object.title,
    //      artistName: object.artistDisplayName,
    //      image: object.primaryImage || "",
    //      date: object.objectDate || "Unknown",
    //      department: object.department,
    //      medium: object.medium,
    //      dimensions: object.dimensions,
    //      source: "Met Museum",
    //    };
    //  });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch artwork details.");
  }
};

export default fetchMetArtworkDetails;