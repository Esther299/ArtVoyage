import React from "react";
import { useParams } from "react-router-dom";
import { useArtworksData } from "../context/ArtworksContext";

const ArtworkDetail: React.FC = () => {
  const { artworks } = useArtworksData();
  const { id } = useParams<{ id: string }>();
  const artwork = artworks.find((art) => art.id === Number(id));

  if (!artwork) {
    return (
      <div className="alert alert-warning text-center mt-5" role="alert">
        Artwork not found. Please check the ID or return to the home page.
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h1 className="card-title text-center">{artwork.title}</h1>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Artist:</strong> {artwork.artist_display || "Unknown"}
              </p>
              <p className="card-text">
                <strong>Date:</strong> {artwork.date || "Unknown"}
              </p>
              {artwork.imageUrl && (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="img-fluid rounded mb-3"
                />
              )}
              <p className="card-text">
                <strong>Medium:</strong> {artwork.medium_display || "Unknown"}
              </p>
              {/* <p className="card-text">
                <strong>Description:</strong>{" "}
                {artwork.description || "No description available."}
              </p> */}
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
