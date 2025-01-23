import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Exhibition } from "../types/types";
import { useMuseum } from "../context/MuseumContext";
import { formatExhibitionDateRange } from "../utils/dateFormatting";
import DeleteModal from "./DeleteModal";
import EditExhibitionModal from "../components/EditExhibitionModal";

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

  const handleDelete = () => {
    if (
      entityType === "artwork" &&
      typeof entityId === "number" &&
      entityId !== null
    ) {
      handleDeleteArtwork(exhibition.id, entityId);
    } else if (entityType === "exhibition" && typeof entityId === "string") {
      handleDeleteExhibition(entityId);
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
        {exhibition.artworks.map((artwork) => (
          <div className="col-md-4 col-lg-3 mb-4" key={artwork.id}>
            <Link
              to={`/artwork/${artwork.id}`}
              className="btn btn-outline-secondary w-100"
              aria-label={`View details for artwork titled ${artwork.title}`}
              onClick={() => handleMuseumSelection(artwork.source)}
            >
              <div className="card h-100 align-center">
                {artwork.imageUrl && (
                  <img
                    src={artwork.imageUrl}
                    alt={`Artwork titled "${artwork.title}"`}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center bg-light py-2 rounded">
                    {artwork.title}
                  </h5>

                  <p className="card-text text-muted text-center">
                    <strong>Artist:</strong> <i>{artwork.artist_title}</i>
                  </p>

                  <p className="card-text text-center bg-light py-1 rounded">
                    <strong>Medium:</strong> {artwork.medium_display}
                  </p>

                  <div className="d-flex justify-content-center mt-auto">
                    <button
                      onClick={() =>
                        handleShowDeleteModal("artwork", artwork.id.toString())
                      }
                      className="btn btn-outline-danger btn-sm"
                      aria-label={`Delete artwork titled ${artwork.title} from exhibition ${exhibition.name}`}
                    >
                      Delete Artwork
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

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
        entityId={entityId?.toString() ?? ""}
      />
    </div>
  );
};

export default ExhibitionCard;
