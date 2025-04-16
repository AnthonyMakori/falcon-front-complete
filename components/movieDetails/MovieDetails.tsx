import React from 'react';
import Image from 'next/image'

type MovieDetailsProps = {
  title: string;
  genre: string;
  runtime: string;
  description: string;
  poster: string;
  price: number;
};

// Ensure the MovieDetails component expects MovieDetailsProps
const MovieDetails: React.FC<MovieDetailsProps> = ({ title, genre, runtime, description, poster, price }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Image src={poster} alt={title} className="w-full md:w-1/3 rounded" />
        <div className="md:ml-4 mt-4 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-gray-500">Genre: {genre}</p>
          <p className="text-sm text-gray-500">Runtime: {runtime}</p>
          <p className="mt-4">{description}</p>
          <p className="mt-4 text-lg font-semibold">Price: ${price}</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Pay to Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
