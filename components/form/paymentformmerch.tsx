import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";

interface PaymentFormProps {
  movie: number;
  price: number;
  selectedColor: string;
  selectedSize: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const PaymentForm = ({
  movie,
  price,
  selectedColor,
  selectedSize,
  onSuccess,
  onError,
}: PaymentFormProps) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!phone || !email) {
      onError("Please enter both phone number and email.");
      return;
    }

    if (!selectedColor || !selectedSize) {
      onError("Please ensure color and size are selected.");
      return;
    }

    try {
      setLoading(true);

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/initiate/merchandise`;

      const res = await axios.post(endpoint, {
        phone,
        amount: price,
        email,
        merchandise_id: movie,
        color: selectedColor,
        size: selectedSize,
      });

      if (res.data.CheckoutRequestID) {
        onSuccess();
      } else {
        onError("Failed to initiate payment.");
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);

      if (axios.isAxiosError(err)) {
        onError(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-semibold">Phone Number:</label>
        <input
          type="text"
          className="mt-2 p-2 w-full border rounded-lg"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07XXXXXXXX"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email:</label>
        <input
          type="email"
          className="mt-2 p-2 w-full border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
        />
      </div>

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now with M-Pesa"}
      </Button>
    </div>
  );
};

export default PaymentForm;
