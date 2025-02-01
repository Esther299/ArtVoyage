import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDeleteModal } from "../../context/DeleteContext";
import DeleteModal from "../DeleteModal";
import EditExhibitionModal from "./EditExhibitionModal";
import ArtworkList from "../Artworks/ArtworkList";
import { formatExhibitionDateRange } from "../../utils/dateFormatting";
import { Exhibition } from "../../types/types";

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

      <ArtworkList
        artworks={exhibition.artworks}
        handleDelete={handleDelete}
        showCollection={false}
        showSearch={false}
        showExhibition={true}
      />

      <Row
        className="mt-3"
        style={{
          backgroundColor: "transparent",
          border: "2px solid rgba(84, 37, 122, 0.84)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Col xs={6}>
          <Button
            variant="warning"
            onClick={() => handleShowEditModal(exhibition)}
            className="w-100"
            style={{
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label={`Edit exhibition ${exhibition.name}`}
          >
            Edit Exhibition
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            variant="danger"
            onClick={() => handleShowDeleteModal("exhibition", exhibition.id)}
            className="w-100 text-light"
            aria-label={`Delete exhibition ${exhibition.name}`}
            style={{
              background: "rgba(250, 1, 63, 0.84)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Delete Exhibition
          </Button>
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
