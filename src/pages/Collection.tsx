import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCollectionData } from "../hooks/useCollectionData";
import ArtworkList from "../components/Artworks/ArtworkList";
import { handleFirestoreError } from "../utils/handleErrors";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const Collection = () => {
  const {
    collectionState: artworks,
    removeFromCollection,
    loadingCollection,
  } = useCollectionData();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDelete = async (id: number | string) => {
    if (typeof id === "number") {
      try {
        if (removeFromCollection) {
          await removeFromCollection(id);
          setSuccessMessage("Artwork was deleted successfully!");
        } else {
          console.error("removeFromCollection is not defined.");
        }
      } catch (error) {
        const errorMessage = handleFirestoreError(
          error,
          "Failed to remove from collection"
        );
        setError(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <Container fluid className="p-4 d-flex flex-column">
      <Row
        className="align-items-center text-center py-3 text-white rounded shadow mb-4"
        style={{ backgroundColor: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold m-0">My Collection</h1>
        </Col>
      </Row>
      {loadingCollection && <LoadingSpinner />}

      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {error && <ErrorMessage message={error} />}
          {successMessage && <SuccessMessage message={successMessage} />}
        </Col>
      </Row>

      <Row>
        <Col>
          <ArtworkList
            artworks={artworks}
            handleDelete={handleDelete}
            showCollection={true}
            showSearch={false}
            showExhibition={false}
          />
        </Col>
      </Row>

      {artworks.length === 0 && (
        <Row>
          <Col>
            <p className="text-center text-muted">Collection empty</p>
          </Col>
        </Row>
      )}

      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="secondary" size="lg" className="me-2">
            <Link to="/search" className="text-decoration-none text-light">
              Add Artworks
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Collection;
