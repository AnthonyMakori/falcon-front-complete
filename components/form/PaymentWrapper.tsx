import { useState } from "react";
import PaymentForm from "./PaymentForm"; 

const PaymentWrapper = ({ price, movie }: { price: number; movie: number }) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center gap-4">
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

      {status === "success" && (
        <div className="p-6 border rounded-lg shadow-md bg-white text-green-700 text-center max-w-md">
          <div className="text-5xl mb-4">✅</div>
          <p className="font-bold text-lg mb-2">Thank You for keeping it Falcon Philmz.</p>
          <p className="text-sm">
            Check Email for movie link. <br />
            If not received, Hit the WhatsApp button.
          </p>
        </div>
      )}

      {status === "error" && message && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded w-full text-center">
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentWrapper;
