import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ArtworkList from "../components/ArtworkList";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

const Home: React.FC = () => {
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const querySnapshot = await getDocs(collection(db, "artworks"));
      const artworksList: any[] = [];
      querySnapshot.forEach((doc) => {
        artworksList.push(doc.data());
      });
      setArtworks(artworksList);
    };
    fetchArtworks();
  }, []);

  return (
    <div>
      <SearchBar />
      <FilterPanel />
      <ArtworkList artworks={artworks} />
    </div>
  );
};

export default Home;
