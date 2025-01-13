import React from "react";

interface ArtworkProps {
  title: string;
  artist: string;
  imageUrl: string;
  description: string;
}

const ArtworkCard: React.FC<ArtworkProps> = ({
  title,
  artist,
  imageUrl,
  description,
}) => {
  return (
    <div className="artwork-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{artist}</p>
      <p>{description}</p>
    </div>
  );
};

export default ArtworkCard;
