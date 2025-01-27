export const paginate = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return {
    paginatedItems,
    totalPages: Math.ceil(items.length / itemsPerPage),
  };
};
