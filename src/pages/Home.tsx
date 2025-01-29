import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container fluid className="pb-2 p-4">
      <Row
        className="align-items-center text-center py-5 text-white rounded shadow"
        style={{ background: "rgba(84, 37, 122, 0.84)" }}
      >
        <Col>
          <h1 className="display-4 fw-bold">
            Welcome to the Exhibition Curator
          </h1>
          <p className="lead">
            Discover and curate breathtaking exhibitions of antiquities and fine
            art.
          </p>
          <Button variant="light" size="lg" className="me-2">
            <Link to="/search" className="text-decoration-none text-dark">
              Start Exploring
            </Link>
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-4">Featured Exhibitions</h2>
          <Row className="g-4">
            {[
              {
                title: "Impressionist Masterpieces",
                description:
                  "Explore the vibrant world of Impressionism with works by Monet, Renoir, and Degas.",
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg",
              },
              {
                title: "The Ancient World Uncovered",
                description:
                  "A journey through time featuring artifacts from Ancient Egypt, Greece, and Mesopotamia.",
                image:
                  "https://www.illustrationhistory.org/images/uploads/greek_funer.plak.520BC.jpg",
              },
              {
                title: "Modern Art: Breaking Boundaries",
                description:
                  "Discover groundbreaking modern art pieces from the 20th century's most influential artists.",
                image:
                  "https://upload.wikimedia.org/wikipedia/commons/0/09/Paul_Gauguin-_Manao_tupapau_%28The_Spirit_of_the_Dead_Keep_Watch%29.JPG",
              },
            ].map((exhibition, index) => (
              <Col md={4} key={index}>
                <Card className="shadow h-100">
                  <Card.Img
                    variant="top"
                    src={exhibition.image}
                    alt={exhibition.title}
                  />
                  <Card.Body>
                    <Card.Title>{exhibition.title}</Card.Title>
                    <Card.Text>{exhibition.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mt-5 text-center pb-5">
        <Col>
          <h2>Ready to Curate?</h2>
          <p className="lead">
            Create and share your unique exhibitions with the world.
          </p>
          <Button variant="success" size="lg" className="me-2">
            <Link to="/search" className="text-decoration-none text-light">
              Get Started
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
