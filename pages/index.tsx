import React from 'react';
import HeroSlider from '../components/header/Heroslider';
import MovieView from '../components/view/Movie';
import GenreGrid from '../components/movieDetails/Genre';
import AboutUs from '../components/About/aboutUs';
import Footer from '../components/footer/footer';
import { slides } from '../components/data/slider';
import Head from 'next/head';

    <Head>
    <title>Falcon-Eye Movie Streaming</title>
    </Head>

const HomePage = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <main>
        <HeroSlider slides={slides} />
        <MovieView />
        <GenreGrid />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;