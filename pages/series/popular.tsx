import React from 'react';

interface PopularSeries {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  posterUrl: string;
  rating: number;
}

const popularSeries: PopularSeries[] = [
  {
    id: 1,
    title: 'The Time Rift',
    releaseDate: '2025-01-15',
    description: 'A thrilling journey through time with unexpected twists.',
    posterUrl: '/images/the-time-rift.jpg',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Shadows Unveiled',
    releaseDate: '2025-01-10',
    description: 'A suspenseful drama uncovering deep family secrets.',
    posterUrl: '/images/shadows-unveiled.jpg',
    rating: 4.6,
  },
  {
    id: 3,
    title: 'Cosmic Odyssey',
    releaseDate: '2025-01-05',
    description: 'A deep space exploration with a team of fearless astronauts.',
    posterUrl: '/images/cosmic-odyssey.jpg',
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Mystery of the Abyss',
    releaseDate: '2024-12-25',
    description: 'A suspense-filled story set deep under the ocean.',
    posterUrl: '/images/mystery-of-the-abyss.jpg',
    rating: 4.7,
  },
];

const Popular: React.FC = () => {
  return (
    <div className="popular-series-section py-16 px-6 bg-gradient-to-r from-pink-500 to-yellow-500">
      <h2 className="text-center text-4xl font-extrabold text-white mb-12">
        Popular Series
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
        {popularSeries.map((series) => (
          <div
            key={series.id}
            className="series-card bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={series.posterUrl}
              alt={series.title}
              className="w-full h-96 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {series.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Released:{' '}
                <span className="font-semibold text-gray-700">
                  {new Date(series.releaseDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-600 text-base mb-4">
                {series.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <p className="text-yellow-500 font-semibold">
                  Rating: {series.rating} / 5
                </p>
                <p className="text-xs text-gray-400 italic">Watch Now</p>
              </div>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Watch Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
