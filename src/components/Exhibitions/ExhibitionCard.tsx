import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Exhibition } from "../../types/types";
import { useMuseum } from "../../context/MuseumContext";
import { formatExhibitionDateRange } from "../../utils/dateFormatting";
import DeleteModal from "../DeleteModal";
import EditExhibitionModal from "./EditExhibitionModal";
import { useDeleteModal } from "../../context/DeleteContext";
import ArtworkList from "../Artworks/ArtworkList";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(
    null
  );

  const {
    setEntityToDelete,
    showDeleteModal,
    entityType,
    entityId,
    closeDeleteModal,
  } = useDeleteModal();

  const date = formatExhibitionDateRange(
    exhibition.startDate,
    exhibition.endDate
  );

  const handleShowDeleteModal = (
    type: "artwork" | "exhibition",
    id: string | number
  ) => {
    setEntityToDelete(type, id);
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
    <Container fluid className="p-4 d-flex flex-column">
      <Row
        className="align-items-center text-center py-3 text-white rounded shadow mb-4"
        style={{ backgroundColor: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold m-0">{exhibition.name}</h1>
          <p>{date}</p>
          </Col>
      </Row>

      <Row>
        <Col>
          <ArtworkList
            artworks={exhibition.artworks}
            handleDelete={handleDelete}
            showCollection={false}
            showSearch={false}
            showExhibition={true}
          />
        </Col>
      </Row>
      <Row>
      <Col>
        <div className="col-12 mb-4">
          <div
            className="card p-4"
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
      </Col>
      </Row>

      <EditExhibitionModal
        show={showEditModal}
        handleClose={closeEditModal}
        handleEditExhibition={handleEditExhibition}
        exhibition={editingExhibition}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
        entityType={entityType}
        entityId={entityId}
      />
    </Container>
  );
};

export default ExhibitionCard;
