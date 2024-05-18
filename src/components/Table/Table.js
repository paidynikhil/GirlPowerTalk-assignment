import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import SortIcon from "../SortIcon/SortIcon";
import Chart from "../Chart/Chart";
import "./Table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    minRank: null,
    maxRank: null,
    minPrice: null,
    maxPrice: null,
  });
  const [showChart, setShowChart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedRows(data.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((item) => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    const matchesSearchQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery);
    const matchesFilters =
      (filters.minRank === null || item.rank >= filters.minRank) &&
      (filters.maxRank === null || item.rank <= filters.maxRank) &&
      (filters.minPrice === null || item.price_usd >= filters.minPrice) &&
      (filters.maxPrice === null || item.price_usd <= filters.maxPrice);
    return matchesSearchQuery && matchesFilters;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="controls">
        <div className="control">
          <h3>HeadLine</h3>
          <span className="label">Label Text or Value</span>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <img src="/icons/search.png" alt="Search" className="search-icon" />
          </div>
        </div>
        <div className="buttons">
          <button
            className="btn filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <img src="/icons/filter.png" alt="Filter" />
            <span>Filter</span>
          </button>
          <button
            className="btn delete-btn"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            <img src="/icons/delete.png" alt="Delete" />
            <span>Delete Selected</span>
          </button>
          <button className="btn export-btn">
            <img src="/icons/export.png" alt="Export" />
            <span>Export</span>
          </button>
          <button
            className="btn chart-btn"
            onClick={() => setShowChart(!showChart)}
          >
            <img src="/icons/chart.png" alt="Show Chart" />
            <span>{showChart ? "Hide Chart" : "Show Chart"}</span>
          </button>
        </div>
      </div>
      {showFilters && <Filter onFilterChange={setFilters} />}
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            {[
              "id",
              "name",
              "rank",
              "price_usd",
              "percent_change_24h",
              "price_btc",
              "market_cap_usd",
            ].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.replace("_", " ").toUpperCase()}
                <SortIcon
                  direction={
                    sortConfig.key === key ? sortConfig.direction : "ascending"
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(crypto.id)}
                  onChange={() => handleSelectRow(crypto.id)}
                />
              </td>
              <td>{crypto.id}</td>
              <td>{crypto.name}</td>
              <td>{crypto.rank}</td>
              <td>${crypto.price_usd}</td>
              <td>{crypto.percent_change_24h}%</td>
              <td>{crypto.price_btc}</td>
              <td>${crypto.market_cap_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {showChart && <Chart data={filteredData} />}
    </div>
  );
};

export default Table;
