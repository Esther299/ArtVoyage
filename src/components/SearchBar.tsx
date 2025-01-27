import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { ErrorMessage } from "./ErrorMessage";

const SearchBar: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setQuery } = useQuery();
  const { setType } = useType();
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [titleQuery, setTitleQuery] = useState<string>("");
  const [isArtistHovered, setIsArtistHovered] = useState(false);
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const handleSearchByArtist = () => {
    if (artistQuery.trim() === "") {
      setErrorMessage("Please enter an artist name.");
      return;
    }
    setQuery(artistQuery);
    setType("artist_title");
    setErrorMessage(null);
    setArtistQuery("");
  };

  const handleSearchByTitle = () => {
    if (titleQuery.trim() === "") {
      setErrorMessage("Please enter a title.");
      return;
    }
    setQuery(titleQuery);
    setType("title");
    setErrorMessage(null);
    setTitleQuery("");
  };
  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            value={artistQuery}
            onChange={(e) => setArtistQuery(e.target.value)}
            placeholder="Search by Artist"
            aria-label="Search by Artist"
          />
        </Col>
        <Col md={2} className="mb-3">
          <Button
            variant="primary"
            className="w-100"
            onClick={handleSearchByArtist}
            onMouseEnter={() => setIsArtistHovered(true)}
            onMouseLeave={() => setIsArtistHovered(false)}
            aria-label="Search by Artist"
            style={{
              backgroundColor: isArtistHovered
                ? "rgba(85, 71, 129, 0.84)"
                : "rgba(87, 32, 163, 0.9)",
            }}
          >
            Search by Artist
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            placeholder="Search by Title"
            aria-label="Search by Title"
          />
        </Col>
        <Col md={2} className="mb-3">
          <Button
            variant="primary"
            className="w-100"
            onClick={handleSearchByTitle}
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
            aria-label="Search by Title"
            style={{
              backgroundColor: isTitleHovered
                ? "rgba(85, 71, 129, 0.84)"
                : "rgba(87, 32, 163, 0.9)",
            }}
          >
            Search by Title
          </Button>
        </Col>
      </Row>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </Container>
  );
};

export default SearchBar;
