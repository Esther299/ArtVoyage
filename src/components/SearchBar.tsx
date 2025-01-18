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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search artworks..."
        aria-label="Search artworks"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Search type"
      >
        <option value="artist">Artist</option>
        <option value="title">Title</option>
        <option value="medium">Medium</option>
      </select>
      <button
        onClick={handleSearch}
        aria-label="Search"
      >
        Search
      </button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default SearchBar;
