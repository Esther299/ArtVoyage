import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/ArtworkList";

const MuseumPage: React.FC = () => {
  const { museumName } = useParams();
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { setSelectedMuseum } = useMuseum();
  const [museumDisplay, setMuseumDisplay] = useState("")
  console.log("Museum Name:", museumName);

  useEffect(() => {
    if (museumName === "met") {
      setMuseumDisplay("The Metropolitan Museum of Art");
    } else if (museumName === "chicago") {
      setMuseumDisplay("The Art Institute of Chicago");
    } else {
      setMuseumDisplay("No museum selected");
    }
  }, [museumName]);

  const { artworks, loading, error, setArtworks } = useArtworks(
    museumName || "",
    query,
    type
  );

  useEffect(() => {
    if (museumName) {
      setQuery("");
      setType("artist");
      setArtworks([]);
      setSelectedMuseum(museumName);
    }
  }, [setQuery, setType, setArtworks, setSelectedMuseum, museumName]);


  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">{museumDisplay}</h1>
      <SearchBar />
      {loading && <div className="text-center mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <ArtworkList artworks={artworks} />
    </div>
  );
};

export default MuseumPage;
