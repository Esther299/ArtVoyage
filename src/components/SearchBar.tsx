import React, { useState, useEffect } from "react";
import { useMuseum } from "../context/MuseumContext";

interface SearchBarProps {
  onSearch: (type: string, query: string, museum: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("artist");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { selectedMuseum } = useMuseum();

  useEffect(() => {
    setSearchQuery("");
    setErrorMessage(null);
  }, [selectedMuseum]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setErrorMessage("Please enter a search query.");
      return;
    }
    onSearch(searchType, searchQuery, selectedMuseum);
    setSearchQuery("");
    setErrorMessage(null);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search artworks..."
        aria-label="Search artworks"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        aria-label="Search type"
      >
        <option value="artist">Artist</option>
        <option value="title">Title</option>
        <option value="medium">Medium</option>
      </select>
      <button
        onClick={handleSearch}
        disabled={!searchQuery.trim() || !!errorMessage}
        aria-label="Search"
      >
        Search
      </button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default SearchBar;
