import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/header/Header';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import StreamingPlayer from '../../components/streamingplayer/StreamingPlayer';

const HeroSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((current) => (current === 0 ? slides.length - 1 : current - 1));
  }, [slides.length]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 10000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <section className="relative h-screen">
      <Header />
      
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
        <Image 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title} 
          layout="fill" 
          objectFit="cover"
          priority
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <span className="text-red-500 font-medium text-sm mb-6 animate-fade-in">
          {slides[currentSlide].tag}
        </span>

        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 animate-slide-up drop-shadow-lg">
          {slides[currentSlide].title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-white mb-4">
          <span className="font-medium">{slides[currentSlide].year}</span>
          <span className="bg-gray-800/80 px-2 py-0.5 rounded text-sm">
            {slides[currentSlide].rating}
          </span>
          <span className="font-medium">{slides[currentSlide].seasons}</span>
          <span className="font-medium">{slides[currentSlide].genre}</span>
        </div>

        <p className="text-white max-w-2xl mb-8 line-clamp-3 md:line-clamp-none drop-shadow-lg">
          {slides[currentSlide].description}
        </p>

        <div className="space-y-2 mb-8 hidden md:block">
          <div className="text-white">
            <span className="text-gray-200">Featuring: </span>
            <span className="font-medium">{slides[currentSlide].starring}</span>
          </div>
          <div className="text-white">
            <span className="text-gray-200">Director: </span>
            <span className="font-medium">{slides[currentSlide].director}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => {
              setCurrentTrailer(`/trailers/${slides[currentSlide].trailer}`); 
              setShowTrailer(true);
            }}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 md:px-8 py-3 rounded-full 
                           flex items-center space-x-2 transition-all duration-300 group shadow-lg">
            <Play size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Watch Trailer</span>
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Streaming Player Overlay */}
      {showTrailer && currentTrailer && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <button 
            onClick={() => {
              setShowTrailer(false);
              setCurrentTrailer(null); 
            }} 
            className="absolute top-4 right-4 bg-white/30 text-white p-2 rounded-full">
            <X size={24} />
          </button>
          <StreamingPlayer videoUrl={currentTrailer} />
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
