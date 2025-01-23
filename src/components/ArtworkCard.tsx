import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "../types/types";
import { useExhibitions } from "../context/ExhibitionContext";
import { auth } from "../firebase/firebase";
import ExhibitionForm from "./ExhibitionsForm";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { exhibitions, addExhibition, addArtworkToExhibition, loading, error } =
    useExhibitions();
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
  const [pageError, setPageError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToExhibitionClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageError(null);

    const user = auth.currentUser;

    if (!user) {
      setPageError("User is not authenticated.");
      return;
    }

    try {
      if (selectedExhibitionId) {
        await addArtworkToExhibition(selectedExhibitionId, artwork);
      } else if (
        newExhibitionName && newExhibitionStartDate &&
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
        setPageError("Please fill in all the required fields.");
        return;
      }

      setIsFormVisible(false);
      setNewExhibitionName("");
      setNewExhibitionStartDate(null);
      setNewExhibitionEndDate(null);
      setSelectedExhibitionId(null);
    } catch (err) {
      setPageError("An unexpected error occurred. Please try again.");
    }
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

      setNewExhibitionStartDate(start);
      setNewExhibitionEndDate(end);
  };

  return (
    <li
      className={`list-group-item shadow-sm mb-3 p-3 ${
        isHovered ? "bg-light border-primary" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      aria-label={`View details of ${artwork.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          window.location.href = `/artwork/${artwork.id}`;
        }
      }}
    >
      <Link
        to={`/artwork/${artwork.id}`}
        className="text-decoration-none text-reset"
      >
        <h3>{artwork.title}</h3>
        <p>
          <strong>Artist:</strong> {artwork.artist_title}
        </p>
        <p>
          <strong>Medium:</strong> {artwork.medium_display}
        </p>
        {artwork.imageUrl && (
          <img
            src={artwork.imageUrl}
            alt={`Artwork titled "${artwork.title}"`}
            width="400"
            height="300"
            className="img-fluid my-3"
          />
        )}
        <p>
          <strong>Date:</strong> {artwork.date}
        </p>
        <p>
          <strong>Source:</strong> {artwork.source}
        </p>
      </Link>

      <button
        onClick={handleAddToExhibitionClick}
        className="btn btn-primary mt-2"
      >
        Add to Exhibition
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
          error={error}
          pageError={pageError}
          setIsFormVisible={setIsFormVisible}
        />
      )}
    </li>
  );
};

export default ArtworkCard;
