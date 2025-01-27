import React, { useState } from "react";
import { useCollectionData } from "../hooks/useCollectionData";
import ArtworkList from "../components/Artworks/ArtworkList";
import { SortDirection } from "../utils/artworkSorting";
import { handleFirestoreError } from "../utils/handleErrors";
import { ErrorMessage } from "../components/ErrorMessage";

const Collection = () => {
  const {
    collectionState: artworks,
    removeFromCollection,
    loadingCollection,
  } = useCollectionData();

  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("artist");
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    artist: "asc",
    title: "asc",
    date: "asc",
  });

  const handleDelete = async (id: number | string) => {
    if (typeof id === "number") {
      try {
        if (removeFromCollection) {
          await removeFromCollection(id);
        } else {
          console.error("removeFromCollection is not defined.");
        }
      } catch (error) {
        const errorMessage = handleFirestoreError(
          error,
          "Failed to remove from collection"
        );
        setError(errorMessage);
      }
    }
  };

  const toggleSortDirection = (option: string) => {
    setSortDirection((prevDirection) => ({
      ...prevDirection,
      [option]: prevDirection[option] === "asc" ? "desc" : "asc",
    }));
  };

  if (loadingCollection) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">My Collection</h1>
      {error && <ErrorMessage message={error} />}

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

      <ArtworkList
        artworks={artworks}
        sortOption={sortOption}
        sortDirection={sortDirection}
        handleDelete={handleDelete}
        showDeleteButton={true}
        showSearchFunctions={false}
      />
    </div>
  );
};

export default Collection;
