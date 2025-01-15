import React, { useState } from "react";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";

interface ArtworksListProps {
  artworks: Artwork[];
}

const ArtworkList: React.FC<ArtworksListProps> = ({ artworks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10; // Adjust as needed

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
    <div>
      {currentArtworks.length > 0 ? (
        <ul>
          {currentArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </ul>
      ) : (
        <p>No artworks found</p>
      )}

      <div>
        {totalPages > 1 && (
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  disabled={index + 1 === currentPage}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;
