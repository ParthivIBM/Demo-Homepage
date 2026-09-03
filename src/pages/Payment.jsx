import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';
import './Payment.css';

const STEPS = ['Cart', 'Checkout', 'Payment', 'Confirmation'];

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const order = location.state?.order;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!order) navigate('/checkout', { replace: true });
  }, [navigate, order]);

  if (!order) return null;

  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const { customer } = order;
  const address = [customer.address, customer.apt, customer.city, customer.state, customer.zip, customer.country]
    .filter(Boolean)
    .join(', ');

  function handlePlaceOrder() {
    if (paymentMethod !== 'cod') return;

    const completedOrder = {
      ...order,
      paymentMethod: 'Cash on Delivery',
      itemCount,
    };

    clearCart();
    navigate('/congratulations', { state: { order: completedOrder } });
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header__inner">
          <Link to="/" className="checkout-header__logo">LOGO</Link>
          <span className="checkout-header__secure">
            <span className="checkout-header__secure-icon">🔒</span>
            Secure Checkout
          </span>
        </div>
      </header>

      <div className="checkout-stepper">
        <div className="checkout-stepper__inner">
          {STEPS.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`checkout-stepper__step${index < 2 ? ' checkout-stepper__step--complete' : ''}${index === 2 ? ' checkout-stepper__step--active' : ''}`}>
                <div className="checkout-stepper__circle">{index < 2 ? '✓' : index + 1}</div>
                <span className="checkout-stepper__label">{step}</span>
              </div>
              {index < STEPS.length - 1 && <div className={`checkout-stepper__line${index < 2 ? ' checkout-stepper__line--complete' : ''}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="payment-main">
        <div className="payment-layout">
          <section className="payment-content">
            <div>
              <h1 className="payment-title">Payment Method</h1>
              <p className="payment-subtitle">Select your preferred payment method</p>

              <label className="payment-option payment-option--selected">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span className="payment-option__icon">💵</span>
                <span>
                  <strong>Cash on Delivery (COD)</strong>
                  <small>Pay with cash when your order is delivered to your doorstep.</small>
                </span>
              </label>

              <div className="payment-safe">
                <span className="payment-safe__icon">✓</span>
                <span><strong>Safe &amp; Secure</strong><small>Your order is safe with us. Pay only when you receive your items.</small></span>
              </div>
            </div>

            <div className="payment-actions">
              <button type="button" className="payment-back" onClick={() => navigate('/checkout')}>← Back to Checkout</button>
              <div className="payment-actions__primary">
                <button type="button" className="payment-place" onClick={handlePlaceOrder}>Place Order</button>
                <p>🔒 You will pay in cash when your order is delivered.</p>
              </div>
            </div>
          </section>

          <aside className="payment-summary">
            <h2>Order Summary</h2>
            <div className="payment-summary__items">
              {order.items.map((item) => (
                <div key={item.id} className="payment-summary__item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div><strong>{item.title}</strong><small>Qty: {item.quantity}</small></div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="payment-summary__totals">
              <div><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div><span>Shipping</span><span>${order.shippingCost.toFixed(2)}</span></div>
              <div><span>Tax (8.25%)</span><span>${order.tax.toFixed(2)}</span></div>
              <div className="payment-summary__total"><strong>Total</strong><strong>${order.total.toFixed(2)}</strong></div>
            </div>
            <div className="payment-address">
              <span>🚚</span>
              <div><strong>Shipping Address</strong><p>{address}</p></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Payment;
