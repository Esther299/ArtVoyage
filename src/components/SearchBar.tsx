import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (type: string, query: string, museum: string) => void;
  selectedMuseum: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, selectedMuseum }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("artist");

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    onSearch(searchType, searchQuery, selectedMuseum);
    setSearchQuery(""); // Clear the input after search
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search artworks..."
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="artistOrCulture">Artist</option>
        <option value="title">Title</option>
        <option value="medium">Medium</option>
      </select>
      <button onClick={handleSearch} disabled={!searchQuery.trim()}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
