export default function SortBar({ sortValue, onChangeSort, onOpenMobileFilters }) {
  return (
    <div className="topBar">
      <button className="btn btn--ghost showOnMobile" onClick={onOpenMobileFilters} type="button">
        Open filters
      </button>

      <label className="sort">
        <span className="sort__label">Sort</span>
        <select className="select" value={sortValue} onChange={(e) => onChangeSort(e.target.value)}>
          <option value="az">Alphabetical (A–Z)</option>
          <option value="za">Alphabetical (Z–A)</option>
          <option value="plh">Price (Low to High)</option>
          <option value="phl">Price (High to Low)</option>
        </select>
      </label>
    </div>
  );
}