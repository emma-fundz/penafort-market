
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import About from '../components/home/About';
import Location from '../components/home/Location';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <FeaturedProducts />
        <About />
        <Location />
        <Newsletter />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
