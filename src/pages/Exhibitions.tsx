import React, { useEffect } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Exhibitions: React.FC = () => {
  const { exhibitions, loading, error } = useExhibitions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Exhibitions</h1>
      <ul>
        {exhibitions.length > 0 ? (
          exhibitions.map((exhibition) => (
            <li key={exhibition.id}>
              <h3>{exhibition.name}</h3>
              <p>
                <strong>Date:</strong> {exhibition.date}
              </p>
              <h4>Artworks:</h4>
              <ul>
                {exhibition.artworks.map((artwork) => (
                  <li key={artwork.id}>
                    <h5>{artwork.title}</h5>
                    <p>
                      <strong>Artist:</strong> {artwork.artist_display}
                    </p>
                    <p>
                      <strong>Medium:</strong> {artwork.medium_display}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No exhibitions found.</p>
        )}
      </ul>
    </div>
  );
};

export default Exhibitions;
