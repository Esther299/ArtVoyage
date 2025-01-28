import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "../../../types/types";
import { useCollection } from "../../../context/CollectionContext";
import { useExhibitions } from "../../../context/ExhibitionContext";
import { useMuseum } from "../../../context/MuseumContext";
import { auth } from "../../../firebase/firebase";
import ExhibitionForm from "./Form/ExhibitionsForm";
import { Button } from "./Button";
import { ArtworkInfo } from "./ArtworkInfo";
import { ErrorMessage } from "../../ErrorMessage";
import { SuccessMessage } from "../../SuccessMessage";
import DeleteModal from "../../DeleteModal";
import { handleFirestoreError } from "../../../utils/handleErrors";
import { useDeleteModal } from "../../../context/DeleteContext";

interface ArtworkCardProps {
  artwork: Artwork;
  handleDelete?: (id: string | number) => Promise<void>;
  showCollection: boolean;
  showSearch: boolean;
  showExhibition: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  handleDelete,
  showCollection,
  showSearch,
  showExhibition,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [newExhibitionStartDate, setNewExhibitionStartDate] =
    useState<Date | null>(null);
  const [newExhibitionEndDate, setNewExhibitionEndDate] = useState<Date | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isExhibitionHovered, setIsExhibitionHovered] = useState(false);
  const [isCollectionHovered, setIsCollectionHovered] = useState(false);

  const { exhibitions, addExhibition, addArtworkToExhibition, loading } =
    useExhibitions();
  const { loadingCollection, addToCollection } = useCollection();
  const { setSelectedMuseum } = useMuseum();
  const {
    setEntityToDelete,
    showDeleteModal,
    entityType,
    entityId,
    closeDeleteModal,
  } = useDeleteModal();

  const handleAddToExhibitionClick = () => {
    setIsFormVisible(true);
    setSuccessMessage(null);
  };

  const handleShowDeleteModal = (
    type: "artwork" | "exhibition",
    id: string | number
  ) => {
    setEntityToDelete(type, id);
  };

  const handleDeleteFunction = async (id: string | number) => {
    if (handleDelete) {
      return handleDelete(id);
    } else {
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = auth.currentUser;

    if (!user) {
      setError("User is not authenticated.");
      return;
    }

    try {
      if (selectedExhibitionId) {
        await addArtworkToExhibition(selectedExhibitionId, artwork);
      } else if (
        newExhibitionName &&
        newExhibitionStartDate &&
        newExhibitionEndDate
      ) {
        const startDateString = new Date(newExhibitionStartDate).toISOString();
        const endDateString = new Date(newExhibitionEndDate).toISOString();

        const newExhibition = {
          name: newExhibitionName,
          startDate: startDateString,
          endDate: endDateString,
          artworks: [artwork],
          userId: user.uid,
          createdAt: new Date(),
        };
        await addExhibition(newExhibition);
      } else {
        setError("Please fill in all the required fields.");
        return;
      }

      setIsFormVisible(false);
      setNewExhibitionName("");
      setNewExhibitionStartDate(null);
      setNewExhibitionEndDate(null);
      setSelectedExhibitionId(null);
      setSuccessMessage("Artwork added to the exhibition successfully!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      const errorMessage = handleFirestoreError(
        err,
        "An unexpected error occurred. Please try again."
      );
      setError(errorMessage);
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setNewExhibitionStartDate(start);
    setNewExhibitionEndDate(end);
  };

  const handleAddToCollectionClick = async () => {
    try {
      await addToCollection(artwork);
      setSuccessMessage("Artwork added to the collection successfully!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      const errorMessage = handleFirestoreError(
        err,
        "Error adding to collection. Please try again."
      );
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div
      className="card-body text-center"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Link
        to={`/artwork/${artwork.id}`}
        className="text-decoration-none text-reset d-block"
        aria-label={`View details for artwork titled "${artwork.title}"`}
        onClick={() => setSelectedMuseum(artwork.source)}
        style={{
          flex: "1 0 auto",
        }}
      >
        <ArtworkInfo artwork={artwork} />
      </Link>

      <div
        className="d-flex justify-content-center gap-3 mt-3"
        style={{ flex: "0 0 auto" }}
      >
        {(showSearch || showCollection) && (
          <Button
            onClick={handleAddToExhibitionClick}
            label="Add to an Exhibition"
            isHovered={isExhibitionHovered}
            setIsHovered={setIsExhibitionHovered}
          />
        )}
        {showSearch && (
          <Button
            onClick={handleAddToCollectionClick}
            label={loadingCollection ? "Adding..." : "Add to Collection"}
            isHovered={isCollectionHovered}
            setIsHovered={setIsCollectionHovered}
            disabled={isFormVisible || loadingCollection}
          />
        )}
        {(showExhibition || showCollection) && (
          <>
            <button
              className="btn btn-danger"
              onClick={() => handleShowDeleteModal("artwork", artwork.id)}
              aria-label={`Delete artwork titled "${artwork.title}"`}
            >
              Delete artwork
            </button>
            <DeleteModal
              show={showDeleteModal}
              handleClose={closeDeleteModal}
              handleDelete={handleDeleteFunction}
              entityType={entityType}
              entityId={entityId}
            />
          </>
        )}
      </div>

      {isFormVisible && (
        <ExhibitionForm
          exhibitions={exhibitions}
          selectedExhibitionId={selectedExhibitionId}
          setSelectedExhibitionId={setSelectedExhibitionId}
          newExhibitionName={newExhibitionName}
          setNewExhibitionName={setNewExhibitionName}
          newExhibitionStartDate={newExhibitionStartDate}
          newExhibitionEndDate={newExhibitionEndDate}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
          loading={loading}
          setIsFormVisible={setIsFormVisible}
          successMessage={successMessage}
        />
      )}

      <div style={{ flex: "0 0 auto" }}>
        {error && <ErrorMessage message={error} />}
        {!error && successMessage && (
          <SuccessMessage message={successMessage} />
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;
