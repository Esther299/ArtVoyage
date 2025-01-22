import axios from "axios";
import { Artwork } from "../types/types";

export const fetchMetApi = async (
  type: string,
  query: string
): Promise<Artwork[]> => {
  try {
    const response = await axios.get<Artwork[]>(
      "/.netlify/functions/fetchMetArtworkDetails",
      {
        params: { type, q: query },
      }
    );

    const responseData = response.data;
    const artworks = responseData.map((object: any) => {
      const artist_name = object.artistDisplayName || "an unknown Artist";
      const artist_nationality =object.artistNationality || "Unknown nationality";
      const date = object.objectDate || "an undetermined time";
      const medium = object.medium || "an artistic medium";
      const dimensions = object.dimensions || "unknown dimensions";
      const classification =object.classification || "an extraordinary artwork";
      const department = object.department || "an unspecified department";
      const objectUrl =object.objectURL || "https://www.metmuseum.org/art/collection";
      const creditLine = object.creditLine || "an anonymous donor";
      const period = object.period || "an unspecified period";
      const geography = object.geographyType || "a broad location";
      const city = object.city || "an unknown city";
      const country = object.country || "an unknown country";

      const dimensionsInParentheses = dimensions.match(/\(([^)]+)\)/);
      const formattedDimensions = dimensionsInParentheses
        ? dimensionsInParentheses[1]
        : dimensions;

      const description = `<p>${object.title} is a ${classification.toLowerCase()} by ${artist_name} (${artist_nationality}). Created in ${date}, this ${medium} artwork measures approximately <i>${formattedDimensions}</i>. It is part of the ${department} department at the Metropolitan Museum of Art. This work belongs to the period of <em>${period}</em>, and its geographical origins are linked to <em>${geography}</em>, with specific ties to <em>${city}</em>, ${country}. The artwork is credited to ${creditLine}. Learn more about this artwork <a href="${objectUrl}" target="_blank" rel="noopener noreferrer">here</a></p>`;

      return {
        id: object.objectID,
        title: object.title,
        artist_title: object.artistDisplayName,
        artist_bio: object.artistDisplayBio,
        date: object.objectDate,
        medium_display: object.medium,
        imageUrl: object.primaryImage || "",
        source: "The Metropolitan Museum of Art",
        objectUrl: object.objectURL,
        description,
      };
    });
    return artworks;
  } catch (error) {
    throw error;
  }
};
