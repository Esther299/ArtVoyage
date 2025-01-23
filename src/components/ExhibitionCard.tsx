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
  handleAddArtwork: () => void;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  exhibition,
  handleDeleteExhibition,
  handleDeleteArtwork,
  handleEditExhibition,
  handleAddArtwork,
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
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h2 className="card-title text-center py-3">{exhibition.name}</h2>
          <p className="card-text text-center text-muted">{date}</p>
          <p className="card-text text-center text-muted">
            Created at: {new Date(exhibition.createdAt).toLocaleDateString()}
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
                  onClick={() =>
                    handleShowDeleteModal("artwork", artwork.id.toString())
                  }
                  className="btn btn-outline-danger btn-sm"
                  aria-label={`Delete artwork titled ${artwork.title} from exhibition ${exhibition.name}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between mt-3">
            <button
              onClick={() => handleShowEditModal(exhibition)}
              className="btn btn-outline-primary btn-sm"
              aria-label={`Edit exhibition ${exhibition.name}`}
            >
              Edit Exhibition
            </button>
            <button
              onClick={() => handleShowDeleteModal("exhibition", exhibition.id)}
              className="btn btn-outline-danger btn-sm"
              aria-label={`Delete exhibition ${exhibition.name}`}
            >
              Delete Exhibition
            </button>
          </div>

          <div className="mt-3">
            <h5>Add New Artwork</h5>
            <button
              onClick={handleAddArtwork}
              className="btn btn-primary btn-sm"
            >
              Add Artwork
            </button>
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
