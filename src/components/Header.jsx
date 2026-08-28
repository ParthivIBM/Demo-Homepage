import React from 'react';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/#products' },
  { label: 'About', to: '/#footer' },
  { label: 'Contact', to: '/#footer' },
];

function Header({ searchQuery = '', onSearchChange }) {
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearchChange(e.target.value.trim());
      }
    },
    [onSearchChange]
  );

  function handleAnchorClick(e, to) {
    const anchorMap = {
      '/#products': 'products',
      '/#footer': 'footer',
    };
    const targetId = anchorMap[to];
    if (!targetId) return;

    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Not on homepage yet — navigate there then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }

  return (
    <header className="header">
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          LOGO
        </Link>

        {/* Nav */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {navLinks.map(({ label, to }) => (
              <li key={label} className="header__nav-item">
                <Link
                  to={to}
                  className="header__nav-link"
                  onClick={(e) => handleAnchorClick(e, to)}
                >
                  {label}
                </Link>
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
