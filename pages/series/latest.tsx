import React from 'react';

interface LatestEpisode {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  thumbnailUrl: string;
  seriesTitle: string;
}

const latestEpisodes: LatestEpisode[] = [
  {
    id: 1,
    title: 'The Time Rift: Episode 1',
    releaseDate: '2025-01-15',
    description: 'The beginning of an epic adventure through the rift in time.',
    thumbnailUrl: '/images/time-rift-ep1.jpg',
    seriesTitle: 'The Time Rift',
  },
  {
    id: 2,
    title: 'Shadows Unveiled: Episode 3',
    releaseDate: '2025-01-10',
    description: 'Secrets are unveiled as characters navigate the web of mystery.',
    thumbnailUrl: '/images/shadows-unveiled-ep3.jpg',
    seriesTitle: 'Shadows Unveiled',
  },
  {
    id: 3,
    title: 'Cosmic Odyssey: Episode 5',
    releaseDate: '2025-01-05',
    description: 'The crew journeys to unexplored corners of the universe.',
    thumbnailUrl: '/images/cosmic-odyssey-ep5.jpg',
    seriesTitle: 'Cosmic Odyssey',
  },
];

const Latest: React.FC = () => {
  return (
    <div className="latest-episodes-section py-16 px-6 bg-gradient-to-r from-green-400 to-teal-500">
      <h2 className="text-center text-4xl font-bold text-white mb-12">Latest Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {latestEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="episode-card bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={episode.thumbnailUrl}
              alt={episode.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{episode.title}</h3>
              <p className="text-gray-500 text-sm mb-3">
                Released: <span className="font-semibold">{new Date(episode.releaseDate).toLocaleDateString()}</span>
              </p>
              <p className="text-gray-600 text-base mb-4">{episode.description}</p>
              <p className="text-gray-700 font-semibold mb-3">{episode.seriesTitle}</p>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
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

export default Latest;
