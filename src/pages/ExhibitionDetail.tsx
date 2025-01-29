import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useExhibitions } from "../context/ExhibitionContext";
import ExhibitionCard from "../components/Exhibitions/ExhibitionCard";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { handleFirestoreError } from "../utils/handleErrors";
import { Exhibition } from "../types/types";

const ExhibitionDetail: React.FC = () => {
  const { exhibitionId } = useParams();
  const {
    exhibitions,
    loading,
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
  } = useExhibitions();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    async (
      exhibitionId: string,
      updatedFields: { name: string; startDate: string; endDate: string }
    ) => {
      try {
        await editExhibition(exhibitionId, updatedFields);
        setSuccessMessage("Exhibition edited successfully.");
      } catch (err: any) {
        const errorMessage = handleFirestoreError(
          err,
          "Failed to edit the exhibition"
        );
        setError(errorMessage);
      }
    },
    [editExhibition]
  );

  const handleDeleteExhibition = useCallback(
    async (exhibitionId: string) => {
      try {
        await deleteExhibition(exhibitionId);
        setSuccessMessage("Exhibition deleted successfully.");
      } catch (err: any) {
        const errorMessage = handleFirestoreError(
          err,
          "Failed to delete the exhibition."
        );
        setError(errorMessage);
      }
    },
    [deleteExhibition]
  );

  const handleDeleteArtwork = useCallback(
    async (exhibitionId: string, artworkId: number) => {
      try {
        await deleteArtworkFromExhibition(exhibitionId, artworkId);
        setSuccessMessage("Artwork deleted successfully.");
      } catch (err: any) {
        const errorMessage = handleFirestoreError(
          err,
          "Failed to delete the artwork."
        );
        setError(errorMessage);
      }
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
    return <ErrorMessage message={error} />;
  }

  if (!exhibition) {
    return <div className="text-center my-5">Exhibition not found.</div>;
  }

  return (
    <>
      {successMessage && <SuccessMessage message={successMessage} />}
      <ExhibitionCard
        exhibition={exhibition}
        handleDeleteExhibition={handleDeleteExhibition}
        handleDeleteArtwork={handleDeleteArtwork}
        handleEditExhibition={handleEditExhibition}
      />

      <Row className="mb-5 justify-content-center">
        <Col className="text-center">
          <Button
            onClick={handleAddArtwork}
            variant="primary"
            size="lg"
            className="mx-2"
            aria-label="Add new artwork to the exhibition"
            style={{ maxWidth: "200px" }}
          >
            Add Artwork
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="mx-2"
            onClick={() => window.history.back()}
            aria-label="Go back to the previous page"
            style={{ maxWidth: "200px" }}
          >
            Go Back
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ExhibitionDetail;
