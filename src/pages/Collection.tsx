import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { useCollectionData } from "../hooks/useCollectionData";
import fallbackImage from "../assets/imageUrlNotAvailable.jpg";

const Collection = () => {
  const {
    collectionState: artworks,
    removeFromCollection,
    loadingCollection,
  } = useCollectionData();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entityType, setEntityType] = useState<"artwork" | null>(null);
  const [entityId, setEntityId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFirestoreError = (err: any, fallbackMessage: string) => {
    console.error("Firestore Error:", err);
    return err.message || fallbackMessage;
  };

  const handleShowDeleteModal = (entityType: "artwork", id: number) => {
    setEntityType(entityType);
    setEntityId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setEntityType(null);
    setEntityId(null);
  };

  const handleDelete = async (id: number | string) => {
    if (typeof id === "number") {
      try {
        await removeFromCollection(id);
      } catch (error) {
        const errorMessage = handleFirestoreError(
          error,
          "Failed to remove from collection"
        );
        setError(errorMessage);
      }
    }
  };

  if (loadingCollection) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">My Collection</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {artworks.length === 0 ? (
        <p className="text-center">Your collection is empty.</p>
      ) : (
        <ul
          className="d-flex flex-wrap list-unstyled"
          style={{ gap: "1.5rem", justifyContent: "center" }}
        >
          {artworks.map((artwork) => (
            <li
              key={artwork.id}
              className="shadow-sm p-3 text-center"
              style={{
                background: "rgba(173, 146, 194, 0.84)",
                flex: "1 1 calc(50% - 1.5rem)",
                maxWidth: "calc(50% - 1.5rem)",
                borderRadius: "10px",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label={`View details of ${artwork.title}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/artwork/${artwork.id}`;
                }
              }}
            >
              <div className="artwork-card">
                <Link
                  to={`/artwork/${artwork.id}`}
                  className="text-decoration-none text-reset d-block h-100"
                  aria-label={`View details for artwork titled "${artwork.title}"`}
                >
                  <h3
                    className="mb-3 fs-1 text-truncate"
                    style={{ maxWidth: "100%" }}
                  >
                    {artwork.title}
                  </h3>

                  {(artwork.imageUrl || fallbackImage) && (
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
                      style={{
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}

                  <p className="text-muted fst-italic mb-1 fs-5">
                    Created by <strong>{artwork.artist_title}</strong> in{" "}
                    {artwork.date}
                  </p>
                  <p className="mb-2">{artwork.medium_display}</p>
                  <p className="text-secondary small text-center mt-2">
                    <span className="fw-bold">Source:</span> {artwork.copyright}
                  </p>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => handleShowDeleteModal("artwork", artwork.id)}
                  aria-label={`Delete artwork titled "${artwork.title}"`}
                >
                  Delete from my collection
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        entityType={"artwork"}
        entityId={entityId}
      />
    </div>
  );
};

export default Collection;
