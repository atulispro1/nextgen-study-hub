import { useState } from "react";


export default function SearchFilterBar({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
}) {
  return (
    <div className="fade-in"

      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "30px",
        alignItems: "center",
      }}
      >
    
      {/* Search */}
      <input
        type="text"
        placeholder="Search units..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid rgba(0,0,0,0.1)",
          flex: "1",
          minWidth: "200px",
        }}
      />

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <option value="All">All Categories</option>
        <option value="Notes">Notes</option>
        <option value="Assignments">Assignments</option>
        <option value="Practicals">Practicals</option>
      </select>

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="downloads">Most Downloaded</option>
      </select>
    </div>
  );
}