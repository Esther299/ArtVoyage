import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/Artworks/ArtworkList";
import { ErrorMessage } from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchPage: React.FC = () => {
  const { museumName } = useParams();
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { setSelectedMuseum } = useMuseum();
  const [museumDisplay, setMuseumDisplay] = useState("");
 

  const { artworks, loading, error, setArtworks } = useArtworks(
    museumName || "",
    query,
    type
  );

  useEffect(() => {
    const getMuseumDisplayName = (museumKey: string | undefined): string => {
      const museumDisplayMap: Record<string, string> = {
        cleveland: "The Cleveland Museum of Art",
        chicago: "The Art Institute of Chicago",
      };
      return museumKey
        ? museumDisplayMap[museumKey] || "Unknown Museum"
        : "Collection";
    };

    setMuseumDisplay(getMuseumDisplayName(museumName));
  }, [museumName]);

  useEffect(() => {
    setQuery("");
    setType("artist_title");
    setArtworks([]);
    if (museumName) {
      setSelectedMuseum(museumName);
    }
  }, [
    setQuery,
    setType,
    setArtworks,
    setSelectedMuseum,
    museumName,
  ]);

  return (
    <Container fluid className="pb-2 vh-100 p-4 d-flex flex-column">
      <Row
        className="align-items-center text-center py-3 text-white rounded shadow mb-4"
        style={{ backgroundColor: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold m-0">{museumDisplay}</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <SearchBar />
        </Col>
      </Row>
      <Row className="flex-grow-1">
        <Col>
          {loading && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <LoadingSpinner />
            </div>
          )}
          {error && (
            <Row className="justify-content-center text-center">
              <Col md={6}>
                <ErrorMessage message={error} />
                <button
                  className="btn btn-secondary mt-3"
                  onClick={() => setQuery(query)}
                >
                  Retry
                </button>
              </Col>
            </Row>
          )}
          {!loading && !error && artworks.length === 0 && (
            <p className="text-center text-muted">Start your search here</p>
          )}
          {!loading && !error && artworks.length > 0 && (
            <ArtworkList
              artworks={artworks}
              showSearch={true}
              showCollection={false}
            />
          )}
        </Col>
      </Row>
      <Row className="mt-5 text-center pb-5">
        <Col>
          <Button variant="secondary" size="lg" className="me-2">
            <Link to="/search" className="text-decoration-none text-light">
              Back to Search
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );

};

export default SearchPage;
