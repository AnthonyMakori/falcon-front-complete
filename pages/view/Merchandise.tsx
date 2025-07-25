import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import Navbar from "../../components/header/Header";
import { useCart } from "../../context/CartContext";
import Head from "next/head";
import PaymentForm from "../../components/form/PaymentForm";

interface MerchandiseItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const colorOptions = [
  "Red", "Blue", "Black", "White", "Green", "Yellow", "Orange", "Purple", "Pink",
  "Gray", "Brown", "Teal", "Maroon", "Navy", "Cyan", "Magenta", "Gold", "Silver",
  "Beige", "Lavender", "Olive", "Turquoise", "Burgundy", "Coral", "Mint", "Peach",
  "Sky Blue", "Violet", "Indigo", "Charcoal"
];

const Merchandise = () => {
  const [merchandise, setMerchandise] = useState<MerchandiseItem[]>([]);
  const { addToCart } = useCart();
  const [selectedMerch, setSelectedMerch] = useState<MerchandiseItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/merchandise`);
        setMerchandise(response.data);
      } catch (error) {
        console.error("Error fetching merchandise:", error);
      }
    };
    fetchMerchandise();
  }, []);

  const handleAddToCart = (item: MerchandiseItem) => {
    addToCart({
      id: item.id,
      title: item.name,
      price: item.price,
      poster: item.image,
      type: "merchandise",
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="mt-16">
      <Head>
        <title>Merchandise</title>
        <meta name="description" content="Explore and purchase awesome merchandise." />
      </Head>

      <div className="bg-gray-900 text-white min-h-screen">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Available Merchandise</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {merchandise.map((item) => (
              <div
                key={item.id}
                className="relative bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg group h-[28rem]"
              >
                {/* Full image background */}
                <img
                  src={`https://api.falconeyephilmz.com/${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Gradient overlay with content */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-gray-200 mb-2">{item.description}</p>
                  <p className="text-xl font-bold text-green-400 mb-3">Ksh {item.price}</p>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedMerch(item);
                        setShowPaymentForm(false);
                        setSelectedColor("");
                        setSelectedSize("");
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {selectedMerch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Purchase {selectedMerch.name}
            </h2>

            {!showPaymentForm && (
              <>
                {/* Color Selection */}
                <div className="mb-4 bg-gray-600 text-blue-600 p-4 rounded-lg">
                  <label className="font-semibold">Select Color:</label>
                  <div
                    className="mt-2 border rounded-lg p-2 cursor-pointer bg-white"
                    onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                  >
                    {selectedColor || "Choose a color"}
                  </div>

                  {colorDropdownOpen && (
                    <div className="grid grid-cols-4 gap-2 mt-2 max-h-40 overflow-y-auto text-blue-600">
                      {colorOptions.map((color) => (
                        <div
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setColorDropdownOpen(false);
                          }}
                          className="cursor-pointer p-2 text-center text-sm rounded-lg text-white"
                          style={{ backgroundColor: color.toLowerCase() }}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                  <label className="block font-semibold">Select Size:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="mt-2 p-2 w-full border rounded-lg"
                  >
                    <option value="">Choose a size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                  </select>
                </div>

                {selectedColor && selectedSize && (
                  <Button
                    onClick={() => setShowPaymentForm(true)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg"
                  >
                    Continue to Payment
                  </Button>
                )}
              </>
            )}

            {/* Payment Form */}
            {showPaymentForm && (
              <>
                <PaymentForm
                  movie={selectedMerch.id}
                  price={selectedMerch.price}
                  onSuccess={() => {
                    setShowPaymentForm(false);
                    setSelectedMerch(null);
                    alert("Payment successful! Check your email.");
                  }}
                  onError={(message) => {
                    alert(`Payment failed: ${message}`);
                  }}
                />
                <Button
                  onClick={() => setSelectedMerch(null)}
                  className="mt-4 bg-red-500 text-white w-full"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Merchandise;
