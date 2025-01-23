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
import { Artwork, Exhibition } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { getRandomImage } from "../utils/randomImage";

const useExhibitionData = () => {
  const { user, loading: authLoading } = useAuth();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    setError(err.message || fallbackMessage);
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
          setError("An exhibition with this name already exists.");
          return;
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
      setError("User not authenticated.");
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
          await updateDoc(exhibitionRef, {
            artworks: [...existingArtworks, artwork],
          });
        } else {
          setError("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while adding the artwork."
        );
      }
    } else {
      setError("User not authenticated.");
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
          setError("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while editing the exhibition."
        );
      }
    } else {
      setError("User not authenticated.");
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
          setError("Exhibition not found.");
        }
      } catch (err) {
        handleFirestoreError(
          err,
          "An error occurred while deleting the artwork."
        );
      }
    } else {
      setError("User not authenticated.");
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
      setError("User not authenticated.");
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
    error,
  };
};

export default useExhibitionData;
