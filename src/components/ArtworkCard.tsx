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
    <li>
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
      <button onClick={handleAddToExhibitionClick}>Add to Exhibition</button>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <h4>Select or Create Exhibition</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>
              Existing Exhibition:
              <select
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
            </label>
          </div>
          <div>
            <label>
              New Exhibition Name:
              <input
                type="text"
                value={newExhibitionName}
                onChange={(e) => setNewExhibitionName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              New Exhibition Date:
              <input
                type="date"
                value={newExhibitionDate}
                onChange={(e) => setNewExhibitionDate(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add"}
          </button>
          <button type="button" onClick={() => setIsFormVisible(false)}>
            Cancel
          </button>
        </form>
      )}
    </li>
  );
};

export default ArtworkCard;
