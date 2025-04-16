import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Flame } from "lucide-react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster: string;
  purchases: number;
  watchCount: number;
  rating: number;
}

const Trending = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get("/api/movies/trending");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Sort movies based on recent views and purchases
  const trendingMovies = useMemo(() => {
    return [...movies].sort((a, b) => (b.purchases + b.watchCount) - (a.purchases + a.watchCount));
  }, [movies]);

  return (
    <div className="max-w-5xl mx-auto p-6"
    style={{marginTop: "4rem"}}>
      <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Flame className="text-red-500" />
        Trending Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingMovies.map((movie) => (
          <Card key={movie.id} className="relative shadow-lg">
            <img src={movie.poster} alt={movie.title} className="w-full h-60 object-cover rounded-t-lg" />
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary">Views: {movie.watchCount}</Badge>
                <Badge variant="outline">Purchases: {movie.purchases}</Badge>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-sm font-medium">⭐ {movie.rating.toFixed(1)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trending;
