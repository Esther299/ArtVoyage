import React, { useState } from "react";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";



const SearchBar: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setQuery} = useQuery();
  const {type, setType} =useType();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setErrorMessage("Please enter a search query.");
      return;
    }
    setQuery(searchQuery);
    setErrorMessage(null);
    setSearchQuery("");
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
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Search type"
        >
          <option value="artist">Artist</option>
          <option value="title">Title</option>
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
