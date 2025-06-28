// components/PayPalButton.js
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalButton = () => {
  const createOrder = async () => {
    try {
      const response = await axios.post("https://api.falconeyephilmz.com/api/create-payment", { amount: "100.00" });
      return response.data.approval_url;
    } catch (error) {
      console.error("Error creating PayPal payment", error);
      alert("Payment creation failed!");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "your-client-id" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

