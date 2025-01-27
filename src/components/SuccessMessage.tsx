import React from "react";

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div
      className="alert alert-success mt-3"
      role="alert"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      {message}
    </div>
  );
};
