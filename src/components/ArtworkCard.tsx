import React from "react";
import { Artwork } from "../types/types";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <div className="artwork-card">
      <img src={artwork.imageUrl} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
      <p>{artwork.date}</p>
      <p>{artwork.medium}</p>
    </div>
  );
};

export default ArtworkCard;
