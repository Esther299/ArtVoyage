import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useArtworksData } from "../context/ArtworksContext";
import { Artwork } from "../types/types";

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
        throw new Error("User not authenticated.");
      }
      setLoadingCollection(true);
      try {
        const userCollectionRef = doc(db, "collections", user.uid);

        const artworksSubcollectionRef = collection(
          userCollectionRef,
          "artworks"
        );

        const snapshot = await getDocs(artworksSubcollectionRef);
        const artworks = snapshot.docs.map(
          (doc) => ({ ...doc.data(), firestoreId: doc.id } as Artwork)
        );

        setCollectionState(artworks);
        setArtworks(artworks);
      } catch (error) {
        handleFirestoreError(error, "Error loading user collection.");
      } finally {
        setLoadingCollection(false);
      }
    };

    if (!authLoading) {
      loadCollection();
    }
  }, [user, authLoading]);

  const addToCollection = async (artwork: Artwork) => {
    if (!user) throw new Error("User not authenticated.");
    setLoadingCollection(true);

    try {
      const isArtworkExists = collectionState.some(
        (existingArtwork) => existingArtwork.id === artwork.id
      );

      if (isArtworkExists) {
        throw new Error("This artwork is already in your collection.");
      }

      const userCollectionRef = doc(db, "collections", user.uid);

      const artworksSubcollectionRef = collection(
        userCollectionRef,
        "artworks"
      );

      await addDoc(artworksSubcollectionRef, artwork);

      setCollectionState((prevState) => [...prevState, artwork]);
    } catch (error) {
      handleFirestoreError(error, "Error adding artwork to collection.");
    } finally {
      setLoadingCollection(false);
    }
  };

  const removeFromCollection = async (id: number) => {
    if (!user) throw new Error("User not authenticated.");
    setLoadingCollection(true);

    try {
      const userCollectionRef = doc(db, "collections", user.uid);

      const artworksSubcollectionRef = collection(
        userCollectionRef,
        "artworks"
      );

      const q = query(artworksSubcollectionRef, where("id", "==", id));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Artwork not found in your collection.");
      }

      const docId = querySnapshot.docs[0].id;

      const artworkRef = doc(db, "collections", user.uid, "artworks", docId);

      await deleteDoc(artworkRef);

      setCollectionState((prevState) =>
        prevState.filter((artwork) => artwork.id !== id)
      );
    } catch (error) {
      handleFirestoreError(error, "Error removing artwork from collection.");
    } finally {
      setLoadingCollection(false);
    }
  };

  const deleteUserCollection = async () => {
    if (!user) throw new Error("User not authenticated.");
    setLoadingCollection(true);

    try {
      const userCollectionRef = doc(db, "collections", user.uid);
      const artworksSubcollectionRef = collection(
        userCollectionRef,
        "artworks"
      );

      const snapshot = await getDocs(artworksSubcollectionRef);

      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      await deleteDoc(userCollectionRef);

      setCollectionState([]);
    } catch (error) {
      handleFirestoreError(error, "Error deleting user collection.");
    } finally {
      setLoadingCollection(false);
    }
  };

  return {
    collectionState,
    addToCollection,
    removeFromCollection,
    deleteUserCollection,
    loadingCollection,
  };
};
