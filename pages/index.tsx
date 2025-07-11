import React from 'react';
import HeroSlider from '../components/header/Heroslider';
import MovieView from '../components/view/Movie';
import GenreGrid from '../components/movieDetails/Genre';
import AboutUs from '../components/About/aboutUs';
import Footer from '../components/footer/footer';
import { slides } from '../components/data/slider';
import Head from 'next/head';
import { FaWhatsapp } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 relative">
      <Head>
        <title>Falcon-Eye Movie Streaming</title>
      </Head>

      <main>
        <HeroSlider slides={slides} />
        <MovieView />
        <GenreGrid />
        <AboutUs />
      </main>

      <Footer />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/254729923951" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default HomePage;
