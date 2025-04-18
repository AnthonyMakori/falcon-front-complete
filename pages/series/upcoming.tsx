import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface UpcomingMovie {
  id: number;
  title: string;
  release_date: string;
  description: string;
  poster: string;
}

const Upcoming: React.FC = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-series`);
        if (!response.ok) {
          throw new Error('Failed to fetch upcoming series.');
        }
        const data: UpcomingMovie[] = await response.json();
        setUpcomingMovies(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUpcomingMovies();
  }, []);
  

  return (
    <div className="upcoming-section py-16 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 relative">
      <button 
        onClick={() => window.history.back()} 
        className="absolute top-6 right-6 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Back
      </button>
      <h2 className="text-center text-4xl font-bold text-white mb-12">Upcoming Series</h2>
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {!loading && !error && upcomingMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{movie.title}</h3>
              <p className="text-gray-500 text-sm mb-3">
                Release Date: <span className="font-semibold">{new Date(movie.release_date).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-600 text-base mb-4">{movie.description}</p>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Watch Trailer Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
