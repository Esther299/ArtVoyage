import { useEffect, useState } from "react";
import { fetchMetApi } from "../api/metApi";
import { fetchChicagoArtworks } from "../api/chicagoApi";
import { useArtworksData } from "../context/ArtworksContext";

export const useArtworks = (museum: string, query: string, type: string) => {
  const { artworks, setArtworks} = useArtworksData(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);

      const typeMap: Record<string, string> = {
        artist: museum === "met" ? "artistOrCulture" : "artist_display",
        title: "title",
      };

      try {
        const artworkData =
          museum === "met"
            ? await fetchMetApi(typeMap[type] || "artistOrCulture", query)
            : await fetchChicagoArtworks(
                query,
                typeMap[type] || "artist_display"
              );

        setArtworks(artworkData);
      } catch (err: any) {
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching artworks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (museum && query) {
      fetchArtworks();
    } else {
      setArtworks([]);
    }
  }, [query, type, museum, setArtworks]);

  return { artworks, loading, error, setArtworks };
};
