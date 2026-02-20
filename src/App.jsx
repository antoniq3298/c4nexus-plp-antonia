import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Filters from "./components/Filters.jsx";
import SortBar from "./components/SortBar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Footer from "./components/Footer.jsx";
import { categories, productsByCategory } from "./data/products.js";

const PAGE_SIZE = 20;

const getEffectivePrice = (p) => (p.discountedPrice ?? p.price);

function sortProducts(list, sortValue) {
  const copy = [...list];
  switch (sortValue) {
    case "az":
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      copy.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "plh":
      copy.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
      break;
    case "phl":
      copy.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
      break;
    default:
      break;
  }
  return copy;
}

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [sortValue, setSortValue] = useState("az");

  const [selectedColors, setSelectedColors] = useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(9999);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const allProducts = productsByCategory[activeCategoryId];

  const filteredAndSorted = useMemo(() => {
    const filtered = allProducts.filter((p) => {
      const price = getEffectivePrice(p);
      const colorOk = selectedColors.length === 0 || selectedColors.includes(p.color);
      const priceOk = price >= Number(priceMin) && price <= Number(priceMax);
      return colorOk && priceOk;
    });

    return sortProducts(filtered, sortValue);
  }, [allProducts, selectedColors, priceMin, priceMax, sortValue]);

  const productsToShow = filteredAndSorted.slice(0, visibleCount);
  const canLoadMore = productsToShow.length < filteredAndSorted.length;

  const onSelectCategory = (id) => {
    setActiveCategoryId(id);
    setSortValue("az");
    setSelectedColors([]);
    setPriceMin(0);
    setPriceMax(9999);
    setVisibleCount(PAGE_SIZE);
    setMobileFiltersOpen(false);
  };

  const toggleColor = (color) => {
    setVisibleCount(PAGE_SIZE);
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const resetFilters = () => {
    setVisibleCount(PAGE_SIZE);
    setSelectedColors([]);
    setPriceMin(0);
    setPriceMax(9999);
  };

  const onChangeSort = (v) => {
    setVisibleCount(PAGE_SIZE);
    setSortValue(v);
  };

  const onLoadMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE);
  };

  return (
    <div className="app">
      <Header
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={onSelectCategory}
      />

      <main className="main">
        {/* Drawer only (Filters component should render drawer when isMobileOpen=true) */}
        <Filters
          allProducts={allProducts}
          selectedColors={selectedColors}
          onToggleColor={toggleColor}
          priceMin={priceMin}
          priceMax={priceMax}
          onChangePriceMin={setPriceMin}
          onChangePriceMax={setPriceMax}
          onReset={resetFilters}
          isMobileOpen={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        <section className="content">
          {/* PLP title + count like the reference */}
          <div className="plpHeader">
            <div className="plpTitle">
              <div className="plpH1">{activeCategory.name.toUpperCase()}</div>
              <div className="plpCount">{filteredAndSorted.length} Products</div>
            </div>

            {/* Toolbar: Open Filter + Sort */}
            <div className="toolbar">
              <button className="linkBtn" type="button" onClick={() => setMobileFiltersOpen(true)}>
                Open Filter
              </button>

              <div className="sortInline">
                <span className="sortLabel">Sort</span>
                <SortBar
                  sortValue={sortValue}
                  onChangeSort={onChangeSort}
                  onOpenMobileFilters={() => {}}
                />
              </div>
            </div>
          </div>

          <ProductGrid
            productsToShow={productsToShow}
            totalAfterFilters={filteredAndSorted.length}
            shownCount={productsToShow.length}
            onLoadMore={onLoadMore}
            canLoadMore={canLoadMore}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}