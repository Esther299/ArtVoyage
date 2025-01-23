import React, { useState } from "react";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";
import Pagination from "./Pagination";

interface ArtworksListProps {
  artworks: Artwork[];
  sortOption: string;
  sortDirection: { [key: string]: "asc" | "desc" };
}

const ArtworkList: React.FC<ArtworksListProps> = ({ artworks, sortOption, sortDirection }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10;

  const sortedArtworks = [...artworks].sort((a, b) => {
    if (sortOption === "artist") {
      return sortDirection.artist === "asc"
        ? a.artist_title.localeCompare(b.artist_title)
        : b.artist_title.localeCompare(a.artist_title);
    } else if (sortOption === "title") {
      return sortDirection.title === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortOption === "date") {
      return sortDirection.date === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });


  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = sortedArtworks.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork
  );

  const totalPages = Math.ceil(artworks.length / artworksPerPage);

  return (
    <div className="container my-4">
      {currentArtworks.length > 0 ? (
        <ul
          className="d-flex flex-wrap list-unstyled"
          style={{ gap: "1.5rem", justifyContent: "center" }}
        >
          {currentArtworks.map((artwork) => (
            <li
              key={artwork.id}
              className="shadow-sm p-3 text-center"
              style={{
                background: "rgba(173, 146, 194, 0.84)",
                flex: "1 1 calc(50% - 1.5rem)",
                maxWidth: "calc(50% - 1.5rem)",
                borderRadius: "10px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label={`View details of ${artwork.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/artwork/${artwork.id}`;
                }
              }}
            >
              <ArtworkCard artwork={artwork} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Start your search here </p>
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
