import React from "react";
import { Row, Col } from "react-bootstrap";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Row className="justify-content-center mt-3">
      <Col md={6}>
        <div className="alert alert-danger text-center" role="alert">
          {message}
        </div>
      </Col>
    </Row>
  );
};

export default ErrorMessage;
