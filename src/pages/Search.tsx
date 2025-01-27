import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";

const Search: React.FC = () => {
  const { setSelectedMuseum } = useMuseum();
  const { setQuery } = useQuery();

  const handleSetSelectedMuseum = (museum: string) => {
    setQuery("");
    setSelectedMuseum(museum);
  };

  return (
    <Container fluid className="pb-2 vh-100 p-4">
      <Row
        className="align-items-center text-center py-5 text-white rounded shadow"
        style={{ background: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold mb-5">
            Start Your Art Journey: Choose a Museum
          </h1>
          <p className="lead">
            Select one of the museums below to explore the exhibitions. You can
            search for artworks, learn more about the collection, and much more!
            Let your art journey begin by choosing a museum to dive into its
            treasures.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={4} sm={6} className="mb-4">
          <Card
            className="shadow-lg h-100"
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              background: "rgba(198, 169, 255, 0.9)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(233, 196, 255, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(198, 169, 255, 0.9)")
            }
          >
            <Link
              to="/search/museum/cleveland"
              onClick={() => handleSetSelectedMuseum("cleveland")}
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Cleveland_Museum_of_Art_logo.png"
                alt="Cleveland Museum of Art"
                style={{
                  height: "250px",
                  objectFit: "contain",
                  marginTop: "20px",
                  paddingTop: "30px",
                }}
              />
              <Card.Body className="text-center p-4">
                <hr />
                <Card.Text>
                  The Cleveland Museum of Art is internationally renowned for
                  its collections in art history, from ancient to modern times.
                </Card.Text>
                <Card.Text>
                  <strong>Founded:</strong> 1916 <br />
                  <strong>Location:</strong> Cleveland, Ohio, USA
                </Card.Text>
                <Card.Text>
                  Explore over 45,000 works, including famous European and
                  American collections.
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col md={4} sm={6} className="mb-4">
          <Card
            className="shadow-lg h-100"
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              background: "rgba(198, 169, 255, 0.9)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(233, 196, 255, 0.9)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(198, 169, 255, 0.9)")
            }
          >
            <Link
              to="/search/museum/chicago"
              onClick={() => handleSetSelectedMuseum("chicago")}
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Art_Institute_of_Chicago_Logo.png"
                alt="Art Institute of Chicago"
                style={{
                  height: "250px",
                  objectFit: "contain",
                  marginTop: "20px",
                  paddingTop: "10px",
                }}
              />
              <Card.Body className="text-center p-4">
                <hr />
                <Card.Text>
                  Founded in 1879, the Art Institute of Chicago is known for its
                  extensive collections of artworks from all over the world.
                </Card.Text>
                <Card.Text>
                  <strong>Founded:</strong> 1879 <br />
                  <strong>Location:</strong> Chicago, Illinois, USA
                </Card.Text>
                <Card.Text>
                  With over 300,000 works, it’s one of the oldest and largest
                  museums in the U.S.
                </Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 text-center pb-5">
        <Col>
          <Button variant="secondary" size="lg" className="me-2">
            <Link to="/" className="text-decoration-none text-light">
              Back to Home
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
