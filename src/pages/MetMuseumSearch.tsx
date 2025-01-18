import React, { useEffect } from "react";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/ArtworkList";

const MetMuseumPage: React.FC = () => {
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { selectedMuseum, setSelectedMuseum } = useMuseum();

  const { artworks, loading, error, setArtworks } = useArtworks(selectedMuseum, query, type);

  useEffect(() => {
    setQuery("");
    setType("artist");
    setArtworks([]);
    setSelectedMuseum("met")
  }, [ setQuery, setType]);


  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Met museum</h1>
      <SearchBar />
      {loading && <div className="text-center mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <ArtworkList artworks={artworks} />
    </div>
  );
};

export default MetMuseumPage;
