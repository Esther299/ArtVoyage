import React, { useState } from "react";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";

interface SearchBarProps {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ sortOption, setSortOption }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setQuery } = useQuery();
  const { setType } = useType();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setErrorMessage("Please enter a search query.");
      return;
    }
    setQuery(searchQuery);
    setType(searchType);
    setErrorMessage(null);
    setSearchQuery("");
    setSearchType("artist");
  };

  return (
    <div className="container my-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks..."
          aria-label="Search artworks"
        />
        <select
          className="form-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          aria-label="Search type"
        >
          <option value="artist">Artist</option>
          <option value="title">Title</option>
        </select>
        <select
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          aria-label="Sort by"
        >
          <option value="artist">Sort by Artist</option>
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Date</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          aria-label="Search"
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </div>
  );
};

export default SearchBar;
