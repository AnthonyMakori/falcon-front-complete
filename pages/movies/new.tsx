import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
}

const NewReleases = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies/new-releases");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      }
    };
    
    fetchMovies();
  }, []);

  // Sort movies by release date (latest first)
  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }, [movies]);

  return (
    <div className="max-w-5xl mx-auto p-6"
    style={{marginTop: "4rem"}}>
      <h1 className="text-3xl font-bold text-center mb-6">New Releases</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedMovies.map((movie) => (
          <Card key={movie.id} className="relative shadow-lg">
            <img src={movie.poster} alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <Badge variant="secondary">{`Released: ${new Date(movie.releaseDate).toDateString()}`}</Badge>
              </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
