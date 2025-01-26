import { useState, useEffect } from "react";
import { fetchSingleArtworkClevelandApi } from "../api/singleArtworkClevelandApi";
import { fetchSingleArtworkChicagoDetails } from "../api/singleArtworkChicagoApi";
import { Artwork } from "../types/types";

export const useSingleArtwork = (museum: string, id: string) => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No artwork ID provided.");
      return;
    }

    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);

      try {
        const artworkData =
          museum === "cleveland"
            ? await fetchSingleArtworkClevelandApi(id)
            : await fetchSingleArtworkChicagoDetails(id);

        setArtwork(artworkData[0]);
      } catch (err: any) {
        setError(err.response?.data?.error || "Error fetching the artwork.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id, museum]);

  return { artwork, setArtwork, loading, error };
};
