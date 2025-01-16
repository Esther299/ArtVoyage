import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase"; // Ensure correct path
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { Artwork, Exhibition } from "../types/types";


const useExhibition = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "exhibitions"),
        where("userId", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedExhibitions: Exhibition[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Exhibition[];
        setExhibitions(fetchedExhibitions);
      });
      return unsubscribe;
    }
  }, []);

  const addExhibition = async (exhibition: Omit<Exhibition, "id">) => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "exhibitions"), {
        ...exhibition,
        userId: user.uid,
      });
    }
  };

  const addArtworkToExhibition = async (
    exhibitionId: string,
    artwork: Artwork
  ) => {
    const user = auth.currentUser;
    if (user) {
      const q = query(
        collection(db, "exhibitions"),
        where("id", "==", exhibitionId),
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const existingArtworks = snapshot.docs[0].data().artworks || [];
        await updateDoc(docRef, {
          artworks: [...existingArtworks, artwork],
        });
      }
    }
  };

  return { exhibitions, addExhibition, addArtworkToExhibition };
};

export default useExhibition;
