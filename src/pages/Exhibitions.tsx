import React, { useEffect, useState } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Modal } from "react-bootstrap";

const Exhibitions: React.FC = () => {
  const {
    exhibitions,
    loading,
    error,
    deleteArtworkFromExhibition,
    deleteExhibition,
  } = useExhibitions();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteExhibition = (exhibitionId: string) => {
    deleteExhibition(exhibitionId);
  };

  const handleDeleteArtwork = (exhibitionId: string, artworkId: number) => {
    deleteArtworkFromExhibition(exhibitionId, artworkId);
  };

  const handleShowModal = (exhibitionId: string, artworkId: number) => {
    setSelectedExhibitionId(exhibitionId);
    setSelectedArtworkId(artworkId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExhibitionId(null);
    setSelectedArtworkId(null);
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5 text-center" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Exhibitions</h1>
      {exhibitions.length > 0 ? (
        <div className="row g-4">
          {exhibitions.map((exhibition) => (
            <div className="col-md-6 col-lg-4" key={exhibition.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{exhibition.name}</h3>
                  <p className="card-text">
                    <strong>Date:</strong> {exhibition.date}
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
                        <span className="ms-2">
                          {artwork.title}
                          <br></br>
                           by <i>{artwork.artist_title}</i>
                        </span>
                        <button
                          onClick={() =>
                            handleShowModal(exhibition.id, artwork.id)
                          }
                          className="btn btn-outline-danger btn-sm"
                          aria-label={`Delete artwork titled ${artwork.title} from exhibition ${exhibition.name}`}
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
                  >
                    Delete Exhibition
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No exhibitions found.</p>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        aria-labelledby="deleteModalLabel"
      >
        <Modal.Header closeButton>
          <Modal.Title id="deleteModalLabel">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this artwork?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (selectedExhibitionId && selectedArtworkId !== null) {
                handleDeleteArtwork(selectedExhibitionId, selectedArtworkId);
              }
              handleCloseModal();
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};



export default Exhibitions;
