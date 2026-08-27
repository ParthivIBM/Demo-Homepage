import React from 'react';
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

function ProductCard({ product }) {
  const { title, price, rating, thumbnail, category } = product;

  return (
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
      </div>
    </div>
  );
}

export default ProductCard;
