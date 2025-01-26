import { useEffect, useState } from "react";
import { fetchMetApi } from "../api/metApi";
import { fetchChicagoArtworks } from "../api/chicagoApi";
import { useArtworksData } from "../context/ArtworksContext";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Artwork } from "../types/types";

export const useArtworks = (
  museum: string,
  queryText: string,
  type: string,
  isCollectionSearch: boolean
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { artworks, setArtworks } = useArtworksData();

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);

      if (isCollectionSearch && user) {
        const loadCollection = async () => {
          try {
            const userArtworksRef = collection(
              db,
              "user_artworks",
              user.uid,
              "artworks"
            );
            const snapshot = await getDocs(userArtworksRef);
            console.log("fetching search from collection")
            const allArtworks = snapshot.docs.map(
              (doc) => doc.data() as Artwork
            );
            const q = query(userArtworksRef, where(type, "==", queryText));
            
            const filteredArtworks = allArtworks.filter((artwork:any) =>
              artwork[type]?.toLowerCase().includes(queryText.toLowerCase())
            );
            setArtworks(filteredArtworks);
          } catch (err: any) {
            setError("Error loading collection: " + err.message);
          } finally {
            setLoading(false);
          }
        };

        loadCollection();
      } else {
        const typeMap: Record<string, string> = {
          artist: museum === "met" ? "artistOrCulture" : "artist_display",
          title: "title",
        };

        try {
          const artworkData =
            museum === "met"
              ? await fetchMetApi(typeMap[type] || "artistOrCulture", queryText)
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
      }
    };

    if (queryText) {
      fetchArtworks();
    } else {
      setArtworks([]);
    }
  }, [queryText, type, museum, isCollectionSearch, user, setArtworks]);

  return { artworks, loading, error, setArtworks };
};
