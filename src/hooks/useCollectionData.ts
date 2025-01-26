import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Artwork } from "../types/types";
import { useArtworksData } from "../context/ArtworksContext";
import { useAuth } from "../context/AuthContext";

export const useCollectionData = () => {
  const [collectionState, setCollectionState] = useState<Artwork[]>([]);
  const [loadingCollection, setLoadingCollection] = useState<boolean>(false);

  const { user, loading: authLoading } = useAuth();
  const { setArtworks } = useArtworksData();

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    throw new Error(err.message || fallbackMessage);
  };

  useEffect(() => {
    const loadCollection = async () => {
      if (!user) {
        setLoadingCollection(false);
        return;
      }
      setLoadingCollection(true);
      try {
        const userArtworksRef = collection(
          db,
          "user_artworks",
          user.uid,
          "artworks"
        );
        const snapshot = await getDocs(userArtworksRef);
        const artworks = snapshot.docs.map((doc) => doc.data() as Artwork);
        setCollectionState(artworks);
        setArtworks(artworks)
      } catch (error) {
        console.error("Error loading user collection:", error);
      } finally {
        setLoadingCollection(false);
      }
    };

    if (!authLoading) {
      loadCollection();
    }
  }, [user, authLoading]);

  const addToCollection = async (artwork: Artwork) => {
    if (!user) return;
    const isArtworkExists = collectionState.some(
      (existingArtwork) => existingArtwork.id === artwork.id
    );

    if (isArtworkExists) {
      console.log("This artwork is already in your collection.");
      return;
    }

    try {
      const userArtworksRef = collection(
        db,
        "user_artworks",
        user.uid,
        "artworks"
      );
      await addDoc(userArtworksRef, artwork);
      setCollectionState((prevState) => [...prevState, artwork]);
      console.log("Artwork added to collection");
    } catch (error) {
      console.error("Error adding artwork to user collection:", error);
    }
  };

  const removeFromCollection = async (id: number) => {
    if (!user) return;
    try {
      const artworkRef = doc(
        db,
        "user_artworks",
        user.uid,
        "artworks",
        id.toString()
      );
      await deleteDoc(artworkRef);
      setCollectionState((prevState) =>
        prevState.filter((artwork) => artwork.id !== id)
      );
    } catch (error) {
      console.error("Error removing artwork from user collection:", error);
    }
  };

  return {
    collectionState,
    addToCollection,
    removeFromCollection,
    loadingCollection,
  };
};