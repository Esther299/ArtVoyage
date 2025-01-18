import React, { useState } from "react";
import { Artwork } from "../types/types";
import { useExhibitions } from "../context/ExhibitionContext";
import { auth } from "../firebase/firebase";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { exhibitions, addExhibition, addArtworkToExhibition } =
    useExhibitions();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [newExhibitionDate, setNewExhibitionDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToExhibitionClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const user = auth.currentUser;

    if (!user) {
      setError("User is not authenticated.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (selectedExhibitionId) {
        await addArtworkToExhibition(selectedExhibitionId, artwork);
      } else if (newExhibitionName && newExhibitionDate) {
        const newExhibition = {
          id: `${Date.now()}`,
          name: newExhibitionName,
          date: newExhibitionDate,
          artworks: [artwork],
          userId: user.uid,
        };
        await addExhibition(newExhibition);
      } else {
        setError("Please fill in the required fields.");
        setIsSubmitting(false);
        return;
      }

      setIsFormVisible(false);
      setNewExhibitionName("");
      setNewExhibitionDate("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <li className="list-group-item shadow-sm mb-3 p-3">
      <h3>{artwork.title}</h3>
      <p>
        <strong>Artist:</strong> {artwork.artist_display}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium_display}
      </p>
      <p>
        <strong>Image:</strong> {artwork.imageUrl}
      </p>
      <p>
        <strong>Date:</strong> {artwork.date}
      </p>
      <p>
        <strong>Source:</strong> {artwork.source}
      </p>
      <button onClick={handleAddToExhibitionClick} className="btn btn-primary">
        Add to Exhibition
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-3">
          <h4>Select or Create Exhibition</h4>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="existingExhibition" className="form-label">
              Existing Exhibition:
            </label>
            <select
              id="existingExhibition"
              className="form-select"
              onChange={(e) => setSelectedExhibitionId(e.target.value)}
              value={selectedExhibitionId || ""}
            >
              <option value="">Select an exhibition</option>
              {exhibitions.map((exhibition) => (
                <option key={exhibition.id} value={exhibition.id}>
                  {exhibition.name} ({exhibition.date})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="newExhibitionName" className="form-label">
              New Exhibition Name:
            </label>
            <input
              type="text"
              id="newExhibitionName"
              className="form-control"
              value={newExhibitionName}
              onChange={(e) => setNewExhibitionName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newExhibitionDate" className="form-label">
              New Exhibition Date:
            </label>
            <input
              type="date"
              id="newExhibitionDate"
              className="form-control"
              value={newExhibitionDate}
              onChange={(e) => setNewExhibitionDate(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFormVisible(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
};

export default ArtworkCard;
