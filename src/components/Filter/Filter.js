import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onFilterChange }) => {
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      minRank: minRank !== "" ? parseInt(minRank) : null,
      maxRank: maxRank !== "" ? parseInt(maxRank) : null,
      minPrice: minPrice !== "" ? parseFloat(minPrice) : null,
      maxPrice: maxPrice !== "" ? parseFloat(maxPrice) : null,
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label>Min Rank</label>
        <input
          type="number"
          value={minRank}
          onChange={(e) => setMinRank(e.target.value)}
          onBlur={handleFilterChange}
        />
      </div>
      <div className="filter-item">
        <label>Max Rank</label>
        <input
          type="number"
          value={maxRank}
          onChange={(e) => setMaxRank(e.target.value)}
          onBlur={handleFilterChange}
        />
      </div>
      <div className="filter-item">
        <label>Min Price (USD)</label>
        <input
          type="number"
          step="0.01"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handleFilterChange}
        />
      </div>
      <div className="filter-item">
        <label>Max Price (USD)</label>
        <input
          type="number"
          step="0.01"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Filter;
