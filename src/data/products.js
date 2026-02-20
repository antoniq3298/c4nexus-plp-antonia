const img = (seed) => `https://picsum.photos/seed/${seed}/600/600`;

const makeProducts = (categoryId, categoryLabel, baseSeed) => {
  const colors = ["Black", "White", "Red", "Blue", "Green", "Beige"];
  const products = [];

  // 48 продукта на категория -> ясно демо за Load More (20 + 20 + 8)
  for (let i = 1; i <= 48; i++) {
    const color = colors[(i + baseSeed) % colors.length];
    const price = 25 + ((i * 7) % 160); // 25..184
    const hasDiscount = i % 4 === 0;
    const discountPct = hasDiscount ? 0.15 + ((i % 3) * 0.05) : 0;
    const discountedPrice = hasDiscount ? Math.round((price * (1 - discountPct)) * 100) / 100 : null;

    const rating = 3 + ((i + baseSeed) % 3) + (((i + 2) % 10) / 10); // 3.0..5.0

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
      imageUrl: img(`${categoryId}-${baseSeed}-${i}`),
    });
  }

  return products;
};

export const categories = [
  {
    id: "bags",
    name: "Bags",
    description: "Practical bags for work, travel, and daily essentials.",
  },
  {
    id: "shoes",
    name: "Shoes",
    description: "Comfortable shoes designed for all-day wear and style.",
  },
];

export const productsByCategory = {
  bags: makeProducts("bags", "Bag", 11),
  shoes: makeProducts("shoes", "Shoe", 29),
};