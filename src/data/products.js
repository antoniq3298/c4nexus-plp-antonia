// Light, minimal product-like thumbnails (SVG data URIs) – close to the reference style
const svgThumb = (categoryId, color) => {
  const accent =
    color === "Black" ? "#111827" :
    color === "White" ? "#e5e7eb" :
    color === "Red" ? "#ef4444" :
    color === "Blue" ? "#3b82f6" :
    color === "Green" ? "#22c55e" :
    "#d4b483"; // Beige

  // Simple flat silhouette on a light tile (no text, no gradient, no rounded image corners)
  const icon =
    categoryId === "bags"
      ? `
        <g transform="translate(0,10)">
          <rect x="165" y="210" width="270" height="230" rx="16" fill="${accent}" opacity="0.85"/>
          <path d="M235 210c0-60 18-95 65-95s65 35 65 95" fill="none" stroke="#111827" stroke-width="14" opacity="0.35"/>
        </g>
      `
      : `
        <g transform="translate(0,20)">
          <path d="M170 360c45 0 85-30 125-30 55 0 85 42 165 42 55 0 78-18 110-18v54H170v-48Z"
                fill="${accent}" opacity="0.85"/>
          <path d="M260 290c40 0 62 34 102 46 32 9 65 10 98 10"
                fill="none" stroke="#111827" stroke-width="12" opacity="0.35"/>
        </g>
      `;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
    <rect width="600" height="600" fill="#f3f3f3"/>
    <!-- subtle inner tile like e-commerce product shots -->
    <rect x="38" y="38" width="524" height="524" fill="#fafafa" stroke="#e6e6e6" stroke-width="2"/>
    ${icon}
  </svg>`.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const makeProducts = (categoryId, categoryLabel, baseSeed) => {
  const colors = ["Black", "White", "Red", "Blue", "Green", "Beige"];
  const products = [];

  for (let i = 1; i <= 48; i++) {
    const color = colors[(i + baseSeed) % colors.length];
    const price = 25 + ((i * 7) % 160);
    const hasDiscount = i % 4 === 0;
    const discountPct = hasDiscount ? 0.15 + ((i % 3) * 0.05) : 0;
    const discountedPrice = hasDiscount
      ? Math.round(price * (1 - discountPct) * 100) / 100
      : null;

    const rating = 3 + ((i + baseSeed) % 3) + (((i + 2) % 10) / 10);

    products.push({
      id: `${categoryId}-${i}`,
      categoryId,
      categoryLabel,
      name: `${categoryLabel} Item ${i}`,
      description: `Lightweight, durable, and designed for everyday use. Color: ${color}.`,
      color,
      price,
      discountedPrice,
      rating: Math.min(5, Math.round(rating * 10) / 10),
      imageUrl: svgThumb(categoryId, color), // ✅ light, stable, product-like
    });
  }

  return products;
};

export const categories = [
  { id: "bags", name: "Bags", description: "Practical bags for work, travel, and daily essentials." },
  { id: "shoes", name: "Shoes", description: "Comfortable shoes designed for all-day wear and style." },
];

export const productsByCategory = {
  bags: makeProducts("bags", "Bag", 11),
  shoes: makeProducts("shoes", "Shoe", 29),
};