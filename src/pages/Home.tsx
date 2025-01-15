import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/ArtworkList";
import { fetchChicagoArtworks } from "../api/chicagoApi";
import { fetchMetArtworkDetails } from "../api/metApi";
import { Artwork } from "../types/types";

// Helper function for debouncing
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Home: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedMuseum, setSelectedMuseum] = useState("met");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("artist");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchArtworksData = async () => {
      if (!debouncedQuery) {
        console.log("No debounced query, skipping API call.");
        return;
      }

      console.log(
        `Fetching artworks for query: "${debouncedQuery}" with type: "${type}"`
      );

      setLoading(true);
      setError(null);
      let fetchedArtworks: Artwork[] = [];

      const metTypeMap: Record<string, string> = {
        artist: "artistOrCulture",
        title: "title",
        medium: "medium",
      };

      const chicagoTypeMap: Record<string, string> = {
        artist: "artist_display",
        title: "title",
        medium: "medium_display",
      };

      try {
        if (selectedMuseum === "met") {
          console.log("Calling fetchMetArtworkDetails...");
          const metType = metTypeMap[type] || "artistOrCulture";
          fetchedArtworks = await fetchMetArtworkDetails(
            metType,
            debouncedQuery
          );
          console.log("artworks fetched")
        } else if (selectedMuseum === "chicago") {
          console.log("Calling fetchChicagoArtworks...");
          const chicagoType = chicagoTypeMap[type] || "artist_display";
          fetchedArtworks = await fetchChicagoArtworks(
            debouncedQuery,
            chicagoType
          );
          console.log("artworks fetched");
        }

        if (!fetchedArtworks || fetchedArtworks.length === 0) {
          console.log("No artworks found.");
          setError("No artworks found. Please try another search.");
        }

        setArtworks(fetchedArtworks);
      } catch (err: any) {
        console.error("Error fetching artworks:", err.message || err);
        setError(
          "An error occurred while fetching artworks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArtworksData();
  }, [selectedMuseum, debouncedQuery, type]);

  const handleSearch = (type: string, query: string) => {
    console.log(
      "Handle search triggered with query:",
      query,
      "and type:",
      type
    );
    setQuery(query);
    setType(type);
  };

  return (
    <div>
      <h1>Artworks Search</h1>
      <div>
        <select
          value={selectedMuseum}
          onChange={(e) => setSelectedMuseum(e.target.value)}
        >
          <option value="met">Metropolitan Museum of Art</option>
          <option value="chicago">Art Institute of Chicago</option>
        </select>
      </div>

      <SearchBar onSearch={handleSearch} selectedMuseum={selectedMuseum} />

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {artworks.length === 0 && !loading && !error && (
        <div>No artworks found. Try searching again.</div>
      )}

      <ArtworkList artworks={artworks} />
    </div>
  );
};

export default Home;
