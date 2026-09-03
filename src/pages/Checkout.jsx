import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const STEPS = ['Cart', 'Checkout', 'Payment', 'Confirmation'];
const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Shipping', days: '3–5 business days', price: 4.99 },
  { id: 'express',  label: 'Express Shipping',  days: '1–2 business days', price: 9.99 },
];
const TAX_RATE = 0.0825;

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia',
  'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico',
];

const EMPTY_FORM = {
  email: '',
  phone: '',
  fullName: '',
  address: '',
  apt: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

const REQUIRED_FIELDS = ['email', 'phone', 'fullName', 'address', 'city', 'state', 'zip', 'country'];

const FIELD_LABELS = {
  email:    'Email Address',
  phone:    'Phone Number',
  fullName: 'Full Name',
  address:  'Address',
  city:     'City',
  state:    'State',
  zip:      'ZIP Code',
  country:  'Country',
};

function validate(form) {
  const errors = {};
  REQUIRED_FIELDS.forEach((key) => {
    if (!form[key].trim()) {
      errors[key] = `${FIELD_LABELS[key]} is required`;
    }
  });
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }
  return errors;
}

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [shipping, setShipping] = useState('standard');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === shipping);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedShipping.price;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleContinue() {
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstKey = REQUIRED_FIELDS.find((k) => newErrors[k]);
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    navigate('/payment', {
      state: {
        order: {
          customer: form,
          shippingMethod: selectedShipping,
          items: cartItems.map((item) => ({ ...item })),
          subtotal,
          shippingCost,
          tax,
          total,
        },
      },
    });
  }

  function inputClass(field) {
    return `checkout-field__input${errors[field] ? ' checkout-field__input--error' : ''}`;
  }

  function selectClass(field) {
    return `checkout-field__select${errors[field] ? ' checkout-field__select--error' : ''}`;
  }

  return (
    <div className="checkout-page">
      {/* ── Checkout header ── */}
      <header className="checkout-header">
        <div className="checkout-header__inner">
          <Link to="/" className="checkout-header__logo">LOGO</Link>
          <span className="checkout-header__secure">
            <span className="checkout-header__secure-icon">🔒</span>
            Secure Checkout
          </span>
        </div>
      </header>

      {/* ── Progress stepper ── */}
      <div className="checkout-stepper">
        <div className="checkout-stepper__inner">
          {STEPS.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`checkout-stepper__step${index === 1 ? ' checkout-stepper__step--active' : ''}`}>
                <div className="checkout-stepper__circle">{index + 1}</div>
                <span className="checkout-stepper__label">{step}</span>
              </div>
              {index < STEPS.length - 1 && <div className="checkout-stepper__line" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Page body ── */}
      <main className="checkout-main">
        <div className="checkout-main__inner">

          {/* ── LEFT: Form ── */}
          <div className="checkout-form-col">

            {/* Contact Information */}
            <section className="checkout-section">
              <h2 className="checkout-section__title">Contact Information</h2>
              <div className="checkout-row-2">
                <div className="checkout-field">
                  <label className="checkout-field__label" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={inputClass('email')}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <span className="checkout-field__error">{errors.email}</span>}
                </div>
                <div className="checkout-field">
                  <label className="checkout-field__label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={inputClass('phone')}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <span className="checkout-field__error">{errors.phone}</span>}
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="checkout-section">
              <h2 className="checkout-section__title">Shipping Address</h2>

              <div className="checkout-field">
                <label className="checkout-field__label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={inputClass('fullName')}
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                {errors.fullName && <span className="checkout-field__error">{errors.fullName}</span>}
              </div>

              <div className="checkout-field">
                <label className="checkout-field__label" htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className={inputClass('address')}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                />
                {errors.address && <span className="checkout-field__error">{errors.address}</span>}
              </div>

              <div className="checkout-field">
                <label className="checkout-field__label" htmlFor="apt">
                  Apartment, suite, etc. <span style={{ fontWeight: 400, textTransform: 'none' }}>(optional)</span>
                </label>
                <input
                  id="apt"
                  name="apt"
                  type="text"
                  className="checkout-field__input"
                  value={form.apt}
                  onChange={handleChange}
                  placeholder="Apt 4B"
                />
              </div>

              <div className="checkout-row-3">
                <div className="checkout-field">
                  <label className="checkout-field__label" htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className={inputClass('city')}
                    value={form.city}
                    onChange={handleChange}
                    placeholder="New York"
                  />
                  {errors.city && <span className="checkout-field__error">{errors.city}</span>}
                </div>

                <div className="checkout-field">
                  <label className="checkout-field__label" htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    type="state"
                    className={inputClass('state')}
                    value={form.state}
                    onChange={handleChange}
                    placeholder="NY"
                  />
                  {errors.state && <span className="checkout-field__error">{errors.state}</span>}
                </div>

                <div className="checkout-field">
                  <label className="checkout-field__label" htmlFor="zip">ZIP Code</label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    className={inputClass('zip')}
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="10001"
                  />
                  {errors.zip && <span className="checkout-field__error">{errors.zip}</span>}
                </div>
              </div>

              <div className="checkout-field" style={{ marginTop: '14px' }}>
                <label className="checkout-field__label" htmlFor="country">Country</label>
                <div className="checkout-field__select-wrap">
                  <select
                    id="country"
                    name="country"
                    className={selectClass('country')}
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {errors.country && <span className="checkout-field__error">{errors.country}</span>}
              </div>
            </section>

            {/* Shipping Method */}
            <section className="checkout-section">
              <h2 className="checkout-section__title">Shipping Method</h2>
              {SHIPPING_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className={`checkout-shipping__option${shipping === option.id ? ' checkout-shipping__option--selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={shipping === option.id}
                    onChange={() => setShipping(option.id)}
                  />
                  <span className="checkout-shipping__icon">🚚</span>
                  <span className="checkout-shipping__info">
                    <span className="checkout-shipping__name">{option.label}</span>
                    <span className="checkout-shipping__days">{option.days}</span>
                  </span>
                  <span className="checkout-shipping__price">${option.price.toFixed(2)}</span>
                </label>
              ))}
            </section>

          </div>

          {/* ── RIGHT: Order Summary ── */}
          <aside className="checkout-summary">
            <h2 className="checkout-summary__title">Order Summary</h2>

            {cartItems.length > 0 ? (
              <div className="checkout-summary__items">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-summary__item">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="checkout-summary__img"
                    />
                    <div className="checkout-summary__item-info">
                      <p className="checkout-summary__item-name">{item.title}</p>
                      <p className="checkout-summary__item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="checkout-summary__item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', color: '#57606a', marginBottom: '20px' }}>
                Your cart is empty.
              </p>
            )}

            <hr className="checkout-summary__divider" />

            <div className="checkout-summary__row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-summary__cta-btn" onClick={handleContinue}>
              Continue to Payment
            </button>

            <p className="checkout-summary__secure-note">
              <span>🛡</span> Your payment information is secure
            </p>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default Checkout;
