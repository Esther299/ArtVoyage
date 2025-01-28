import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ArtworkCard from "./Artwork/ArtworkCard";
import Pagination from "./Pagination";
import { sortArtworks } from "../../utils/artworkSorting";
import { paginate } from "../../utils/paginating";
import { SortDirection } from "../../utils/artworkSorting";
import { Artwork } from "../../types/types";

interface ArtworksListProps {
  artworks: Artwork[];
  handleDelete?: (id: string | number) => Promise<void>;
  showCollection: boolean;
  showSearch: boolean;
  showExhibition: boolean;
}

const ArtworkList: React.FC<ArtworksListProps> = ({
  artworks,
  handleDelete,
  showCollection,
  showSearch,
  showExhibition,
}) => {
  const [sortOption, setSortOption] = useState<string>("artist");
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    artist: "asc",
    title: "asc",
    date: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 10;

  const sortedArtworks = sortArtworks(artworks, sortOption, sortDirection);

  const { paginatedItems: currentArtworks, totalPages } = paginate(
    sortedArtworks,
    currentPage,
    artworksPerPage
  );

  const toggleSortDirection = (option: string) => {
    setSortDirection((prevDirection) => ({
      ...prevDirection,
      [option]: prevDirection[option] === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <Container className="my-2">
      <Row className="justify-content-center">
        <Col md={4} className="mb-3">
          <Form.Group className="d-flex">
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort by"
              className="me-2"
            >
              <option value="artist">Sort by Artist</option>
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Date</option>
            </Form.Select>
            <Button
              variant="secondary"
              onClick={() => toggleSortDirection(sortOption)}
              aria-label="Toggle Sort Direction"
            >
              {sortDirection[sortOption] === "asc" ? "↑" : "↓"}
            </Button>
          </Form.Group>
        </Col>
      </Row>

      {currentArtworks.length > 0 && (
        <Row className="g-4 justify-content-center">
          {currentArtworks.map((artwork) => (
            <Col xs={12} sm={6} md={6} lg={6} key={artwork.id}>
              <Card
                className="shadow-lg p-5 w-100 h-100"
                style={{
                  borderRadius: "10px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                  overflow: "auto",
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
                <ArtworkCard
                  artwork={artwork}
                  handleDelete={handleDelete}
                  showCollection={showCollection}
                  showSearch={showSearch}
                  showExhibition={showExhibition}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {totalPages > 1 && (
        
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />)}
          {totalPages > 0 && (
          <div className="text-center mt-3">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>
          </div>
        
      )}
    </Container>
  );
};

export default ArtworkList;
