import React from "react";
import { Modal } from "react-bootstrap";

interface DeleteArtworkModalProps {
  show: boolean;
  handleClose: () => void;
  handleDeleteArtwork: (exhibitionId: string, artworkId: number) => void;
  selectedExhibitionId: string | null;
  selectedArtworkId: number | null;
}

const DeleteArtworkModal: React.FC<DeleteArtworkModalProps> = ({
  show,
  handleClose,
  handleDeleteArtwork,
  selectedExhibitionId,
  selectedArtworkId,
}) => {
  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="deleteModalLabel">
      <Modal.Header closeButton>
        <Modal.Title id="deleteModalLabel">Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this artwork?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (selectedExhibitionId && selectedArtworkId !== null) {
              handleDeleteArtwork(selectedExhibitionId, selectedArtworkId);
            }
            handleClose();
          }}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteArtworkModal;
