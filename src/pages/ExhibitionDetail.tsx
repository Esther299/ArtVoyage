import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExhibitions } from "../context/ExhibitionContext";
import { Exhibition } from "../types/types";
import ExhibitionCard from "../components/ExhibitionCard";
import DeleteArtworkModal from "../components/DeleteArtworkModal";
import EditExhibitionModal from "../components/EditExhibitionModal";

const ExhibitionDetail: React.FC = () => {
  const { exhibitionId } = useParams();
  const {
    exhibitions,
    loading,
    error,
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
    addArtworkToExhibition,
  } = useExhibitions();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [newArtworkTitle, setNewArtworkTitle] = useState("");
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
    if (exhibitionId) {
      const selectedExhibition = exhibitions.find((e) => e.id === exhibitionId);
      if (selectedExhibition) {
        setExhibition(selectedExhibition);
      } else {
        navigate("/exhibitions");
      }
    }
  }, [exhibitionId, exhibitions, navigate]);

  const handleDeleteExhibition = useCallback(
    (exhibitionId: string) => {
      deleteExhibition(exhibitionId);
      setSuccessMessage("Exhibition deleted successfully.");
    },
    [deleteExhibition]
  );

  const handleAddArtwork = () => {
    navigate("/search");
  };

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

  if (!exhibition) {
    return <div className="text-center my-5">Exhibition not found.</div>;
  }

  return (
    <>
      <ExhibitionCard
        exhibition={exhibition}
        handleDeleteExhibition={handleDeleteExhibition}
        handleShowModal={handleShowDeleteModal}
        handleShowEditModal={handleShowEditModal}
        handleAddArtwork={handleAddArtwork}
      />

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
      <button
        className="btn btn-outline-primary btn-lg mx-2"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </>
  );
};

export default ExhibitionDetail;
