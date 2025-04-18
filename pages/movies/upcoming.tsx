import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import Header from "../../components/header/Header";
import Image from 'next/image'

interface Movie {
  id: number;
  title: string;
  poster: string;
  date_released: string;
  category: string;
}

const ComingSoon = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/coming-soon`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
  
    fetchMovies();
  }, []);
  

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto p-6" style={{ marginTop: "4rem" }}>
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Coming Soon</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} className="relative shadow-lg bg-white text-black">
              <Image
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-blue-600">{movie.title}</h2>
                <div className="mb-2">
                  <Badge variant="secondary">
                    {movie.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-800">
                  Releasing on {dayjs(movie.date_released).format("MMMM D, YYYY")}
                </p>
                <Button variant="outline" className="mt-2 w-full text-white border-gray-700 bg-green-600">
                  Notify Me
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
