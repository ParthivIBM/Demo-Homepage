import React from 'react';
import { useCallback } from 'react';
import './Header.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Header({ searchQuery = '', onSearchChange }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearchChange(e.target.value.trim());
      }
    },
    [onSearchChange]
  );

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo */}
        <a href="/" className="header__logo">
          LOGO
        </a>

        {/* Nav */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map(({ label, href }) => (
              <li key={label} className="header__nav-item">
                <a href={href} className="header__nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <div className="header__search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search for products..."
              className="header__search-input"
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="header__icon-btn header__search-btn"
              aria-label="Search"
              type="button"
              onClick={() => onSearchChange(searchQuery.trim())}
            >
              🔍
            </button>
          </div>
          <button className="header__icon-btn" aria-label="Wishlist" type="button">
            ♡
          </button>
          <button className="header__icon-btn header__cart-btn" aria-label="Cart" type="button">
            🛒
            <span className="header__cart-badge">0</span>
          </button>
          <button className="header__icon-btn" aria-label="Account" type="button">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
