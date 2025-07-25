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
  trailer_url?: string;
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
  const [paymentStep, setPaymentStep] = useState<1 | 2>(1);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  // Filtering & Pagination
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const categories = ["All", ...new Set(movies.map((m) => m.category))];

  const filteredMovies = movies.filter((movie) =>
    selectedCategory === "All" ? true : movie.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 md:px-12 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Movies</h1>

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm rounded-full ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Movie Grid */}
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
      ) : paginatedMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedMovies.map((movie) => (
              <div
  key={movie.id}
  className="flex flex-col border rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white overflow-hidden h-[500px]"
>
  {/* Poster section with overlay */}
  <div className="relative h-1/2 w-full">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={
        movie.poster.startsWith("http")
          ? movie.poster
          : `https://api.falconeyephilmz.com/${movie.poster}`
      }
      alt={movie.title}
      className="w-full h-full object-cover"
    />

    {/* Gradient overlay */}
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 py-3">
      <h2 className="text-lg font-semibold text-white drop-shadow">{movie.title}</h2>
      <p className="text-sm text-gray-200">{movie.category}</p>
    </div>
  </div>

  {/* Details and buttons */}
  <div className="flex flex-col justify-between h-1/2 p-4">
    <div>
      <p className="text-lg font-bold text-green-700">KES {movie.price}</p>
      <p className="text-xs text-gray-400">Released on {movie.date_released}</p>
    </div>

    <div className="flex flex-col gap-2 mt-4">
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

      {movie.trailer_url && (
        <Button
          onClick={() => setTrailerUrl(movie.trailer_url!)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-2 rounded-lg text-sm"
        >
          🎥 Watch Trailer
        </Button>
      )}
    </div>
  </div>
</div>

            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-black"
            >
              Prev
            </Button>
            <span className="px-4 py-2 text-sm">{currentPage} / {totalPages}</span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-black"
            >
              Next
            </Button>
          </div>
        </>
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

            {/* Stepper Progress */}
            <div className="w-full flex justify-between items-center mb-4">
              <div className={`w-1/2 h-2 rounded-full ${paymentStep >= 1 ? "bg-blue-600" : "bg-gray-200"}`} />
              <div className={`w-1/2 h-2 rounded-full ${paymentStep >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
            </div>

            <PaymentForm
              movie={selectedMovie.id}
              price={selectedMovie.price}
              onSuccess={() => {
                setPaymentStep(2);
                setTimeout(() => {
                  setPaymentSuccess(true);
                  setPaymentStep(1);
                }, 1000);
              }}
              onError={(msg) => setPaymentError(msg)}
            />

            <Button
              onClick={() => {
                setSelectedMovie(null);
                setPaymentError("");
                setPaymentStep(1);
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

      {/* Payment Success Modal */}
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

      {/* Trailer Modal */}
      {trailerUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={trailerUrl}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                className="w-full h-96"
              ></iframe>
            </div>
            <Button onClick={() => setTrailerUrl(null)} className="w-full bg-red-500 text-white">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
