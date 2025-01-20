const axios = require("axios");

const fetchMetArtworkDetails = async (type, query) => {
  try {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&${type}=true&q=${query}`;
    console.log(`Fetching data from: ${searchUrl}`);

    const searchResponse = await axios.get(searchUrl);
    const searchData = searchResponse.data;

    if (!searchData.objectIDs) {
      throw new Error("No results found for this search.");
    }

    const objectIDs = searchData.objectIDs;

    const fetchPromises = objectIDs.map(async (id) => {
      try {
        const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        const response = await axios.get(objectUrl);
        return response.data;
      } catch (error) {
        console.error(`Error fetching object with ID ${id}: ${error.message}`);
        return null;
      }
    });

    const responses = await Promise.all(fetchPromises);
    const validArtworks = responses.filter((artwork) => artwork !== null);

    if (validArtworks.length === 0) {
      throw new Error("No artworks found.");
    }

    return validArtworks;
  } catch (error) {
    console.error("Error fetching from Met:", error);
    throw error;
  }
};

export const handler = async (event, context) => {
  const query = event.queryStringParameters?.q || "";
  const type = event.queryStringParameters?.type || "";

  if (!query || !type) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query or type parameters" }),
    };
  }

  try {
    const data = await fetchMetArtworkDetails(type, query);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error in proxy function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
