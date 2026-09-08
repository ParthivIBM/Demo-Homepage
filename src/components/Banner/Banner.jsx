import React from 'react';
import './Banner.css';

const HOME_IMAGE =
  'https://static.vecteezy.com/system/resources/previews/020/933/220/non_2x/shopping-with-mobile-app-on-their-smartphones-man-and-woman-shopping-online-store-sale-discount-promot-special-percent-design-vector.jpg';

function Banner({
  imageUrl = HOME_IMAGE,
  badge = 'Best Deals · New Arrivals',
  headline = (
    <>
      Find Best <br />
      Products Today.
    </>
  ),
  subtext = 'Shop the latest collection of top-rated products at unbeatable prices.',
  ctaLabel = 'Shop Now →',
  ctaHref = '#products',
}) {
  return (
    <section className="banner">
      <div className="banner__inner">
        <div className="banner__content">
          <span className="banner__badge">{badge}</span>
          <h1 className="banner__headline">{headline}</h1>
          <p className="banner__subtext">{subtext}</p>
          <a href={ctaHref} rel="noopener noreferrer" className="banner__cta">
            {ctaLabel}
          </a>
        </div>
        <div className="banner__image-wrap">
          <div className="banner__image-circle">
            <img
              src={imageUrl}
              alt={typeof headline === 'string' ? headline : 'Banner image'}
              className="banner__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
