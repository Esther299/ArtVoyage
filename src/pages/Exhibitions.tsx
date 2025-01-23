import React, { useEffect, useState, useCallback } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import ExhibitionCard from "../components/ExhibitionCard";
import DeleteArtworkModal from "../components/DeleteArtworkModal";
import EditExhibitionModal from "../components/EditExhibitionModal";
import { Exhibition } from "../types/types";

const Exhibitions: React.FC = () => {
  const {
    exhibitions,
    loading,
    error,
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
  } = useExhibitions();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState<number | null>(
    null
  );

  const [editingExhibition, setEditingExhibition] = useState<Exhibition | null>(
    null
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteExhibition = useCallback(
    (exhibitionId: string) => {
      deleteExhibition(exhibitionId);
      setSuccessMessage("Exhibition deleted successfully.");
    },
    [deleteExhibition]
  );

  const handleDeleteArtwork = useCallback(
    (exhibitionId: string, artworkId: number) => {
      deleteArtworkFromExhibition(exhibitionId, artworkId);
      setSuccessMessage("Artwork deleted successfully.");
    },
    [deleteArtworkFromExhibition]
  );

  const handleShowDeleteModal = useCallback(
    (exhibitionId: string, artworkId: number) => {
      setSelectedExhibitionId(exhibitionId);
      setSelectedArtworkId(artworkId);
      setShowDeleteModal(true);
    },
    []
  );

  const handleShowEditModal = useCallback((exhibition: Exhibition) => {
    setEditingExhibition(exhibition);
    setShowEditModal(true);
  }, []);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedExhibitionId(null);
    setSelectedArtworkId(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingExhibition(null);
    setSuccessMessage("Exhibition edited successfully.");
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Exhibitions</h1>

      {successMessage && (
        <div className="alert alert-success my-3 text-center" role="alert">
          {successMessage}
        </div>
      )}

      {exhibitions.length > 0 ? (
        <div className="row g-4">
          {exhibitions.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              exhibition={exhibition}
              handleDeleteExhibition={handleDeleteExhibition}
              handleShowModal={handleShowDeleteModal}
              handleShowEditModal={handleShowEditModal}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No exhibitions found.</p>
      )}

      {showEditModal && editingExhibition && (
        <EditExhibitionModal
          show={showEditModal}
          handleClose={closeEditModal}
          handleEditExhibition={editExhibition}
          exhibition={editingExhibition}
        />
      )}

      {showDeleteModal &&
        selectedExhibitionId &&
        selectedArtworkId !== null && (
          <DeleteArtworkModal
            show={showDeleteModal}
            handleClose={closeDeleteModal}
            handleDeleteArtwork={handleDeleteArtwork}
            selectedExhibitionId={selectedExhibitionId}
            selectedArtworkId={selectedArtworkId}
          />
        )}
    </div>
  );
};

export default Exhibitions;
