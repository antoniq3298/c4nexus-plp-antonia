# C4Nexus PLP – Junior Developer Technical Task

## Implemented

- Sticky header with category switch (Bags / Shoes)
- Product grid with initial 20 items (max 5 rows on desktop)
- Load More functionality
- Filtering by:
  - Color
  - Price range
- Sorting by:
  - Alphabetical (A–Z)
  - Alphabetical (Z–A)
  - Price Low–High
  - Price High–Low
- Product tile contains:
  - Image
  - Product name
  - Short description
  - Price (with discounted price for some products)
  - Star rating
  - Add to Cart button (with confirmation alert)
- Responsive layout (desktop, tablet, mobile)
- Footer section

---

## Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS (custom styling)
- No external UI libraries used

---

## How It Works

Products are generated per category and stored locally.
Filtering and sorting are handled using React state and memoized computations.
Pagination is implemented using a visible item counter and Load More button.

---

## Challenges

- Maintaining 5 rows maximum on desktop (4 columns layout)
- Keeping layout responsive while preserving filter sidebar
- Managing state for filtering, sorting and pagination simultaneously
- Ensuring UI matches wireframe requirements while keeping logic intact