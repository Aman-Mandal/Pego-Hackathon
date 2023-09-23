import About from '@/components/Landing Page/About';
import Footer from '@/components/Landing Page/Footer';
import Header from '@/components/Landing Page/Header';
import Tagline from '@/components/Landing Page/Tagline';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Header />
      <About />
      <Tagline />
      <Footer />
    </div>
  );
};

export default HomePage;
