import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { Artwork, Exhibition } from "../types/types";

const useExhibition = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    setError(err.message || fallbackMessage);
  };

  const getCurrentUser = () => {
    return auth.currentUser;
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
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
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const addExhibition = async (exhibition: Omit<Exhibition, "id">) => {
    const user = getCurrentUser();
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "exhibitions"), {
          ...exhibition,
          userId: user.uid,
        });
        setExhibitions((prevExhibitions) => [
          ...prevExhibitions,
          { id: docRef.id, ...exhibition, userId: user.uid },
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
    const user = getCurrentUser();
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
          console.log("Exhibition not found!");
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

  return { exhibitions, addExhibition, addArtworkToExhibition, loading, error };
};

export default useExhibition;
