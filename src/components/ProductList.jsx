import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';
import { useCart } from '../context/CartContext';
import './ProductList.css';

const TABS = ['Top Rated', 'Best Selling', 'Latest Products'];

function ProductList({ searchQuery = '' }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Top Rated');

  useEffect(() => {
    async function load() {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const query = searchQuery.toLowerCase().trim();

  const filteredProducts = query
    ? products.filter((p) => p.title.toLowerCase().includes(query))
    : products;

  const displayedProducts = (() => {
    if (activeTab === 'Top Rated') {
      return [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }
    if (activeTab === 'Best Selling') {
      return [...filteredProducts].sort((a, b) => b.stock - a.stock);
    }
    // Latest Products — original API order
    return filteredProducts;
  })();

  return (
    <section className="product-list" id="products">
      <div className="product-list__inner">
        {/* Section header */}
        <div className="product-list__header">
          <h2 className="product-list__title">
            <span className="product-list__title-bar" />
            Popular Products
          </h2>
          <div className="product-list__tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`product-list__tab${activeTab === tab ? ' product-list__tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="product-list__status">Loading products…</div>
        )}
        {error && (
          <div className="product-list__status product-list__status--error">
            Error: {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && displayedProducts.length === 0 && (
          <div className="product-list__status">
            No products found for &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
        {!loading && !error && displayedProducts.length > 0 && (
          <div className="product-list__grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
