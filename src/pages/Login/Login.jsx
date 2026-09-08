import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('signin'); // 'signin' | 'signup' | 'track'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [trackInput, setTrackInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (tab === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const err = register(username, password);
      if (err) { setError(err); return; }
    } else {
      const err = login(username, password);
      if (err) { setError(err); return; }
    }

    navigate('/');
  }

  function switchTab(t) {
    setTab(t);
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setTrackInput('');
  }

  function handleTrackSubmit(e) {
    e.preventDefault();
    const trimmed = trackInput.trim();
    if (!trimmed) return;
    navigate(`/track-order?order=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-card__logo">LOGO</div>
        <p className="login-card__tagline">Your one-stop shop for top-rated products.</p>

        {/* Tabs */}
        <div className="login-card__tabs">
          <button
            className={`login-card__tab${tab === 'signin' ? ' login-card__tab--active' : ''}`}
            onClick={() => switchTab('signin')}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`login-card__tab${tab === 'signup' ? ' login-card__tab--active' : ''}`}
            onClick={() => switchTab('signup')}
            type="button"
          >
            Sign Up
          </button>
          <button
            className={`login-card__tab${tab === 'track' ? ' login-card__tab--active' : ''}`}
            onClick={() => switchTab('track')}
            type="button"
          >
            Track Order
          </button>
        </div>

        {/* Track Order form */}
        {tab === 'track' && (
          <form className="login-form" onSubmit={handleTrackSubmit}>
            <p className="login-card__track-hint">
              Enter your order number to check the status without signing in.
            </p>
            <div className="login-form__field">
              <label className="login-form__label" htmlFor="lf-track">Order Number</label>
              <input
                id="lf-track"
                type="text"
                className="login-form__input"
                placeholder="e.g. ORD-1700000000000-AB12"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-form__submit">Track Order →</button>
          </form>
        )}

        {/* Sign In / Sign Up form */}
        {tab !== 'track' && (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__field">
            <label className="login-form__label" htmlFor="lf-username">Username</label>
            <input
              id="lf-username"
              type="text"
              className="login-form__input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="login-form__field">
            <label className="login-form__label" htmlFor="lf-password">Password</label>
            <input
              id="lf-password"
              type="password"
              className="login-form__input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              required
            />
          </div>

          {tab === 'signup' && (
            <div className="login-form__field">
              <label className="login-form__label" htmlFor="lf-confirm">Confirm Password</label>
              <input
                id="lf-confirm"
                type="password"
                className="login-form__input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {error && <p className="login-form__error">{error}</p>}

          <button type="submit" className="login-form__submit">
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        )}

        {tab !== 'track' && (
        <p className="login-card__switch">
          {tab === 'signin' ? (
            <>Don't have an account?{' '}
              <button className="login-card__switch-btn" type="button" onClick={() => switchTab('signup')}>
                Sign Up
              </button>
            </>
          ) : (
            <>Already have an account?{' '}
              <button className="login-card__switch-btn" type="button" onClick={() => switchTab('signin')}>
                Sign In
              </button>
            </>
          )}
        </p>
        )}
      </div>
    </div>
  );
}

export default Login;
