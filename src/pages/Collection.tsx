import React, { useState } from "react";
import { useCollectionData } from "../hooks/useCollectionData";
import { paginate } from "../utils/paginating";
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
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10;

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

  const { paginatedItems: currentArtworks, totalPages } = paginate(
    artworks,
    currentPage,
    artworksPerPage
  );

  if (loadingCollection) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">My Collection</h1>
      {error && <ErrorMessage message={error} />}

      <ArtworkList
        artworks={currentArtworks}
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
