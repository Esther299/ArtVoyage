import React, { useState } from "react";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";
import Pagination from "./Pagination";

interface ArtworksListProps {
  artworks: Artwork[];
}

const ArtworkList: React.FC<ArtworksListProps> = ({ artworks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10;

  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = artworks.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork
  );

  const totalPages = Math.ceil(artworks.length / artworksPerPage);

  return (
    <div className="container my-4">
      {currentArtworks.length > 0 ? (
        <ul className="list-group">
          {currentArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </ul>
      ) : (
        <p>No artworks found</p>
      )}

      {totalPages > 1 && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="text-center mt-2">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtworkList;
