import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSingleArtwork } from "../hooks/useSingleArtwork";
import { useMuseum } from "../context/MuseumContext";
import fallbackImage from "../assets//imageNotAvailable.jpg";

const ArtworkDetail: React.FC = () => {
  const { selectedMuseum, setSelectedMuseum } = useMuseum();
  const { id } = useParams();
  const { artwork, setArtwork, loading, error } = useSingleArtwork(
    selectedMuseum,
    id!
  );
   useEffect(() => {
     setArtwork(null);
   }, [id]);  

  return (
    <div className="container my-5">
      {loading && <div>Loading...</div>}
      {error && (
        <div className="alert alert-warning text-center mt-5" role="alert">
          Error fetching artwork: {error}
        </div>
      )}
      {!loading && !error && !artwork && (
        <div className="alert alert-warning text-center mt-5" role="alert">
          Artwork not found. Please check the ID or return to the home page.
        </div>
      )}
      {artwork && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg rounded-3">
              <div className="card-body">
                <div className="artwork-image-container mb-4">
                  {(artwork.imageUrl || fallbackImage) && (
                    <img
                      src={
                        artwork.imageUrl && artwork.imageUrl.trim() !== ""
                          ? artwork.imageUrl
                          : fallbackImage
                      }
                      alt={`Artwork titled "${artwork.title}" by ${artwork.artist_title}`}
                      className="img-fluid rounded-3 shadow-lg"
                    />
                  )}
                </div>

                <h2 className="text-center mb-3">{artwork.title}</h2>
                <p className="text-muted text-center">
                  <strong>{artwork.artist_title}</strong>
                  {artwork.artist_bio && <span> ({artwork.artist_bio})</span>}
                </p>
                <p className="text-center text-muted">
                  Created in {artwork.date}
                </p>
                <p className="font-weight-bold">{artwork.medium_display}</p>
                {artwork.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: artwork.description,
                    }}
                  />
                )}
                <div className="text-center mt-4">
                  <a
                    href={artwork.objectUrl}
                    className="btn btn-outline-secondary btn-lg mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Source
                  </a>
                  <button
                    className="btn btn-outline-primary btn-lg mx-2"
                    onClick={() => {
                      window.history.back();
                      setSelectedMuseum("");
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
