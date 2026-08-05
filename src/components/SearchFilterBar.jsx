export default function SearchFilterBar({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
}) {
  return (
    <div
      className="glass no-lift fade-in"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "14px",
        marginBottom: "30px",
        alignItems: "center",
        padding: "18px 20px",
        borderRadius: "18px",
      }}
    >
    
      {/* Search */}
      <input
        type="text"
        placeholder="Search units..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "12px 14px",
          flex: "1",
          minWidth: "200px",
        }}
      />

      {/* Category Filter */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "12px 14px",
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
          padding: "12px 14px",
        }}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="downloads">Most Downloaded</option>
      </select>
    </div>
  );
}
