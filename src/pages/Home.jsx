import React, { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <Banner />
        <ProductList searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
