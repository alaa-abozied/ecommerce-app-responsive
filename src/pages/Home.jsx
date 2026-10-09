import React from 'react';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Products from './Products';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Main />
      <Products />
      <Footer />
    </>
  );
};

export default Home;