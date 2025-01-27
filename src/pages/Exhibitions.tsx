import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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
        <Container fluid className="pb-5 Sjustify-content-center">
          <Row className="g-4 justify-content-center">
            {exhibitions.map((exhibition) => (
              <div key={exhibition.id} className="col-md-6 col-lg-4">
                <Link
                  to={`/exhibition/${exhibition.id}`}
                  className="btn btn-outline-secondary mt-3"
                  aria-label={`Manage exhibition ${exhibition.name}`}
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h2 className="card-title text-decoration-underline text-center py-3 fs-2">
                        {exhibition.name}
                      </h2>
                      <p className="card-text text-center text-muted">
                        {formatExhibitionDateRange(
                          exhibition.startDate,
                          exhibition.endDate
                        )}
                      </p>
                      <img
                        src={exhibition.image}
                        alt={`Exhibition titled "${exhibition.name}"`}
                        width="400"
                        height="300"
                        className="img-fluid my-3"
                        style={{
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                      <ul className="list-group list-group-flush">
                        <h5 className="text-decoration-underline">
                          What you will be seeing:
                        </h5>
                        {exhibition.artworks.map((artwork) => (
                          <li
                            key={artwork.id}
                            className="list-group-item justify-content-between mb-3"
                          >
                            <div>
                              <span className="ms-2 d-block">
                                "{artwork.title}" by{" "}
                                <i>{artwork.artist_title}</i>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <p className="card-text text-center text-muted">
                        Created at {formatTimestamp(exhibition.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
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
        </Container>
      )}
      {!loading && exhibitions.length == 0 && (
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
