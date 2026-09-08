import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function StarRating({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="product-card__stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'star star--filled' : 'star'}>
          ★
        </span>
      ))}
      <span className="product-card__rating-num">{rating.toFixed(1)}</span>
    </span>
  );
}

function ProductCard({ product, onAddToCart }) {
  const { id, title, price, rating, thumbnail, category } = product;
  const { isInCart } = useCart();
  const added = isInCart(id);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!added && onAddToCart) onAddToCart(product);
  }

  return (
    <Link to={`/products/${id}`} className="product-card__link">
      <div className="product-card">
        <div className="product-card__image-wrap">
          <img
            src={thumbnail}
            alt={title}
            className="product-card__image"
            loading="lazy"
          />
          <span className="product-card__category">{category}</span>
        </div>
        <div className="product-card__body">
          <h3 className="product-card__title">{title}</h3>
          <StarRating rating={rating} />
          <p className="product-card__price">${price.toFixed(2)}</p>
          <button
            className={`product-card__atc-btn${added ? ' product-card__atc-btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
            aria-label={added ? 'Already in cart' : 'Add to cart'}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
