import React, { useState } from "react";
import { Artwork } from "../types/types";
import { useExhibitions } from "../context/ExhibitionContext";
import { auth } from "../firebase/firebase";

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
  const [newExhibitionDate, setNewExhibitionDate] = useState("");
  const [pageError, setPageError] = useState<string | null>(null);

  const handleAddToExhibitionClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageError(null)

    const user = auth.currentUser;

    if (!user) {
      setPageError("User is not authenticated.");
      return;
    }

    try {
      if (selectedExhibitionId) {
        await addArtworkToExhibition(selectedExhibitionId, artwork);
      } else if (newExhibitionName && newExhibitionDate) {
        const newExhibition = {
          name: newExhibitionName,
          date: newExhibitionDate,
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
      setNewExhibitionDate("");
    } catch (err) {
      setPageError("An unexpected error occurred. Please try again.");
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
        <strong>Image:</strong>{" "}
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          width="400"
          height="300"
        />
        
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
          {pageError && (
            <div className="alert alert-danger" role="alert">
              {pageError}
            </div>
          )}

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
              disabled={loading}
            >
              {loading ? "Submitting..." : "Add"}
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
