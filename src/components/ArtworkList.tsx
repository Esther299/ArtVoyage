import React from "react";
import ArtworkCard from "./ArtworkCard";

interface Artwork {
  title: string;
  artist: string;
  imageUrl: string;
  description: string;
}

interface ArtworkListProps {
  artworks: Artwork[];
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks }) => {
  return (
    <div className="artwork-list">
      {artworks.map((artwork, index) => (
        <ArtworkCard key={index} {...artwork} />
      ))}
    </div>
  );
};

export default ArtworkList;
