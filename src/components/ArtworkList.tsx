import React from "react";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";

interface ArtworksListProps {
  artworks: Artwork[];
}

const ArtworkList: React.FC<ArtworksListProps> = ({ artworks }) => {
  return (
    <div>
      {artworks.length > 0 ? (
        <ul>
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </ul>
      ) : (
        <p>No artworks found</p>
      )}
    </div>
  );
};

export default ArtworkList;
