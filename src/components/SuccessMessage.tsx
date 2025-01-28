import React from "react";
import { Row, Col } from "react-bootstrap";

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <Row className="justify-content-center mt-3">
      <Col md={6}>
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      </Col>
    </Row>
  );
};
