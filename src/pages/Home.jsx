import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

function Home() {
  const location = useLocation();
  const prevQuery = useRef('');

  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchQuery(q);
  }, [location.search]);

  function handleSearchChange(q) {
    setSearchQuery(q);
    if (q.trim() && q.trim() !== prevQuery.current.trim()) {
      prevQuery.current = q;
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    } else if (!q.trim()) {
      prevQuery.current = '';
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    if (q) {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main>
        <Banner />
        <ProductList searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
