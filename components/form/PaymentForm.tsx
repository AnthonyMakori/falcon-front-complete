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
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { phone?: string; email?: string } = {};

    // Phone validation (Kenya)
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(?:254|\+254|0)(7|1)\d{8}$/.test(phone)) {
      newErrors.phone = "Enter a valid Kenyan phone number.";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (/^\d/.test(email)) {
      newErrors.email = "Email cannot start with a number.";
    } else if (
      !/^[a-zA-Z][\w.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validate()) return;

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
    <div className="p-4 border rounded-lg bg-white shadow-md text-black min-h-[300px] flex flex-col justify-center items-center w-full max-w-md">
      {!loading && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-cyan-500">Make Payment</h2>

          <input
            type="text"
            placeholder="Enter MPesa Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-2 border rounded mb-1 ${
              errors.phone ? "border-red-500" : "border-blue-600"
            }`}
          />
          {errors.phone && <p className="text-sm text-red-600 mb-2">{errors.phone}</p>}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded mb-1 ${
              errors.email ? "border-red-500" : "border-blue-600"
            }`}
          />
          {errors.email && <p className="text-sm text-red-600 mb-2">{errors.email}</p>}

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
