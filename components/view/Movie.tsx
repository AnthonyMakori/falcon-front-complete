import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { ClipLoader } from "react-spinners";
import PaymentForm from "../../components/form/PaymentForm";

interface Movie {
  id: number;
  title: string;
  category: string;
  price: number;
  date_released: string;
  poster: string;
  type: "movie" | "merchandise";
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { addToCart } = useCart();
  const [loadingMovieId, setLoadingMovieId] = useState<number | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);

        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToCart = async (movie: Movie) => {
    setLoadingMovieId(movie.id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    addToCart(movie);
    setLoadingMovieId(null);
  };

  return (
    <div className="px-4 md:px-12 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Movies</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-xl p-4 shadow-lg animate-pulse bg-white">
              <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="border rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 bg-white">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={
                  movie.poster.startsWith("http")
                    ? movie.poster
                    : `https://api.falconeyephilmz.com/${movie.poster}`
                }
                alt={movie.title}
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              {/* eslint-enable @next/next/no-img-element */}
              <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
              <p className="text-sm text-gray-500">{movie.category}</p>
              <p className="mt-2 text-lg font-bold text-green-700">KES {movie.price}</p>
              <p className="text-xs text-gray-400">Released on {movie.date_released}</p>

              <div className="flex gap-4 mt-4">
                <Button
                  onClick={() => handleAddToCart(movie)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                  disabled={loadingMovieId === movie.id}
                >
                  {loadingMovieId === movie.id ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setSelectedMovie(movie)}
                  className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <FaDollarSign /> Purchase
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          🎬 No movies available at the moment. Please check back later.
        </p>
      )}

      {/* Payment Modal */}
      {selectedMovie && !paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-blue-600 text-center">
              Purchase {selectedMovie.title}
            </h2>

            <PaymentForm
              movie={selectedMovie.id}
              price={selectedMovie.price}
              onSuccess={() => setPaymentSuccess(true)}
              onError={(msg) => setPaymentError(msg)}
            />

            <Button
              onClick={() => {
                setSelectedMovie(null);
                setPaymentError("");
              }}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded"
            >
              Cancel
            </Button>

            {paymentError && (
              <p className="mt-2 text-sm text-red-500 text-center">{paymentError}</p>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md text-center text-green-700 animate-fadeIn">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-bold text-lg mb-2">Thank You for keeping it Falcon Philmz.</p>
            <p className="text-sm mb-4">
              Check your email for the movie link. <br />
              If not received, hit the WhatsApp button.
            </p>
            <Button
              onClick={() => {
                setSelectedMovie(null);
                setPaymentSuccess(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
