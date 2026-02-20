import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({
  productsToShow,
  totalAfterFilters,
  shownCount,
  onLoadMore,
  canLoadMore,
}) {
  return (
    <section className="gridSection">
      <div className="counter" aria-live="polite">
        {shownCount} out of {totalAfterFilters} products displayed.
      </div>

      <div className="grid">
        {productsToShow.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="loadMoreRow">
        <button className="btn btn--ghost" onClick={onLoadMore} type="button" disabled={!canLoadMore}>
          Load More
        </button>
      </div>
    </section>
  );
}