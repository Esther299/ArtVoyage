import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "../types/types";
import { useExhibitions } from "../context/ExhibitionContext";
import { useCollection } from "../context/CollectionContext";
import { auth } from "../firebase/firebase";
import ExhibitionForm from "./ExhibitionsForm";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { exhibitions, addExhibition, addArtworkToExhibition, loading } =
    useExhibitions();
    const { addToCollection } = useCollection(); 
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
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToExhibitionClick = () => {
    setIsFormVisible(true);
    setSuccessMessage(null);
  };

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    return err.message || fallbackMessage;
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
      console.log("clicked button")
      await addToCollection(artwork);
      setSuccessMessage("Artwork added to the collection successfully!");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError("Error adding artwork to collection.");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link
        to={`/artwork/${artwork.id}`}
        className="text-decoration-none text-reset d-block h-100"
        style={{
          textDecoration: "none",
        }}
      >
        <h3 className="mb-3 fs-1 text-truncate" style={{ maxWidth: "100%" }}>
          {artwork.title}
        </h3>
        {artwork.imageUrl && (
          <img
            src={artwork.imageUrl}
            alt={`Artwork titled "${artwork.title}"`}
            width="400"
            height="300"
            className="img-fluid my-3"
            style={{
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
        <p className="text-muted fst-italic mb-1 fs-5">
          Created by <strong>{artwork.artist_title}</strong> in {artwork.date}
        </p>
        <p className="mb-2">{artwork.medium_display}</p>
      </Link>

      <button
        onClick={handleAddToExhibitionClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="btn"
        style={{
          backgroundColor: isHovered
            ? "rgba(32, 43, 163, 0.9)"
            : "rgba(32, 18, 74, 0.84)",
          color: "white",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
      >
        Add to an Exhibition
      </button>

      <button
        onClick={handleAddToCollectionClick}
        disabled={isFormVisible}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="btn mt-3"
        style={{
          backgroundColor: isHovered
            ? "rgba(0, 123, 255, 0.9)"
            : "rgba(0, 99, 204, 0.84)",
          color: "white",
          border: "none",
          transition: "background-color 0.3s ease",
        }}
      >
        Add to Collection
      </button>

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

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {!error && successMessage && (
        <div
          className="alert alert-success mt-3"
          role="alert"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ArtworkCard;
