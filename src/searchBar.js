import React from "react";
import "./searchBar.css"

function SearchBar({ handleSearch }) {
  return (
    <input
      className="searchBar"
      type="text"
      placeholder="Search by name, email or role..."
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}

export default SearchBar;
