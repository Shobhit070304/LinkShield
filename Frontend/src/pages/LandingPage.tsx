import React from 'react';
import Header from '../components/Layout/Header';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Layout/Footer';
import Banner from '../components/Banner';
import { Toaster } from 'react-hot-toast';

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Toaster position="top-center" />
      <div className="fixed inset-0 bg-gradient-radial from-accent/5 via-black to-black -z-10"></div>
      <Header />
      <main>
        <Hero />
        <Banner />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;