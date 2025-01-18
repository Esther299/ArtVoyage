import React, { useState } from "react";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";

interface ArtworksListProps {
  artworks: Artwork[];
}

const ArtworkList: React.FC<ArtworksListProps> = ({ artworks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10;

  // Calculate the artworks to display based on current page
  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = artworks.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
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
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className="page-item">
                <button
                  className={`page-link ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={index + 1 === currentPage}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ArtworkList;
