const uniq = (arr) => Array.from(new Set(arr));

export default function Filters({
  allProducts,
  selectedColors,
  onToggleColor,
  priceMin,
  priceMax,
  onChangePriceMin,
  onChangePriceMax,
  onReset,
  isMobileOpen,
  onCloseMobile,
}) {
  const colors = uniq(allProducts.map((p) => p.color)).sort((a, b) => a.localeCompare(b));

  const content = (
    <div className="filters__panel">
      <div className="filters__titleRow">
        <h3 className="filters__title">Filters</h3>
        <button
          className="iconBtn showOnMobile"
          onClick={onCloseMobile}
          type="button"
          aria-label="Close filters"
        >
          ✕
        </button>
      </div>

      <section className="filters__section">
        <div className="filters__sectionTitle">Color</div>
        <div className="filters__list">
          {colors.map((color) => (
            <label key={color} className="check">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => onToggleColor(color)}
              />
              <span className="check__text">{color}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="filters__section">
        <div className="filters__sectionTitle">Price</div>
        <div className="priceGrid">
          <label className="field">
            <span className="field__label">Min</span>
            <input
              type="number"
              min="0"
              value={priceMin}
              onChange={(e) => onChangePriceMin(e.target.value)}
              className="input"
            />
          </label>

          <label className="field">
            <span className="field__label">Max</span>
            <input
              type="number"
              min="0"
              value={priceMax}
              onChange={(e) => onChangePriceMax(e.target.value)}
              className="input"
            />
          </label>
        </div>

        <button className="btn btn--ghost" onClick={onReset} type="button">
          Reset filters
        </button>
      </section>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="filters hideOnMobile">{content}</aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="drawer drawer--open" role="dialog" aria-modal="true">
          <div className="drawer__backdrop" onClick={onCloseMobile} />
          <div className="drawer__content">{content}</div>
        </div>
      )}
    </>
  );
}