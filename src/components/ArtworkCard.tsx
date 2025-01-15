import React from "react";
import { Artwork } from "../types/types";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
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
    </li>
  );
};

export default ArtworkCard;
