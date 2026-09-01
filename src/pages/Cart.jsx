import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header searchQuery="" onSearchChange={() => {}} />
      <main className="cart-main">
        <div className="cart-inner">
          <h1 className="cart-title">Your Cart {cartCount > 0 && <span className="cart-title__count">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>}</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty__icon">🛒</p>
              <p className="cart-empty__msg">Your cart is empty.</p>
              <Link to="/" className="cart-empty__link">Continue Shopping</Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Item list */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <Link to={`/products/${item.id}`} className="cart-item__img-wrap">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="cart-item__img"
                      />
                    </Link>
                    <div className="cart-item__details">
                      <Link to={`/products/${item.id}`} className="cart-item__title">
                        {item.title}
                      </Link>
                      <p className="cart-item__unit-price">${item.price.toFixed(2)} each</p>
                      <div className="cart-item__qty-row">
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-item__qty">{item.quantity}</span>
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item__right">
                      <p className="cart-item__line-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <aside className="cart-summary">
                <h2 className="cart-summary__title">Order Summary</h2>
                <div className="cart-summary__row">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary__row cart-summary__row--total">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="cart-summary__checkout-btn">
                  Proceed to Checkout
                </button>
                <Link to="/" className="cart-summary__continue">
                  ← Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
