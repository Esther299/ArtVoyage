const axios = require("axios");

const fetchMetArtworkDetails = async (type, query) => {
  try {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?${type}=true&q=${query}`;
    console.log(`Fetching data from: ${searchUrl}`);

    // Fetch object IDs from the Met search API
    const searchResponse = await axios.get(searchUrl);
    const searchData = searchResponse.data;

    if (
      !searchData ||
      !searchData.objectIDs ||
      searchData.objectIDs.length === 0
    ) {
      throw new Error("No object IDs returned from search response");
    }

    // Limit to 200 object IDs
    const objectIDs = searchData.objectIDs.slice(0, 200);

    // Fetch artwork details for each object ID
    const fetchPromises = objectIDs.map(async (id) => {
      try {
        const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
        const response = await axios.get(objectUrl);
        return response.data; // Return the artwork data if valid
      } catch (error) {
        // Log the error and skip this object if it's not valid
        console.error(`Error fetching object with ID ${id}: ${error.message}`);
        return null; // Return null to indicate an invalid object
      }
    });

    const responses = await Promise.all(fetchPromises);

    // Filter out null values (invalid objects) and limit the results to 200
    const validArtworks = responses
      .filter((artwork) => artwork !== null)
      .slice(0, 200);

    if (validArtworks.length === 0) {
      throw new Error("No valid artworks found.");
    }

    console.log("Fetched valid artworks:", validArtworks);
    return validArtworks;
  } catch (error) {
    console.error("Error fetching data from the Met API:", error);
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

exports.handler = async (event, context) => {
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
      body: JSON.stringify({ error: "Unable to fetch data" }),
    };
  }
};
