import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

const useUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateUser = () => {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== userId) {
      throw new Error("Unauthorized access");
    }
  };

  const fetchUserData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      validateUser();
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setUserData(null);
        console.warn(`No user data found for userId: ${userId}`);
      }
    } catch (err) {
      setError("Error fetching user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const editUserData = async (updatedData: Record<string, any>) => {
    if (!userId) {
      setError("No userId provided.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      validateUser(); 
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, updatedData);
      setUserData((prevData) => ({ ...prevData, ...updatedData }));
    } catch (err) {
      setError("Error updating user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserData = async () => {
    if (!userId) {
      setError("No userId provided.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      validateUser();
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.delete();
      }
      setUserData(null);
      navigate("/login");
    } catch (err) {
      setError("Error deleting user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    userData,
    fetchUserData,
    editUserData,
    deleteUserData,
    loading,
    error,
  };
};

export default useUserData;
