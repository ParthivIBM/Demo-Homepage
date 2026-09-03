import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';
import './Payment.css';
import './Congratulations.css';

const STEPS = ['Cart', 'Checkout', 'Payment', 'Confirmation'];
const ORDER_NUMBER = 'ORD12345678';

function Congratulations() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!order) navigate('/', { replace: true });
  }, [navigate, order]);

  if (!order) return null;

  return (
    <div className="checkout-page confirmation-page">
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
              <div className={`checkout-stepper__step${index < 3 ? ' checkout-stepper__step--complete' : ' checkout-stepper__step--active'}`}>
                <div className="checkout-stepper__circle">{index < 3 ? '✓' : index + 1}</div>
                <span className="checkout-stepper__label">{step}</span>
              </div>
              {index < STEPS.length - 1 && <div className="checkout-stepper__line checkout-stepper__line--complete" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="confirmation-main">
        <section className="confirmation-hero">
          <div className="confirmation-check">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been placed successfully.<br />You will pay in cash when your order is delivered.</p>

          <div className="confirmation-number">
            <span>Your Order Number</span>
            <strong>{ORDER_NUMBER}</strong>
          </div>
        </section>

        <div className="confirmation-grid">
          <section className="confirmation-card confirmation-order">
            <h2>Order Summary</h2>
            <div className="confirmation-order__body">
              <div className="confirmation-thumbnails">
                {order.items.slice(0, 3).map((item) => (
                  <img key={item.id} src={item.thumbnail} alt={item.title} />
                ))}
              </div>
              <div className="confirmation-order__details">
                <span>{order.itemCount} {order.itemCount === 1 ? 'Item' : 'Items'}</span>
                <span>Cash on Delivery <em>COD</em></span>
              </div>
              <strong className="confirmation-order__total">${order.total.toFixed(2)}</strong>
            </div>
            <p className="confirmation-email">✉ A confirmation email has been sent to {order.customer.email}</p>
          </section>

          <section className="confirmation-card confirmation-next">
            <h2>What Happens Next?</h2>
            <div><span>□</span><p>We are preparing your order</p></div>
            <div><span>🚚</span><p>Your order will be delivered soon</p></div>
            <div><span>💵</span><p>Pay in cash when your order is delivered</p></div>
          </section>
        </div>

        <Link to="/" className="confirmation-continue">Continue Shopping</Link>
      </main>
    </div>
  );
}

export default Congratulations;
