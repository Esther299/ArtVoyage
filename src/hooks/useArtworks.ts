import { useEffect, useState } from "react";
import { fetchClevelandArtworks } from "../api/clevelandApi";
import { fetchChicagoArtworks } from "../api/chicagoApi";
import { useArtworksData } from "../context/ArtworksContext";
import { useAuth } from "../context/AuthContext";

export const useArtworks = (
  museum: string,
  queryText: string,
  type: string
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { artworks, setArtworks } = useArtworksData();

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);
      const typeMap: Record<string, string> = {
        artist: museum === "cleveland" ? "artist" : "artist_display",
        title: "title",
      };

      try {
        const artworkData =
          museum === "cleveland"
            ? await fetchClevelandArtworks(queryText, typeMap[type] || "artist")
            : await fetchChicagoArtworks(
                queryText,
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

    if (queryText) {
      fetchArtworks();
    } else {
      setArtworks([]);
    }
  }, [queryText, type, museum, user, setArtworks]);

  return { artworks, loading, error, setArtworks };
};
