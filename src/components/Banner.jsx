import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <section className="banner">
      <div className="banner__inner">
        <div className="banner__content">
          <span className="banner__badge">Best Deals · New Arrivals</span>
          <h1 className="banner__headline">
            Find Best <br />
            Products Today.
          </h1>
          <p className="banner__subtext">
            Shop the latest collection of top-rated products at unbeatable prices.
          </p>
          <a href="#products" rel="noopener noreferrer" className="banner__cta">
            Shop Now →
          </a>
        </div>
        <div className="banner__image-wrap">
          <div className="banner__image-circle">
            <img
              src="https://picsum.photos/seed/banner-hero/480/480"
              alt="Featured product"
              className="banner__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
