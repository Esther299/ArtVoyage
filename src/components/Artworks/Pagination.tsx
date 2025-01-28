import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pageNumbers.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }
    return pageNumbers;
  };

  return (
    <BootstrapPagination className="mt-4 justify-content-center">
      <BootstrapPagination.First
        onClick={handleFirstPage}
        disabled={currentPage === 1}
      />
      <BootstrapPagination.Prev
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

      {renderPageNumbers()}

      <BootstrapPagination.Next
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
      <BootstrapPagination.Last
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
