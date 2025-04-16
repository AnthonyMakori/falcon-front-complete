import React from "react";
import { Movie } from "../../types/movie";

interface MovieGridProps {
  movies?: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies = [] }) => {
  if (!movies?.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No movies available at the moment
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="border p-2 shadow rounded">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-64 object-cover rounded"
          />
          <div className="mt-2">
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-green-500">KSh {movie.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;