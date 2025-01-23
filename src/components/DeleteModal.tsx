import React from "react";
import { Modal } from "react-bootstrap";

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: (id: string) => void;
  entityType: "artwork" | "exhibition";
  entityId: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  handleDelete,
  entityType,
  entityId,
}) => {
  const entityName = entityType === "artwork" ? "artwork" : "exhibition";

  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="deleteModalLabel">
      <Modal.Header closeButton>
        <Modal.Title id="deleteModalLabel">
          Confirm {entityName.charAt(0).toUpperCase() + entityName.slice(1)}{" "}
          Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this {entityName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (entityId) {
              handleDelete(entityId);
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

export default DeleteModal;
