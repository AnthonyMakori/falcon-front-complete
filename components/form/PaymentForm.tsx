import { useState } from "react";

interface PaymentFormProps {
  price: number;
  movie: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ price, movie, onSuccess, onError }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    onError("");

    const payload = {
      phone,
      email,
      amount: Math.floor(price),
      movie_id: movie,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stk/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      onSuccess(); // notify parent
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md text-black min-h-[300px] flex flex-col justify-center items-center">
      {!loading && (
        <>
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

          <button className="text-sm text-gray-600 mb-2" disabled>
            {`Pay KES ${Math.floor(price)}`}
          </button>

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            Confirm Payment
          </button>
        </>
      )}

      {loading && (
        <div className="flex flex-col items-center gap-4">
          <div className="border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-green-700 font-medium">Processing Payment...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
