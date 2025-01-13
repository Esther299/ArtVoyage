import React from "react";

const FilterPanel: React.FC = () => {
  return (
    <div className="filter-panel">
      <select>
        <option value="">Select Category</option>
        <option value="paintings">Paintings</option>
        <option value="sculptures">Sculptures</option>
      </select>
    </div>
  );
};

export default FilterPanel;
