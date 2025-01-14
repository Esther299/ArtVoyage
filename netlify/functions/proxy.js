const axios = require("axios");

const fetchMetArtworkDetails = async (type, query) => {
  try {
    // Construct the search API URL dynamically based on the type
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?${type}=true&q=${query}`;
    console.log(searchUrl)

    // Fetching object IDs from the Met search API
    const searchResponse = await axios.get(searchUrl);
    console.log(searchResponse, "<--searchResponse");

    const searchData = searchResponse.data;

    if (
      !searchData ||
      !searchData.objectIDs ||
      searchData.objectIDs.length === 0
    ) {
      throw new Error("No object IDs returned from search response");
    }

    const objectIDs = searchData.objectIDs;

    // Fetching artwork details from the Met object API
    const fetchPromises = objectIDs.map((id) =>
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      )
    );

    const responses = await Promise.all(fetchPromises);

    // Extract and return the data from each response
    const artworks = responses.map((response) => response.data);

    return artworks;
  } catch (error) {
    console.error("Error fetching data from the Met API:", error);
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

exports.handler = async (event, context) => {
  // Retrieve query parameters, and default to empty string if missing
  const query = event.queryStringParameters?.q || "";
  const type = event.queryStringParameters?.type || ""; // 'type' can be title, artist, or medium

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
      body: JSON.stringify(data), // Stringify the result
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
