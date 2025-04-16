import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/button";
import Navbar from "../../components/header/Header";
import { useCart } from "../../context/CartContext"; 
import Head from "next/head";
import PaymentForm from "../../components/form/PaymentForm";
import Image from 'next/image'

interface MerchandiseItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

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
        const response = await axios.get("http://127.0.0.1:8000/api/merchandise");
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
      poster: item.image_url,
      type: "merchandise",
    });
    alert(`${item.name} added to cart!`);
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Head>
        <title>Merchandise</title>
        <meta name="description" content="Stay updated with upcoming events." />
        <meta name="keywords" content="events, upcoming events, community events" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="bg-gray-900 text-white">
        <Navbar />
        <main className="p-6 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Available Merchandise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchandise.map((item) => (
              <div key={item.id} className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden group h-[28rem]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-blue-600">{item.name}</h3>
                      <p className="text-2xl font-bold text-green-600">Ksh {item.price}</p>
                    </div>
                    <p className="text-white text-sm mt-1">{item.description}</p>
                    <div className="flex justify-between gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="mt-3 w-1/2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg transition"
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
                        className="mt-3 w-1/2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
                      >
                        Purchase
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedMerch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-blue-600">
              Purchase {selectedMerch.name}
            </h2>

            {/* Color Selection */}
            {!showPaymentForm && (
              <>
                <div className="relative mt-2 text-black">
                  <div 
                    className="border rounded-lg p-2 cursor-pointer bg-white" 
                    onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                  >
                    {selectedColor || "Choose a color"}
                  </div>

                  {colorDropdownOpen && (
                    <div className="absolute left-0 w-full bg-white border rounded-lg mt-1 shadow-md max-h-40 overflow-y-auto">
                      {[
                        "Red", "Blue", "Black", "White", "Green", "Yellow", "Orange", "Purple", "Pink", 
                        "Gray", "Brown", "Teal", "Maroon", "Navy", "Cyan", "Magenta", "Gold", "Silver", 
                        "Beige", "Lavender", "Olive", "Turquoise", "Burgundy", "Coral", "Mint", "Peach", 
                        "Sky Blue", "Violet", "Indigo", "Charcoal",
                      ].map((color) => (
                        <div
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setColorDropdownOpen(false); 
                          }}
                          className="p-2 cursor-pointer text-black text-center hover:text-white transition"
                          style={{ backgroundColor: color.toLowerCase() }}
                        >
                          {color}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Size Selection */}
                <div className="mb-4 text-black">
                  <label className="block text-gray-700 font-semibold">Select Size:</label>
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

                {/* Continue to Payment Button */}
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
                <PaymentForm movie={selectedMerch.id} price={selectedMerch.price} />
                <Button
                  onClick={() => setSelectedMerch(null)}
                  className="mt-4 bg-red-500 text-white w-full py-2 rounded"
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
