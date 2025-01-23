import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExhibitions } from "../context/ExhibitionContext";
import { Exhibition } from "../types/types";
import ExhibitionCard from "../components/ExhibitionCard";

const ExhibitionDetail: React.FC = () => {
  const { exhibitionId } = useParams();
  const {
    exhibitions,
    loading,
    error,
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
  } = useExhibitions();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleAddArtwork = () => {
    navigate("/search");
  };

  const handleEditExhibition = useCallback(
    (
      exhibitionId: string,
      updatedFields: { name: string; startDate: string; endDate: string }
    ) => {
      editExhibition(exhibitionId, updatedFields);
      setSuccessMessage("Exhibition editted successfully.");
    },
    [deleteArtworkFromExhibition]
  );

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
        handleDeleteArtwork={handleDeleteArtwork}
        handleEditExhibition={handleEditExhibition}
        handleAddArtwork={handleAddArtwork}
      />
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
