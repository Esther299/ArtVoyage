import { useState, useEffect } from "react";
import { fetchMetArtworkDetails } from "../api/metApi";
import { fetchChicagoArtworks } from "../api/chicagoApi";
import { Artwork } from "../types/types";

export const useArtworks = (museum: string, query: string, type: string) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (!query.trim()) {
        return;
      }

      setLoading(true);
      setError(null);

      const typeMap: Record<string, string> = {
        artist: museum === "met" ? "artistOrCulture" : "artist_display",
        title: "title",
        medium: museum === "met" ? "medium" : "medium_display",
      };

      try {
        const artworkData =
          museum === "met"
            ? await fetchMetArtworkDetails(
                typeMap[type] || "artistOrCulture",
                query
              )
            : await fetchChicagoArtworks(
                query,
                typeMap[type] || "artist_display"
              );

        setArtworks(artworkData);
      } catch (err: any) {
        setError(
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
  }, [query, type, museum]);

  return { artworks, loading, error, setArtworks };
};
