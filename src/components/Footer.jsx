import React, { useState } from 'react';
import './Footer.css';

const footerColumns = [
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Store Locations', 'Our Blog', 'Reviews'],
  },
  {
    heading: 'Shop',
    links: ['Game & Video', 'Phone & Tablets', 'Computers & Laptop', 'Sport Watches', 'Discounts'],
  },
  {
    heading: 'Support',
    links: ['FAQs', 'Reviews', 'Contact Us', 'Shipping', 'Returns'],
  },
];

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="footer">
      {/* Newsletter strip */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <h3 className="footer__newsletter-heading">
              Subscribe for <br /> Latest Trends &amp; Offers
            </h3>
          </div>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="footer__newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer__newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Services strip */}
      <div className="footer__services">
        <div className="footer__services-inner">
          {[
            { icon: '🚚', title: 'Free Shipping', desc: 'Free Shipping for orders over $120' },
            { icon: '💰', title: 'Refund', desc: 'Within 30 days for an exchange' },
            { icon: '🎧', title: 'Support', desc: '24 hours a day, 7 days a week' },
            { icon: '💳', title: 'Payment', desc: 'Pay with Multiple Credit Cards' },
          ].map((s) => (
            <div key={s.title} className="footer__service-item">
              <span className="footer__service-icon">{s.icon}</span>
              <div>
                <p className="footer__service-title">{s.title}</p>
                <p className="footer__service-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer columns */}
      <div className="footer__main">
        <div className="footer__main-inner">
          {/* Brand column */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">LOGO</a>
            <p className="footer__brand-desc">
              The home and elements needed to create beautiful products.
            </p>
            <div className="footer__socials">
              {['f', 't', 'in', '▶'].map((s) => (
                <a key={s} href="/" className="footer__social-link">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="footer__col">
              <h4 className="footer__col-heading">{col.heading}</h4>
              <ul className="footer__col-links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="/" className="footer__col-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Talk to Us column */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Talk To Us</h4>
            <p className="footer__contact-text">
              Find a location nearest you. <a href="/" className="footer__contact-link">See Our Stores</a>
            </p>
            <p className="footer__contact-phone">+624 423 26 72</p>
            <p className="footer__contact-email">support@harry.com</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} LOGO. All rights reserved.
          </p>
          <div className="footer__payments">
            {['PayPal', 'Visa', 'Mastercard', 'Stripe'].map((p) => (
              <span key={p} className="footer__payment-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
