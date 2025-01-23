import React from "react";
import { Link } from "react-router-dom";
import { Exhibition } from "../types/types";
import { useMuseum } from "../context/MuseumContext";
import {formatExhibitionDateRange} from "../utils/dateFormatting";


interface ExhibitionCardProps {
  exhibition: Exhibition;
  handleDeleteExhibition: (exhibitionId: string) => void;
  handleShowModal: (exhibitionId: string, artworkId: number) => void;
  handleShowEditModal: (exhibition: Exhibition) => void;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  handleDeleteExhibition,
  handleShowModal,
  handleShowEditModal,
}) => {
  const { setSelectedMuseum } = useMuseum();

  const handleMuseumSelection = (source: string) => {
    if (source === "The Metropolitan Museum of Art") {
      setSelectedMuseum("met");
    } else {
      setSelectedMuseum("chicago");
    }
  };  
const date = formatExhibitionDateRange(
  exhibition.startDate,
  exhibition.endDate
);
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title text-center py-3">{exhibition.name}</h2>
          <p className="card-text text-center text-muted">
            {date}
          </p>
          <ul
            className="list-unstyled flex-grow-1 overflow-auto"
            style={{ maxHeight: "200px", padding: "10px" }}
          >
            {exhibition.artworks.map((artwork) => (
              <li
                key={artwork.id}
                className="d-flex justify-content-between align-items-center mb-3 border-bottom border-top pt-3 pb-3"
              >
                <Link
                  to={`/artwork/${artwork.id}`}
                  className="text-decoration-none text-dark"
                  aria-label={`View details for artwork titled ${artwork.title}`}
                  onClick={() => handleMuseumSelection(artwork.source)}
                >
                  <span className="ms-2 d-block">
                    {artwork.title}
                    <span className="d-block ms-1">
                      by <i>{artwork.artist_title}</i>
                    </span>
                  </span>
                </Link>
                <button
                  onClick={() => handleShowModal(exhibition.id, artwork.id)}
                  className="btn btn-outline-danger btn-sm"
                  aria-label={`Delete artwork titled ${artwork.title} from exhibition ${exhibition.name}`}
                  aria-pressed="false"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleDeleteExhibition(exhibition.id)}
            className="btn btn-outline-warning btn-sm mt-3 w-100"
            aria-label={`Delete exhibition ${exhibition.name}`}
            aria-pressed="false"
          >
            Delete Exhibition
          </button>
          <button
            onClick={() => handleShowEditModal(exhibition)}
            className="btn btn-outline-warning btn-sm mt-3 w-100"
            aria-label={`Edit exhibition ${exhibition.name}`}
            aria-pressed="false"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionCard;
