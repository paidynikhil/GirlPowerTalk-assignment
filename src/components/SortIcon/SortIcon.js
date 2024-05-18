import React from "react";
import "./SortIcon.css";

const SortIcon = ({ direction }) => {
  return (
    <span className={`sort-icon ${direction}`}>
      {direction === "ascending" ? "↑" : "↓"}
    </span>
  );
};

export default SortIcon;
