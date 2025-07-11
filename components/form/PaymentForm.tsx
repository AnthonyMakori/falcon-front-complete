import { useState } from "react";

interface PaymentFormProps {
  price: number;
  movie: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ price, movie }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setStatus("loading");
    setMessage("");

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

      setStatus("success");
    } catch (error: unknown) {
      setStatus("error");
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md text-black min-h-[300px] flex flex-col justify-center items-center">
      {status === "idle" && (
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

          {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        </>
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <div className="border-4 border-green-600 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-green-700 font-medium">Processing Payment...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center text-green-700">
          <div className="text-5xl mb-4">✅</div>
          <p className="font-bold text-lg mb-2">Thank You for keeping it Falcon Philmz.</p>
          <p className="text-sm">
            Check Email for movie link. <br />
            If not received, click the whatsapp button.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center text-red-600">
          <p className="mb-2">Payment Failed</p>
          <p className="text-sm">{message}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
