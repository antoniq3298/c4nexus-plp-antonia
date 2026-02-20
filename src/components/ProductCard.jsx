const money = (v) => `$${Number(v).toFixed(2)}`;

function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push("★");
    else if (i === full && half) stars.push("⯪");
    else stars.push("☆");
  }

  return (
    <div className="stars" aria-label={`Rating ${value} out of 5`}>
      <span className="stars__icons">{stars.join(" ")}</span>
      <span className="stars__value">{value.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const finalPrice = product.discountedPrice ?? product.price;

  const onAdd = () => {
    window.alert("Product added to cart");
  };

  return (
    <article className="card">
      <div className="card__imgWrap">
        <img className="card__img" src={product.imageUrl} alt={product.name} loading="lazy" />
      </div>

      <div className="card__body">
        <h4 className="card__title">{product.name}</h4>

        <p className="card__desc">{product.description}</p>

        <div className="card__meta">
          <div className="price">
            {product.discountedPrice != null ? (
              <>
                <span className="price__new">{money(finalPrice)}</span>
                <span className="price__old">{money(product.price)}</span>
              </>
            ) : (
              <span className="price__new">{money(finalPrice)}</span>
            )}
          </div>

          <Stars value={product.rating} />
        </div>

        <button className="btn btn--primary" onClick={onAdd} type="button">
          Add to Cart
        </button>
      </div>
    </article>
  );
}