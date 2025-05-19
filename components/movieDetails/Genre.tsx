'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

interface Movie {
  id: number;
  title: string;
  category: string;
  poster: string;
}

interface Genre {
  title: string;
  description: string;
  category: string;
  posters: string[];
}

const genresData: Genre[] = [
  { title: "Fantasy", description: "Game of Thrones, Stranger Things, more...", category: "Fantasy", posters: [] },
  { title: "Comedy", description: "We're The Millers, Dumb & Dumber, more...", category: "Comedy", posters: [] },
  { title: "Action", description: "John Wick, Mission Impossible, more...", category: "Action", posters: [] },
  { title: "Thriller", description: "Se7en, The Guilty, Hush, more...", category: "Thriller", posters: [] },
  { title: "Drama", description: "Titanic, A Walk To Remember, more...", category: "Drama", posters: [] },
  { title: "Sci-fi", description: "Avatar, Star Wars, Riddick, more...", category: "Sci-fi", posters: [] },
];

const GenreCard: React.FC<{ genre: Genre }> = ({ genre }) => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  useEffect(() => {
    if (genre.posters.length > 1) {
      const interval = setInterval(() => {
        setCurrentPosterIndex((prevIndex) => (prevIndex + 1) % genre.posters.length);
      }, 60000); 

      return () => clearInterval(interval);
    }
  }, [genre.posters]);

  return (
    <div className="relative group overflow-hidden rounded-lg cursor-pointer">
      <div className="aspect-w-16 aspect-h-9 w-full">
        {genre.posters.length > 0 ? (
          <Image 
            src={genre.posters[currentPosterIndex]} 
            alt={genre.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{genre.title}</h2>
            <p className="text-sm text-gray-300">{genre.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenreGrid = () => {
  const [genres, setGenres] = useState<Genre[]>(genresData);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
        const movies: Movie[] = await response.json();
  
        const updatedGenres = genresData.map((genre) => {
          const filteredPosters = movies
            .filter((movie) => movie.category.toLowerCase() === genre.category.toLowerCase())
            .map((movie) => `${process.env.NEXT_PUBLIC_API_URL}${movie.poster}`);
  
          return { ...genre, posters: filteredPosters.length > 0 ? filteredPosters : genre.posters };
        });
  
        setGenres(updatedGenres);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    fetchMovies();
  }, []);
  

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Discover Your Next Favorite
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our collection of handpicked genres and immersive stories
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <GenreCard key={genre.title} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default GenreGrid;
