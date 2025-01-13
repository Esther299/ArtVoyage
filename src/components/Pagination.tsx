import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      <button onClick={handlePrevPage}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;
