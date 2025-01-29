import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="fw-bold">About Us</h5>
            <p>
              Welcome to <strong>ArtVoyage</strong> — a platform designed for
              art lovers, curators, and creatives. Discover, search, and explore
              thousands of artworks from different periods and styles, or curate
              your own personalized exhibitions to share with the world. Whether
              you're a museum professional, an art enthusiast, or simply someone
              who loves art, we provide the tools to help you create and
              showcase stunning exhibitions with ease.
            </p>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/home"
                  className="text-white text-decoration-none"
                  aria-label="Go to homepage"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://www.clevelandart.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Visit Cleveland Museum of Art"
                >
                  Cleveland Museum of Art
                </a>
              </li>
              <li>
                <a
                  href="https://www.artic.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Visit Art Institute of Chicago"
                >
                  Art Institute of Chicago
                </a>
              </li>
              <li>
                <a
                  href="https://northcoders.com/company/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Contact Us"
                >
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="fw-bold">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.facebook.com/?locale=es_ES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Follow us on Facebook"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/?lang=es&mx=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Follow us on Twitter"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">
              &copy; 2025 Northcoders. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
