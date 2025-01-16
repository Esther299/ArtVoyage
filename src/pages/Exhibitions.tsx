import React from "react";
import { useExhibitions } from "../context/ExhibitionContext";

const Exhibitions: React.FC = () => {
  const { exhibitions } = useExhibitions();

  return (
    <div>
      <h1>Exhibitions</h1>
      <ul>
        {exhibitions.map((exhibition) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Exhibitions;
