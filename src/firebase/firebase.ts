// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw25yBHWnOZ0_HBZWBPuXUEf_occK4FpQ",
  authDomain: "artvoyage-469a7.firebaseapp.com",
  projectId: "artvoyage-469a7",
  storageBucket: "artvoyage-469a7.firebasestorage.app",
  messagingSenderId: "541351917404",
  appId: "1:541351917404:web:54160b1d171846a9b5b399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);