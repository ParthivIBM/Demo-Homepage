import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './OrderTracking.css';

const ORDERS_KEY = 'app_orders';

const STATUS_STEPS = [
  { label: 'Order Placed',  icon: '📋', desc: 'We have received your order.' },
  { label: 'Processing',    icon: '⚙️',  desc: 'Your order is being prepared.' },
  { label: 'Shipped',       icon: '🚚', desc: 'Your order is on the way.' },
  { label: 'Delivered',     icon: '✅', desc: 'Order delivered successfully.' },
];

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function OrderTracking() {
  
  const [searchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);   // found order object
  const [searched, setSearched] = useState(false);

  // Auto-lookup when ?order= param is present
  useEffect(() => {
    const param = searchParams.get('order');
    if (param) {
      setInputValue(param);
      const orders = loadOrders();
      const found = orders.find((o) => o.orderNumber === param);
      setResult(found ?? null);
      setSearched(true);
    }
  }, [searchParams]);

  function handleTrack(e) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const orders = loadOrders();
    const found = orders.find((o) => o.orderNumber === trimmed);
    setResult(found ?? null);
    setSearched(true);
  }

  const customer = result?.customer;
  const address = customer
    ? [customer.address, customer.apt, customer.city, customer.state, customer.zip, customer.country]
        .filter(Boolean).join(', ')
    : '';

  return (
    <div className="ot-page">
      <Header showSearch={false} />

      <main className="ot-main">
        <div className="ot-inner">

          {/* Page title */}
          <div className="ot-title-row">
            <h1 className="ot-title">Track Your Order</h1>
            <p className="ot-subtitle">Enter your order number to see the current status.</p>
          </div>

          {/* Search form */}
          <form className="ot-search" onSubmit={handleTrack}>
            <input
              type="text"
              className="ot-search__input"
              placeholder="e.g. ORD-1700000000000-AB12"
              value={inputValue}
              onChange={(e) => { setInputValue(e.target.value); setSearched(false); }}
            />
            <button type="submit" className="ot-search__btn">Track →</button>
          </form>

          {/* Results */}
          {searched && !result && (
            <div className="ot-not-found">
              <span className="ot-not-found__icon">🔍</span>
              <p className="ot-not-found__msg">No order found for <strong>{inputValue}</strong>.</p>
              <p className="ot-not-found__hint">Double-check the order number from your confirmation page.</p>
            </div>
          )}

          {result && (
            <div className="ot-result">

              {/* Order header */}
              <div className="ot-result__header">
                <div>
                  <p className="ot-result__label">Order Number</p>
                  <p className="ot-result__order-num">{result.orderNumber}</p>
                </div>
                <div>
                  <p className="ot-result__label">Placed On</p>
                  <p className="ot-result__date">{formatDate(result.placedAt)}</p>
                </div>
                <div>
                  <p className="ot-result__label">Total</p>
                  <p className="ot-result__total">${result.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="ot-result__label">Payment</p>
                  <p className="ot-result__payment">{result.paymentMethod}</p>
                </div>
              </div>

              {/* Status timeline */}
              <section className="ot-timeline">
                <h2 className="ot-section-title">Order Status</h2>
                <div className="ot-timeline__steps">
                  {STATUS_STEPS.map((step, i) => (
                    <div
                      key={step.label}
                      className={`ot-timeline__step${i === 0 ? ' ot-timeline__step--active' : ' ot-timeline__step--pending'}`}
                    >
                      <div className="ot-timeline__icon-wrap">
                        <span className="ot-timeline__icon">{step.icon}</span>
                        {i < STATUS_STEPS.length - 1 && (
                          <div className={`ot-timeline__line${i === 0 ? ' ot-timeline__line--done' : ''}`} />
                        )}
                      </div>
                      <div className="ot-timeline__info">
                        <p className="ot-timeline__label">{step.label}</p>
                        <p className="ot-timeline__desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Items */}
              <section className="ot-items">
                <h2 className="ot-section-title">Items Ordered</h2>
                <div className="ot-items__list">
                  {result.items.map((item) => (
                    <div key={item.id} className="ot-item">
                      <img src={item.thumbnail} alt={item.title} className="ot-item__img" />
                      <div className="ot-item__info">
                        <p className="ot-item__title">{item.title}</p>
                        <p className="ot-item__qty">Qty: {item.quantity}</p>
                      </div>
                      <span className="ot-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Delivery + totals */}
              <div className="ot-meta-grid">
                <section className="ot-card">
                  <h2 className="ot-section-title">Delivery Address</h2>
                  <p className="ot-card__name">{customer.fullName}</p>
                  <p className="ot-card__address">{address}</p>
                  <p className="ot-card__contact">{customer.email}</p>
                  <p className="ot-card__contact">{customer.phone}</p>
                </section>

                <section className="ot-card">
                  <h2 className="ot-section-title">Order Summary</h2>
                  <div className="ot-totals">
                    <div className="ot-totals__row">
                      <span>Subtotal ({result.itemCount} {result.itemCount === 1 ? 'item' : 'items'})</span>
                      <span>${result.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="ot-totals__row">
                      <span>Shipping ({result.shippingMethod?.label})</span>
                      <span>${result.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="ot-totals__row">
                      <span>Tax</span>
                      <span>${result.tax.toFixed(2)}</span>
                    </div>
                    <div className="ot-totals__row ot-totals__row--total">
                      <strong>Total</strong>
                      <strong>${result.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          )}

          {!searched && (
            <div className="ot-empty-state">
              <span className="ot-empty-state__icon">📦</span>
              <p>Enter an order number above to track your shipment.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default OrderTracking;
