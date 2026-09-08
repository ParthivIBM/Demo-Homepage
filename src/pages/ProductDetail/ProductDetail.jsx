import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchProductById } from '../../api';
import { useCart } from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';
import './ProductDetail.css';

/* ── Helpers ─────────────────────────────────────────── */

function StarRating({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="pd-stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'pd-star pd-star--filled' : 'pd-star'}>★</span>
      ))}
      <span className="pd-stars__num">{rating.toFixed(1)}</span>
    </span>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/* ── Component ───────────────────────────────────────── */

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const { data: product, loading, error } = useFetch(fetchProductById, id);
  const [activeImage, setActiveImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top and reset gallery index whenever the product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveImage(0);
  }, [id]);

  /* Search navigates back to Home with the query param */
  function handleSearchChange(query) {
    setSearchQuery(query);
  }

  function handleSearchSubmit(query) {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
  }

  /*
   * Header calls onSearchChange on every keystroke (onChange) AND on
   * Enter/button click. We need navigate to only fire on submission.
   * We detect submission by comparing the incoming value to the current
   * searchQuery — if they are the same trimmed string (no new typing),
   * it's a submit action.
   */
  function handleHeaderSearch(value) {
    const trimmed = value.trim();
    if (trimmed === searchQuery.trim() && trimmed !== '') {
      // Same value submitted → it's the Enter/button action
      handleSearchSubmit(trimmed);
    } else {
      // New value typed
      handleSearchChange(value);
    }
  }

  /* ── Render states ── */
  if (loading) {
    return (
      <>
        <Header searchQuery={searchQuery} onSearchChange={handleHeaderSearch} />
        <main className="pd-status-wrap">
          <div className="pd-status">Loading product…</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header searchQuery={searchQuery} onSearchChange={handleHeaderSearch} />
        <main className="pd-status-wrap">
          <div className="pd-status pd-status--error">Error: {error}</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) return null;

  const {
    title, description, category, price, discountPercentage, rating,
    stock, tags, brand, sku, weight, dimensions, warrantyInformation,
    shippingInformation, availabilityStatus, reviews, returnPolicy,
    minimumOrderQuantity, meta, images, thumbnail,
  } = product;

  const originalPrice = price / (1 - discountPercentage / 100);
  const allImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={handleHeaderSearch} />
      <main className="pd-main">
        <div className="pd-inner">

          {/* ── Breadcrumb ── */}
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="pd-breadcrumb__link">Home</Link>
            <span className="pd-breadcrumb__sep">›</span>
            <span className="pd-breadcrumb__item pd-breadcrumb__item--cap">{category}</span>
            <span className="pd-breadcrumb__sep">›</span>
            <span className="pd-breadcrumb__item pd-breadcrumb__item--current">{title}</span>
          </nav>

          {/* ── Hero ── */}
          <section className="pd-hero">
            {/* Gallery */}
            <div className="pd-gallery">
              <div className="pd-gallery__main">
                <img
                  src={allImages[activeImage]}
                  alt={title}
                  className="pd-gallery__main-img"
                />
              </div>
              {allImages.length > 1 && (
                <div className="pd-gallery__thumbs">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      className={`pd-gallery__thumb${i === activeImage ? ' pd-gallery__thumb--active' : ''}`}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      type="button"
                    >
                      <img src={img} alt={`${title} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="pd-info">
              <p className="pd-info__category">{category}</p>
              <h1 className="pd-info__title">{title}</h1>

              <div className="pd-info__meta-row">
                <StarRating rating={rating} />
                <span className="pd-info__meta-sep">|</span>
                <span className="pd-info__sku">SKU: {sku}</span>
                {brand && (
                  <>
                    <span className="pd-info__meta-sep">|</span>
                    <span className="pd-info__brand">Brand: {brand}</span>
                  </>
                )}
              </div>

              <div className="pd-info__price-row">
                <span className="pd-info__price">${price.toFixed(2)}</span>
                <span className="pd-info__original-price">${originalPrice.toFixed(2)}</span>
                <span className="pd-info__discount">-{discountPercentage.toFixed(0)}%</span>
              </div>

              <div className="pd-info__availability">
                <span
                  className={`pd-info__stock-badge ${
                    availabilityStatus === 'In Stock'
                      ? 'pd-info__stock-badge--in'
                      : 'pd-info__stock-badge--out'
                  }`}
                >
                  {availabilityStatus}
                </span>
                <span className="pd-info__stock-count">{stock} units available</span>
              </div>

              <button
                className={`pd-info__atc-btn${isInCart(product.id) ? ' pd-info__atc-btn--added' : ''}`}
                onClick={() => { if (!isInCart(product.id)) addToCart(product); }}
                disabled={isInCart(product.id) || stock === 0}
              >
                {stock === 0
                  ? 'Out of Stock'
                  : isInCart(product.id)
                  ? '✓ Added to Cart'
                  : 'Add to Cart'}
              </button>

              {tags && tags.length > 0 && (
                <div className="pd-info__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="pd-info__tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="pd-info__logistics">
                <div className="pd-info__logistics-item">
                  <span className="pd-info__logistics-icon">🚚</span>
                  <span>{shippingInformation}</span>
                </div>
                <div className="pd-info__logistics-item">
                  <span className="pd-info__logistics-icon">🛡️</span>
                  <span>{warrantyInformation}</span>
                </div>
                <div className="pd-info__logistics-item">
                  <span className="pd-info__logistics-icon">↩️</span>
                  <span>{returnPolicy}</span>
                </div>
              </div>

              <div className="pd-info__moq">
                Min. order quantity: <strong>{minimumOrderQuantity}</strong>
              </div>
            </div>
          </section>

          {/* ── Description ── */}
          <section className="pd-section">
            <h2 className="pd-section__title">Description</h2>
            <p className="pd-section__body">{description}</p>
          </section>

          {/* ── Specifications ── */}
          <section className="pd-section">
            <h2 className="pd-section__title">Specifications</h2>
            <table className="pd-specs-table">
              <tbody>
                <tr><th>Category</th><td>{category}</td></tr>
                {brand && <tr><th>Brand</th><td>{brand}</td></tr>}
                <tr><th>SKU</th><td>{sku}</td></tr>
                <tr><th>Weight</th><td>{weight} g</td></tr>
                {dimensions && (
                  <tr>
                    <th>Dimensions</th>
                    <td>{dimensions.width} × {dimensions.height} × {dimensions.depth} cm</td>
                  </tr>
                )}
                <tr><th>Min. Order Quantity</th><td>{minimumOrderQuantity}</td></tr>
                <tr><th>Return Policy</th><td>{returnPolicy}</td></tr>
              </tbody>
            </table>
          </section>

          {/* ── Availability & Shipping ── */}
          <section className="pd-section">
            <h2 className="pd-section__title">Availability &amp; Shipping</h2>
            <div className="pd-logistics-grid">
              <div className="pd-logistics-card">
                <span className="pd-logistics-card__icon">📦</span>
                <div>
                  <p className="pd-logistics-card__label">Availability</p>
                  <p className="pd-logistics-card__value">{availabilityStatus}</p>
                </div>
              </div>
              <div className="pd-logistics-card">
                <span className="pd-logistics-card__icon">🚚</span>
                <div>
                  <p className="pd-logistics-card__label">Shipping</p>
                  <p className="pd-logistics-card__value">{shippingInformation}</p>
                </div>
              </div>
              <div className="pd-logistics-card">
                <span className="pd-logistics-card__icon">🛡️</span>
                <div>
                  <p className="pd-logistics-card__label">Warranty</p>
                  <p className="pd-logistics-card__value">{warrantyInformation}</p>
                </div>
              </div>
              <div className="pd-logistics-card">
                <span className="pd-logistics-card__icon">↩️</span>
                <div>
                  <p className="pd-logistics-card__label">Returns</p>
                  <p className="pd-logistics-card__value">{returnPolicy}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Reviews ── */}
          {reviews && reviews.length > 0 && (
            <section className="pd-section">
              <h2 className="pd-section__title">
                Customer Reviews
                <span className="pd-section__title-count">({reviews.length})</span>
              </h2>
              <div className="pd-reviews">
                {reviews.map((review, i) => (
                  <div key={i} className="pd-review">
                    <div className="pd-review__header">
                      <div className="pd-review__avatar">
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="pd-review__meta">
                        <p className="pd-review__name">{review.reviewerName}</p>
                        <p className="pd-review__date">{formatDate(review.date)}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="pd-review__comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Meta ── */}
          {meta && (
            <section className="pd-section">
              <h2 className="pd-section__title">Product Information</h2>
              <div className="pd-meta">
                <div className="pd-meta__details">
                  <table className="pd-specs-table">
                    <tbody>
                      {meta.barcode && <tr><th>Barcode</th><td>{meta.barcode}</td></tr>}
                      {meta.createdAt && <tr><th>Listed</th><td>{formatDate(meta.createdAt)}</td></tr>}
                      {meta.updatedAt && <tr><th>Last Updated</th><td>{formatDate(meta.updatedAt)}</td></tr>}
                    </tbody>
                  </table>
                </div>
                {meta.qrCode && (
                  <div className="pd-meta__qr">
                    <img src={meta.qrCode} alt="Product QR Code" className="pd-meta__qr-img" />
                    <p className="pd-meta__qr-label">Scan to view</p>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;
