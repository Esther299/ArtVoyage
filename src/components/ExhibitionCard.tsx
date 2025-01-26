import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Exhibition } from "../types/types";
import { useMuseum } from "../context/MuseumContext";
import { formatExhibitionDateRange } from "../utils/dateFormatting";
import DeleteModal from "./DeleteModal";
import EditExhibitionModal from "../components/EditExhibitionModal";
import fallbackImage from "../assets/imageUrlNotAvailable.jpg";

interface ExhibitionCardProps {
  exhibition: Exhibition;
  handleDeleteExhibition: (exhibitionId: string) => void;
  handleDeleteArtwork: (exhibitionId: string, artworkId: number) => void;
  handleEditExhibition: (
    exhibitionId: string,
    updatedFields: { name: string; startDate: string; endDate: string }
  ) => void;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  handleDeleteExhibition,
  handleDeleteArtwork,
  handleEditExhibition,
}) => {
  const { setSelectedMuseum } = useMuseum();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(
    null
  );
  const [entityType, setEntityType] = useState<"artwork" | "exhibition" | null>(
    null
  );
  const [entityId, setEntityId] = useState<string | number | null>(null);

  const date = formatExhibitionDateRange(
    exhibition.startDate,
    exhibition.endDate
  );

  const handleMuseumSelection = (source: string) => {
    if (source === "The Metropolitan Museum of Art") {
      setSelectedMuseum("met");
    } else {
      setSelectedMuseum("chicago");
    }
  };

  const handleShowDeleteModal = (
    entityType: "artwork" | "exhibition",
    entityId: string | number
  ) => {
    setEntityType(entityType);
    setEntityId(entityId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setEntityType(null);
    setEntityId(null);
  };

  const handleShowEditModal = (exhibition: Exhibition) => {
    setEditingExhibition(exhibition);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingExhibition(null);
  };

  const handleDelete = async (id: string | number) => {
    if (entityType === "artwork" && typeof id === "number") {
      handleDeleteArtwork(exhibition.id, id);
    } else if (entityType === "exhibition" && typeof id === "string") {
      handleDeleteExhibition(id);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div
          className="col-12 text-center text-white py-3"
          style={{ background: "rgba(47, 21, 68, 0.84)" }}
        >
          <h1>{exhibition.name}</h1>
          <p>{date}</p>
        </div>
      </div>

      <div className="row">
        <ul
          className="d-flex flex-wrap list-unstyled"
          style={{ gap: "1.5rem", justifyContent: "center" }}
        >
          {exhibition.artworks.map((artwork) => (
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
              <div className="artwork-card">
                <Link
                  to={`/artwork/${artwork.id}`}
                  className="text-decoration-none text-reset d-block h-100"
                  aria-label={`View details for artwork titled "${artwork.title}"`}
                >
                  <h3
                    className="mb-3 fs-1 text-truncate"
                    style={{ maxWidth: "100%" }}
                  >
                    {artwork.title}
                  </h3>

                  {(artwork.imageUrl || fallbackImage) && (
                    <img
                      src={
                        artwork.imageUrl && artwork.imageUrl.trim() !== ""
                          ? artwork.imageUrl
                          : fallbackImage
                      }
                      alt={`Artwork titled "${artwork.title}"`}
                      width="400"
                      height="300"
                      className="img-fluid my-3"
                      style={{
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}

                  <p className="text-muted fst-italic mb-1 fs-5">
                    Created by <strong>{artwork.artist_title}</strong> in{" "}
                    {artwork.date}
                  </p>
                  <p className="mb-2">{artwork.medium_display}</p>
                  <p className="text-secondary small text-center mt-2">
                    <span className="fw-bold">Source:</span> {artwork.copyright}
                  </p>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => handleShowDeleteModal("artwork", artwork.id)}
                  aria-label={`Delete artwork titled "${artwork.title}"`}
                >
                  Delete artwork
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="col-12 mb-4">
          <div
            className="card p-4"
            style={{ background: "rgba(117, 92, 176, 0.84)" }}
          >
            <div className="d-flex justify-content-between">
              <button
                onClick={() => handleShowEditModal(exhibition)}
                className="btn btn-warning btn-lg"
                aria-label={`Edit exhibition ${exhibition.name}`}
              >
                Edit Exhibition
              </button>
              <button
                onClick={() =>
                  handleShowDeleteModal("exhibition", exhibition.id)
                }
                className="btn btn-danger btn-lg"
                aria-label={`Delete exhibition ${exhibition.name}`}
              >
                Delete Exhibition
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditExhibitionModal
        show={showEditModal}
        handleClose={closeEditModal}
        handleEditExhibition={handleEditExhibition}
        exhibition={editingExhibition}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        entityType={entityType ?? "artwork"}
        entityId={entityId}
      />
    </div>
  );
};

export default ExhibitionCard;
