import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ArtworkList from "../components/ArtworkList";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

export const Home: React.FC = () => {
  const [, setArtworks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

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
      <SearchBar onSearch={handleSearch} />
      <FilterPanel />
      <ArtworkList searchQuery={searchQuery} />
    </div>
  );
};

