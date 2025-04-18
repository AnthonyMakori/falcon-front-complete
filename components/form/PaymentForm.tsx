import { useState } from "react";

interface PaymentFormProps {
  price: number; 
  movie: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ price, movie }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, email, amount: price, movie_id: movie }),
      });
  
      const data = await response.json();
      if (data.error) throw new Error(data.error);
  
      setMessage("Check your phone to complete payment.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md text-black">
      <h2 className="text-lg font-semibold mb-2 text-cyan-500">Make Payment</h2>
      <input
        type="text"
        placeholder="Enter MPesa Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded mb-2 border-blue-600"
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2 border-blue-600"
      />
      <button>
      { `Pay KES ${price}`}
      </button>
      <br />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-green-600 text-white py-2 px-4 rounded w-full"
      >
        {loading ? "Processing..." : `Confirm Payment`}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default PaymentForm;
