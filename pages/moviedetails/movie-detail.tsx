import React from 'react';
import MovieGrid from '../../components/movieGrid/MovieGrid';

const movies = [
  { id: 1, title: 'Movie 1', poster: 'url_to_poster_1', price: 10, posterUrl: 'url_to_poster_1' },
  { id: 2, title: 'Movie 2', poster: 'url_to_poster_2', price: 12, posterUrl: 'url_to_poster_2' },
  { id: 3, title: 'Movie 3', poster: 'url_to_poster_3', price: 15, posterUrl: 'url_to_poster_3' },
  // Add more movies here
];

const App: React.FC = () => {
  return <MovieGrid movies={movies} />;
};

export default App;
