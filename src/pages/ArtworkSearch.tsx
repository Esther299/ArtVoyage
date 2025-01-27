import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/Artworks/ArtworkList";
import { SortDirection } from "../utils/artworkSorting";

const SearchPage: React.FC = () => {
  const { museumName } = useParams();
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { setSelectedMuseum } = useMuseum();
  const [museumDisplay, setMuseumDisplay] = useState("");
  const [sortOption, setSortOption] = useState<string>("artist");
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    artist: "asc",
    title: "asc",
    date: "asc",
  });

  const { artworks, loading, error, setArtworks } = useArtworks(
    museumName || "",
    query,
    type
  );

  useEffect(() => {
    const getMuseumDisplayName = (museumKey: string | undefined): string => {
      const museumDisplayMap: Record<string, string> = {
        cleveland: "The Cleveland Museum of Art",
        chicago: "The Art Institute of Chicago",
      };
      return museumKey
        ? museumDisplayMap[museumKey] || "Unknown Museum"
        : "Collection";
    };

    setMuseumDisplay(getMuseumDisplayName(museumName));
  }, [museumName]);

  useEffect(() => {
    setQuery("");
    setType("artist_title");
    setSortOption("artist");
    setSortDirection({
      artist: "asc",
      title: "asc",
      date: "asc",
    });
    setArtworks([]);
    if (museumName) {
      setSelectedMuseum(museumName);
    }
  }, [
    setQuery,
    setType,
    setSortOption,
    setSortDirection,
    setArtworks,
    setSelectedMuseum,
    museumName,
  ]);

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
      {error && (
        <div className="alert alert-danger mt-3">
          <p>Error: {error}</p>
          <button onClick={() => setQuery(query)}>Retry</button>
        </div>
      )}
      {artworks.length === 0 && <p>Start your search here </p>}
      {!loading && !error && (
        <ArtworkList
          artworks={artworks}
          sortOption={sortOption}
          sortDirection={sortDirection}
          showSearchFunctions={true}
          showDeleteButton={false}
        />
      )}
    </div>
  );
};

export default SearchPage;
