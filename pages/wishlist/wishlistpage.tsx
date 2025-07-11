import React, { useState, useEffect } from 'react';
import { useCart } from "../../context/CartContext"; 
import PaymentForm from "../../components/form/PaymentForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  category?: string;
  price: number;
  date_released?: string;
  poster: string;
  type: string; 
}

const WishlistPage = () => {
  const { cartItems, removeFromCart } = useCart(); 
  const [showPaymentForm, setShowPaymentForm] = useState<number | null>(null); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleRemove = (id: number) => {
    removeFromCart(id); 
  };

  const handlePurchase = (id: number) => {
    const selected = cartItems.find((item) => item.id === id);
    if (selected) {
      setSelectedMovie(selected);
      setShowPaymentForm(id);
    }
  };

  const handleClosePaymentForm = () => {
    setShowPaymentForm(null);
    setSelectedMovie(null);
  };

  const moviesAndSeries: Movie[] = cartItems
    .filter((item) => item.type === "movie")
    .map((item) => ({
      ...item,
      date_released: item.date_released || "N/A",
    }));

  const merchandise = cartItems.filter((item) => item.type === "merchandise");

  const handleCheckoutAll = (items: Movie[]) => {
    if (items.length > 0) {
      setSelectedMovie(items[0]);
      setShowPaymentForm(items[0].id); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 flex-grow">Your Wishlist</h1>
          <button 
            onClick={() => router.back()} 
            className="absolute top-8 right-4 flex items-center px-3 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <ArrowLeft className="mr-2" /> Back
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-lg text-gray-600">Your cart is empty.</div>
        ) : (
          <>
            {/* Movies & Series Section */}
            {moviesAndSeries.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4">Movies & Series Cart</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {moviesAndSeries.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col h-[400px]">
                      <Image
                        src={item.poster.startsWith("http") 
                          ? item.poster 
                          : `${process.env.NEXT_PUBLIC_API_URL}/assets/${item.poster}`}  
                        alt={item.title}
                        width={500}
                        height={300}
                        className="w-full h-68 object-cover"
                      />

                      <div className="flex flex-col justify-between p-4 flex-grow">
                        <h2 className="text-lg text-blue-600 font-semibold">{item.title}</h2>
                        <p className="text-lg text-green-500 font-semibold">KES {Number(item.price)}</p>
                        <div className="flex justify-between items-center mt-2">
                          <button onClick={() => handlePurchase(item.id)} className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition duration-200">
                            Purchase
                          </button>
                          <button onClick={() => handleRemove(item.id)} className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition duration-200">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => handleCheckoutAll(moviesAndSeries)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Checkout All Movies & Series
                </button>
              </div>
            )}

            {/* Merchandise Section */}
            {merchandise.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Merchandise Cart</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {merchandise.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                      <Image src={item.poster} alt={item.title} width={500} height={300} className="w-full h-48 object-cover" />
                      <h2 className="text-lg text-blue-600 font-semibold mt-2">{item.title}</h2>
                      <p className="text-lg text-green-500 font-semibold">Ksh {item.price}</p>
                      <div className="flex justify-between mt-2">
                        <button onClick={() => handlePurchase(item.id)} className="bg-green-600 text-white px-3 py-1 rounded-md">Purchase</button>
                        <button onClick={() => handleRemove(item.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => handleCheckoutAll(merchandise)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Checkout All Merchandise
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentForm !== null && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-3 text-blue-600">
              Purchase {selectedMovie.title}
            </h2>
            <PaymentForm
              price={Number(selectedMovie.price)}
              movie={selectedMovie.id}
              onSuccess={() => {
                setPaymentSuccess(true);
                setShowPaymentForm(null);
              }}
              onError={(message) => {
                setPaymentError(message);
              }}
            />
            <button
              onClick={handleClosePaymentForm}
              className="mt-3 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Card */}
      {paymentSuccess && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-green-500 shadow-lg p-6 rounded-md z-50 max-w-md text-center">
          <div className="text-5xl mb-4 text-green-600">✅</div>
          <p className="font-bold text-lg mb-2">Thank you for keeping it Falcon Philmz.</p>
          <p className="text-sm">
            Check your email for the movie link.<br />
            If not received, hit the WhatsApp button.
          </p>
          <button
            onClick={() => setPaymentSuccess(false)}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      )}

      {/* Error Card */}
      {paymentError && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 p-4 rounded-md z-50 max-w-md text-center">
          <p>{paymentError}</p>
          <button
            onClick={() => setPaymentError("")}
            className="mt-2 text-sm text-red-500 underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
