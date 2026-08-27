# Homepage Plan

## Top-Level Overview

Build a fully functional e-commerce-style homepage in the existing Create React App project (`demo-homepage`). The page runs on `localhost:3000` and is composed of reusable components: `Header`, `Banner`, `ProductList` (with `ProductCard`), and `Footer`. Products are fetched live from `https://dummyjson.com/products` using React hooks (`useState`, `useEffect`). Styling is done with plain CSS (no external framework). The layout closely matches the provided reference screenshot.

### File Structure Target

```
src/
  App.js            ← rewritten to render <Home />
  index.js          ← kept as entry point (renders <App />)
  App.css           ← reset/global styles
  index.css         ← body/font reset (keep as-is)
  components/
    Header.jsx
    Banner.jsx
    ProductList.jsx
    ProductCard.jsx
    Footer.jsx
  pages/
    Home.jsx
```

> Note: The user requested `App.jsx` and `main.jsx` in root of `src`. Since CRA uses `index.js` and `App.js` as its hardcoded entry points, we rewrite those files with `.jsx`-compatible content (JSX works in `.js` files in CRA). This avoids ejecting or reconfiguring the build tool.

---

## Sub-Tasks

---

### Sub-Task 1 — Reset App.js and App.css

**Intent:** Clear the default CRA boilerplate so `App.js` simply renders `<Home />` and `App.css` provides only global resets and shared utility styles.

**Expected Outcomes:**
- `App.js` imports and renders `<Home />` from `pages/Home.jsx`
- `App.css` contains only a minimal CSS reset (margin, box-sizing, font-family)
- The app still compiles without errors

**Todo List:**
1. Rewrite `src/App.js` to import `Home` from `./pages/Home` and return `<Home />`
2. Rewrite `src/App.css` to contain a CSS reset (remove logo spin animation, default colors, etc.)

**Relevant Context:**
- File: `src/App.js` — currently default CRA template
- File: `src/App.css` — currently default CRA styles

**Status:** [ ] pending

---

### Sub-Task 2 — Create Header.jsx

**Intent:** Build a sticky navigation header with a logo on the left, navigation links in the center, and search + cart/user icons on the right. This matches the top bar in the reference screenshot.

**Expected Outcomes:**
- `Header.jsx` renders a full-width nav bar
- Logo text "LOGO" on the left
- Nav items: Home, Products, About, Contact
- Search input + cart icon on the right (can be placeholder icons using Unicode or simple text)
- Responsive layout using flexbox
- Component has its own scoped CSS (inline or a `Header.css` file imported inside the component)

**Todo List:**
1. Create `src/components/Header.jsx` with a `<header>` element
2. Add logo, nav links, and action icons
3. Create `src/components/Header.css` with flexbox layout, sticky positioning, white background, subtle box-shadow
4. Import and use `Header.css` inside `Header.jsx`

**Relevant Context:**
- Reference screenshot: white background header, logo left, links center, icons right
- No router needed — links can be `<a href="#">`

**Status:** [ ] pending

---

### Sub-Task 3 — Create Banner.jsx

**Intent:** Build the hero/banner section with a background color, a bold headline, subheading text, a CTA button, and a placeholder product image on the right side. Matches the large hero section in the reference screenshot.

**Expected Outcomes:**
- `Banner.jsx` renders a two-column layout (text left, image right)
- Headline: "Find Best Products Today"
- Subheading: "Shop the latest collection"
- CTA button: "Shop Now →"
- Image: a free placeholder image (e.g. `https://placehold.co/400x300` or `https://picsum.photos/400/300`)
- Light background color (e.g. `#f0f4f0` to match the mint/grey in reference)
- Component has its own `Banner.css`

**Todo List:**
1. Create `src/components/Banner.jsx` with a two-column flex layout
2. Left column: badge label, h1 headline, p subheading, CTA button
3. Right column: `<img>` using a placeholder image URL
4. Create `src/components/Banner.css` with layout, typography, button, and responsive styles
5. Import and use `Banner.css` inside `Banner.jsx`

**Relevant Context:**
- Reference screenshot: light greenish background, bold headline, right-side model/product image in a circle
- Placeholder image can be: `https://picsum.photos/seed/banner/500/400`

**Status:** [ ] pending

---

### Sub-Task 4 — Create ProductCard.jsx

**Intent:** Build a single product card component that accepts a product object as a prop and displays the thumbnail image, title, price, and star rating. This is used by `ProductList`.

**Expected Outcomes:**
- `ProductCard.jsx` accepts `product` prop with shape `{ id, title, price, rating, thumbnail }`
- Renders: product image, title (truncated if long), price (`$XX.XX`), star rating (e.g. ★★★★☆ rendered from the numeric rating value)
- Hover effect: subtle shadow or scale transform
- Compact card layout matching reference screenshot grid cards
- Component has its own `ProductCard.css`

**Todo List:**
1. Create `src/components/ProductCard.jsx` with props destructuring
2. Render image, title, price, and star rating from the numeric `rating` field (round to nearest integer, display filled/empty stars)
3. Create `src/components/ProductCard.css` with card layout, shadow, hover effect, image sizing
4. Import `ProductCard.css` inside `ProductCard.jsx`

**Relevant Context:**
- API response shape: `{ id, title, price, rating, thumbnail, category }`
- Rating is a float (e.g. `2.56`) — render as stars by rounding

**Status:** [ ] pending

---

### Sub-Task 5 — Create ProductList.jsx

**Intent:** Build the product listing section that fetches all products from the DummyJSON API using `useState` + `useEffect` hooks, then renders a responsive grid of `ProductCard` components. Includes a section title and a loading/error state.

**Expected Outcomes:**
- `ProductList.jsx` fetches `https://dummyjson.com/products` on mount
- Shows a loading message while fetching
- Shows an error message if fetch fails
- Renders products in a 4-column responsive CSS grid
- Section has a "Popular Products" heading matching the reference
- Component has its own `ProductList.css`

**Todo List:**
1. Create `src/components/ProductList.jsx`
2. Add `useState` for `products`, `loading`, `error`
3. Add `useEffect` to fetch `https://dummyjson.com/products` on mount, parse JSON, set state
4. Conditionally render loading spinner text, error text, or the products grid
5. Map over `products` array, render `<ProductCard key={p.id} product={p} />` for each
6. Create `src/components/ProductList.css` with grid layout (4 columns desktop, 2 tablet, 1 mobile)
7. Import `ProductList.css` inside `ProductList.jsx`

**Relevant Context:**
- API: `GET https://dummyjson.com/products` → `{ products: [...], total, skip, limit }`
- `products` array items have: `id, title, price, rating, thumbnail, category, description`
- ProductCard must be imported from `./ProductCard`

**Status:** [ ] pending

---

### Sub-Task 6 — Create Footer.jsx

**Intent:** Build the page footer with a logo + description on the left, multiple link columns in the center, and a newsletter subscribe form + social/payment icons on the right. Matches the multi-column footer in the reference screenshot.

**Expected Outcomes:**
- `Footer.jsx` renders a dark or white multi-column footer
- Left column: LOGO text + short description + social links (text-based or Unicode icons)
- Middle columns: Company links, Shop links, Support links
- Right column: "Talk to Us" — phone + email
- Above the footer columns: a subscribe newsletter strip (email input + Subscribe button)
- Bottom bar: copyright text
- Component has its own `Footer.css`

**Todo List:**
1. Create `src/components/Footer.jsx` with a newsletter strip section at top
2. Add a 4-column grid below: Logo+desc, Company links, Shop links, Support links, Talk to Us
3. Add bottom copyright bar
4. Create `src/components/Footer.css` with grid layout, colors, spacing
5. Import `Footer.css` inside `Footer.jsx`

**Relevant Context:**
- Reference screenshot: white footer background, "Subscribe for Latest Trends & Offers" section, then 5-column link grid, then payment icons row
- Links are `<a href="#">` placeholders

**Status:** [ ] pending

---

### Sub-Task 7 — Create Home.jsx and wire everything together

**Intent:** Create the `Home` page component that composes `Header`, `Banner`, `ProductList`, and `Footer` in correct order. Also ensures `App.js` correctly imports `Home`.

**Expected Outcomes:**
- `src/pages/Home.jsx` imports and renders all four components vertically: `Header` → `Banner` → `ProductList` → `Footer`
- `src/App.js` imports and renders `<Home />`
- `src/App.css` is minimal global reset
- App runs on `localhost:3000` without errors
- Layout matches reference screenshot: full-width header, then hero banner, then product grid section, then footer

**Todo List:**
1. Create `src/pages/Home.jsx` that imports Header, Banner, ProductList, Footer
2. Return them wrapped in a `<div className="home">` or `<>` fragment in order
3. Verify `src/App.js` has been updated (Sub-Task 1) to import and render `<Home />`
4. Do a final review of all component imports and CSS imports to ensure no missing references

**Relevant Context:**
- `App.js` renders `<Home />` (set up in Sub-Task 1)
- All components are in `src/components/`
- `Home.jsx` is in `src/pages/`

**Status:** [ ] pending

---

## Implementation Order

Sub-tasks must be implemented in this order (each builds on the previous):

1. Sub-Task 1 — Reset App.js + App.css
2. Sub-Task 2 — Header.jsx
3. Sub-Task 3 — Banner.jsx
4. Sub-Task 4 — ProductCard.jsx
5. Sub-Task 5 — ProductList.jsx (depends on ProductCard)
6. Sub-Task 6 — Footer.jsx
7. Sub-Task 7 — Home.jsx + wire-up (depends on all components)
