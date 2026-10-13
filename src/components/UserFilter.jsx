import React from "react";

function UserFilter({ filterText, onFilterChange }) {
  return (
    <input
      type="text"
      value={filterText}
      placeholder="Filter Data"
      onChange={(e) => onFilterChange(e.target.value)}
      className="p-2 border-gray-500 border mx-auto block"
    />
  );
}

export default UserFilter;
