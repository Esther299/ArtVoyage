import React, { useState } from "react";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";

interface SearchBarProps {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: { [key: string]: "asc" | "desc" };
  setSortDirection: React.Dispatch<
    React.SetStateAction<{ [key: string]: "asc" | "desc" }>
  >;
}

const SearchBar: React.FC<SearchBarProps> = ({
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setQuery } = useQuery();
  const { setType } = useType();
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [titleQuery, setTitleQuery] = useState<string>("");

  const handleSearchByArtist = () => {
    if (artistQuery.trim() === "") {
      setErrorMessage("Please enter an artist name.");
      return;
    }
    setQuery(artistQuery);
    setType("artist_title");
    setErrorMessage(null);
    setArtistQuery("");
  };

  const handleSearchByTitle = () => {
    if (titleQuery.trim() === "") {
      setErrorMessage("Please enter a title.");
      return;
    }
    setQuery(titleQuery);
    setType("title");
    setErrorMessage(null);
    setTitleQuery("");
  };

  const toggleSortDirection = (option: string) => {
    setSortDirection((prevDirection) => ({
      ...prevDirection,
      [option]: prevDirection[option] === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            value={artistQuery}
            onChange={(e) => setArtistQuery(e.target.value)}
            placeholder="Search by Artist"
            aria-label="Search by Artist"
          />
        </div>

        <div className="col-md-2 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearchByArtist}
            aria-label="Search by Artist"
          >
            Search by Artist
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            placeholder="Search by Title"
            aria-label="Search by Title"
          />
        </div>

        <div className="col-md-2 mb-3">
          <button
            className="btn btn-secondary w-100"
            onClick={handleSearchByTitle}
            aria-label="Search by Title"
          >
            Search by Title
          </button>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="input-group">
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
              className="btn btn-info"
              onClick={() => toggleSortDirection(sortOption)}
              aria-label="Toggle Sort Direction"
            >
              {sortDirection[sortOption] === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
    </div>
  );
};

export default SearchBar;
