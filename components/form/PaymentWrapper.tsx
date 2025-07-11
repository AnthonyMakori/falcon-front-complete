import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";

const PaymentWrapper = ({ price, movie }: { price: number; movie: number }) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showTick, setShowTick] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setShowTick(true);
      setShowThankYou(true);

      const tickTimer = setTimeout(() => setShowTick(false), 3000);
      const messageTimer = setTimeout(() => {
        setShowThankYou(false);
        setStatus("idle");
      }, 4000);

      return () => {
        clearTimeout(tickTimer);
        clearTimeout(messageTimer);
      };
    }
  }, [status]);

  return (
    <div className="relative flex flex-col items-center gap-4 min-h-screen">
      {status !== "success" && (
        <PaymentForm
          price={price}
          movie={movie}
          onSuccess={() => setStatus("success")}
          onError={(msg) => {
            setStatus("error");
            setMessage(msg);
          }}
        />
      )}

      {/* ✅ Tick Animation */}
      {showTick && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80">
          <svg
            className="w-24 h-24 text-green-500"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M14 27l7 7 17-17"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tick-path"
            />
          </svg>
        </div>
      )}

      {/* ✅ Bottom Left Message */}
      {showThankYou && (
        <div className="fixed bottom-4 left-4 bg-green-600 text-white px-4 py-3 rounded shadow-md z-50 animate-fadeinout">
          <p className="font-bold">Thank You for keeping it Falcon Eye Philmz.</p>
          <p className="text-sm">Check Email for movie link. If not, hit the WhatsApp button.</p>
        </div>
      )}

      {/* ❌ Error message */}
      {status === "error" && message && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded w-full text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentWrapper;
