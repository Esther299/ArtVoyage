import React from "react";
import { Artwork } from "../../../types/types";
import fallbackImage from "../../../assets/imageNotAvailable.jpg";

interface ArtworkInfoProps {
  artwork: Artwork;
}

export const ArtworkInfo: React.FC<ArtworkInfoProps> = ({ artwork }) => {
  return (
    <>
      <h3 className="mb-3 fs-1 text-truncate" style={{ maxWidth: "100%" }}>
        {artwork.title}
      </h3>
      <img
        src={
          artwork.imageUrl && artwork.imageUrl.trim() !== ""
            ? artwork.imageUrl
            : fallbackImage
        }
        alt={`Artwork titled "${artwork.title}"`}
        width="400"
        height="300"
        className="img-fluid my-3"
        style={{ display: "block", margin: "0 auto", borderRadius: "8px" }}
      />
      <p className="text-muted fst-italic mb-1 fs-5">
        Created by <strong>{artwork.artist_title}</strong> in {artwork.date}
      </p>
      <p className="mb-2">{artwork.medium_display}</p>
      <p className="text-secondary small text-center mt-2">
        <span className="fw-bold">Source:</span> {artwork.copyright}
      </p>
    </>
  );
};

