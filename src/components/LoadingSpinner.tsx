import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default LoadingSpinner;
