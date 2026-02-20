export default function Header({ categories, activeCategoryId, onSelectCategory }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="logo" aria-label="C4 Nexus PLP Demo">
          <span className="logo__mark">C4</span>
          <span className="logo__text">Nexus PLP</span>
        </div>

        <nav className="nav" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`nav__item ${activeCategoryId === c.id ? "nav__item--active" : ""}`}
              onClick={() => onSelectCategory(c.id)}
              type="button"
            >
              {c.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}