import React, { useEffect } from "react";
import { Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { useExhibitions } from "../context/ExhibitionContext";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  formatExhibitionDateRange,
  formatTimestamp,
} from "../utils/dateFormatting";

const Exhibitions: React.FC = () => {
  const { exhibitions, loading } = useExhibitions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Container fluid className="p-4 d-flex flex-column">
      <Row
        className="align-items-center text-center py-3 text-white rounded shadow mb-4"
        style={{ backgroundColor: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold m-0">Exhibitions</h1>
        </Col>
      </Row>

      {loading && <LoadingSpinner />}

      {exhibitions.length > 0 && (
        <>
          <Row className="justify-content-center">
            {exhibitions.map((exhibition) => (
              <Col key={exhibition.id} md={6} lg={4} className="mb-4">
                <Card
                  className="bg-light h-100"
                  style={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Link
                    to={`/exhibition/${exhibition.id}`}
                    className="text-decoration-none text-dark"
                    aria-label={`Manage exhibition ${exhibition.name}`}
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-decoration-underline text-center text-dark py-3 fs-2">
                        {exhibition.name}
                      </Card.Title>

                      <Card.Text className="text-center text-muted">
                        {formatExhibitionDateRange(
                          exhibition.startDate,
                          exhibition.endDate
                        )}
                      </Card.Text>

                      <Card.Img
                        src={exhibition.image}
                        alt={`Exhibition titled "${exhibition.name}"`}
                        className="img-fluid my-3 mx-auto"
                        style={{
                          height: "250px",
                          objectFit: "contain",
                          marginTop: "20px",
                          paddingTop: "30px",
                        }}
                      />
                      <h5 className="text-decoration-underline mt-3 mx-2">
                        What you will be seeing:
                      </h5>
                      <ListGroup
                        className="list-group-flush"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {exhibition.artworks.map((artwork) => (
                          <ListGroup.Item key={artwork.id} className="mb-3">
                            <div>
                              <span className="ms-2 d-block">
                                "{artwork.title}" by{" "}
                                <i>{artwork.artist_title}</i>
                              </span>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      <Card.Text className="text-center text-muted mt-auto">
                        Created at {formatTimestamp(exhibition.createdAt)}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="secondary" size="lg" className="me-2">
                <Link to="/search" className="text-decoration-none text-light">
                  Add Exhibition
                </Link>
              </Button>
            </Col>
          </Row>
        </>
      )}

      {!loading && exhibitions.length === 0 && (
        <>
          <p className="text-center">No exhibitions found.</p>
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="secondary" size="lg" className="me-2">
                <Link to="/search" className="text-decoration-none text-light">
                  Start Exhibition
                </Link>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Exhibitions;
