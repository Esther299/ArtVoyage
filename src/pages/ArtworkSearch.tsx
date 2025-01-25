import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import { useCollectionData } from "../hooks/useCollectionData";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/ArtworkList";

const SearchPage: React.FC = () => {
  const { museumName } = useParams();
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { setSelectedMuseum } = useMuseum();
  const [museumDisplay, setMuseumDisplay] = useState("");
  const [sortOption, setSortOption] = useState<string>("artist");
  const [sortDirection, setSortDirection] = useState<{
    [key: string]: "asc" | "desc";
  }>({
    artist: "asc",
    title: "asc",
    date: "asc",
  });

  const { collectionState, loadingCollection, searchCollection } =
    useCollectionData(query, type);

  useEffect(() => {
    const museumDisplayMap: Record<string, string> = {
      met: "The Metropolitan Museum of Art",
      chicago: "The Art Institute of Chicago",
    };
    if (museumName) {
      setMuseumDisplay(museumDisplayMap[museumName] || "");
    }
  }, [museumName]);

  const { loading, error, setArtworks } = useArtworks(
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
    } else {
      setArtworks([]);
    }
  }, [setQuery, setType, setArtworks, setSelectedMuseum, museumName]);

  useEffect(() => {
    searchCollection();
  }, [query, type]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 fs-1 py-5">
        {museumDisplay || "Collection"}
      </h1>
      <SearchBar
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      {loading && <div className="text-center mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">Error: {error}</div>}
      <ArtworkList sortOption={sortOption} sortDirection={sortDirection} />
    </div>
  );
};

export default SearchPage;
