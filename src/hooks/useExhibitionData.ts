import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { getRandomImage } from "../utils/randomImage";
import { Artwork, Exhibition } from "../types/types";

export const useExhibitionData = () => {
  const { user, loading: authLoading } = useAuth();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    throw new Error(err.message || fallbackMessage);
  };

  useEffect(() => {
    const fetchUserExhibitions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const q = query(
          collection(db, "exhibitions"),
          where("userId", "==", user.uid)
        );

        const unsubscribeFirestore = onSnapshot(
          q,
          (snapshot) => {
            setLoading(false);
            const fetchedExhibitions: Exhibition[] = snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            ) as Exhibition[];
            setExhibitions(fetchedExhibitions);
          },
          (err) => {
            setLoading(false);
            handleFirestoreError(err, "Failed to fetch exhibitions.");
          }
        );
        return () => {
          unsubscribeFirestore();
        };
      }
    };

    if (!authLoading) {
      fetchUserExhibitions().catch((err) => {
        setLoading(false);
        handleFirestoreError(err, "Failed to fetch user exhibitions.");
      });
    }
  }, [user, authLoading]);

  const addExhibition = async (
    exhibition: Omit<Exhibition, "id" | "image">
  ) => {
    if (user) {
      try {
        const existingExhibitionsQuery = query(
          collection(db, "exhibitions"),
          where("name", "==", exhibition.name),
          where("userId", "==", user.uid)
        );
        const existingExhibitionsSnapshot = await getDocs(
          existingExhibitionsQuery
        );

        if (!existingExhibitionsSnapshot.empty) {
          throw new Error(
            "An exhibition with this name already exists. Please try another name"
          );
        }

        const randomImage = getRandomImage();

        const docRef = await addDoc(collection(db, "exhibitions"), {
          ...exhibition,
          image: randomImage,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        setExhibitions((prevExhibitions) => [
          ...prevExhibitions,
          {
            id: docRef.id,
            ...exhibition,
            image: randomImage,
            userId: user.uid,
          },
        ]);
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while adding the exhibition."
        );
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const addArtworkToExhibition = async (
    exhibitionId: string,
    artwork: Artwork
  ) => {
    if (user) {
      try {
        const exhibitionRef = doc(db, "exhibitions", exhibitionId);
        const docSnapshot = await getDoc(exhibitionRef);

        if (docSnapshot.exists()) {
          const existingArtworks = docSnapshot.data()?.artworks || [];

          const artworkExists = existingArtworks.some(
            (existingArtwork: Artwork) => existingArtwork.id === artwork.id
          );

          if (artworkExists) {
            throw new Error(
              "This artwork has already been added to this exhibition. Please choose a different artwork or a different exhibition"
            );
          }

          await updateDoc(exhibitionRef, {
            artworks: [...existingArtworks, artwork],
          });
        } else {
          throw new Error("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while adding the artwork."
        );
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const editExhibition = async (
    exhibitionId: string,
    updatedFields: Partial<Omit<Exhibition, "id">>
  ) => {
    if (user) {
      try {
        const exhibitionRef = doc(db, "exhibitions", exhibitionId);
        const docSnapshot = await getDoc(exhibitionRef);

        if (docSnapshot.exists()) {
          await updateDoc(exhibitionRef, updatedFields);
          setExhibitions((prev) =>
            prev.map((exhibition) =>
              exhibition.id === exhibitionId
                ? { ...exhibition, ...updatedFields }
                : exhibition
            )
          );
        } else {
          throw new Error("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while editing the exhibition."
        );
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const deleteArtworkFromExhibition = async (
    exhibitionId: string,
    artworkId: number
  ) => {
    if (user) {
      try {
        const exhibitionRef = doc(db, "exhibitions", exhibitionId);
        const docSnapshot = await getDoc(exhibitionRef);

        if (docSnapshot.exists()) {
          const existingArtworks = docSnapshot.data()?.artworks || [];
          const updatedArtworks = existingArtworks.filter(
            (artwork: Artwork) => artwork.id !== artworkId
          );
          await updateDoc(exhibitionRef, {
            artworks: updatedArtworks,
          });
          setExhibitions((prev) =>
            prev.map((exhibition) =>
              exhibition.id === exhibitionId
                ? { ...exhibition, artworks: updatedArtworks }
                : exhibition
            )
          );
        } else {
          throw new Error("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while deleting the artwork."
        );
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const deleteExhibition = async (exhibitionId: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "exhibitions", exhibitionId));
        setExhibitions((prev) =>
          prev.filter((exhibition) => exhibition.id !== exhibitionId)
        );
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while deleting the exhibition."
        );
      }
    } else {
      throw new Error("User not authenticated.");
    }
  };

  const deleteUserExhibitions = async () => {
    if (!user) throw new Error("User not authenticated.");
    setLoading(true);

    try {
      const q = query(
        collection(db, "exhibitions"),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("No exhibitions found to delete.");
      }

      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      setExhibitions([]);
    } catch (err) {
      handleFirestoreError(
        err,
        "An error occurred while deleting all exhibitions."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    exhibitions,
    addExhibition,
    addArtworkToExhibition,
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
    loading,
    deleteUserExhibitions,
  };
};
