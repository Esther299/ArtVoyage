const axios = require("axios");

const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

const fetchMetSingleArtworkDetails = async (id) => {
  try {
    const objectUrl = `${MET_API_BASE_URL}/objects/${id}`;
    const response = await axios.get(objectUrl);
    if (response.data) {
      return [response.data];
    } else {
      console.error("Artwork not found.");
      throw new Error("Artwork not found.");
    }
  } catch (error) {
    console.error("Error fetching from Met API:", error.message);
    throw new Error("Failed to fetch data from the Met Museum API.");
  }
};

export const handler = async (event, context) => {
  const id = event.queryStringParameters?.id || null;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query or artworkId parameter." }),
    };
  }

  try {
    const data = await fetchMetSingleArtworkDetails(id);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error in handler function:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
