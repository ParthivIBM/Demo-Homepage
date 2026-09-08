import React from 'react';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/#products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function Header({ searchQuery = '', onSearchChange, showSearch = true }) {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth();

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
          {showSearch && (
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
          )}
          <button className="header__icon-btn" aria-label="Wishlist" type="button">
            ♡
          </button>
          <button
            className="header__icon-btn header__cart-btn"
            aria-label="Cart"
            type="button"
            onClick={() => navigate('/cart')}
          >
            🛒
            <span className="header__cart-badge">{cartCount}</span>
          </button>
          <div className="header__user">
            <span className="header__username">Hi, {currentUser}</span>
            <button
              className="header__orders-btn"
              type="button"
              onClick={() => navigate('/track-order')}
            >
              📦 Orders
            </button>
            <button
              className="header__logout-btn"
              type="button"
              onClick={() => { logout(); navigate('/login'); }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
