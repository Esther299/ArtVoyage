import React, { useEffect, useState } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import ExhibitionCard from "../components/ExhibitionCard";
import DeleteArtworkModal from "../components/DeleteArtworkModal";

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
            <ExhibitionCard
              key={exhibition.id}
              exhibition={exhibition}
              handleDeleteExhibition={handleDeleteExhibition}
              handleShowModal={handleShowModal}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No exhibitions found.</p>
      )}

      <DeleteArtworkModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDeleteArtwork={handleDeleteArtwork}
        selectedExhibitionId={selectedExhibitionId}
        selectedArtworkId={selectedArtworkId}
      />
    </div>
  );
};

export default Exhibitions;
