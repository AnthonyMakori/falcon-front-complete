import React, { useState } from 'react';

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const banks = ['National Bank', 'Equity Bank', 'KCB Bank'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData = {
      method: paymentMethod,
      amount,
      details: paymentMethod === 'mpesa' ? phoneNumber : bankDetails,
      bank: paymentMethod === 'bank' ? selectedBank : null,
    };
    console.log('Payment Data:', paymentData);
    // Add actual payment processing logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Payment Form</h2>
      <div className="mb-4">
        <label className="block mb-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="mpesa">MPesa</option>
          <option value="bank">Bank</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      {paymentMethod === 'mpesa' ? (
        <div className="mb-4">
          <label className="block mb-2">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-2">Bank Selection:</label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="">Select Bank</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bank Details:</label>
            <input
              type="text"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
          </div>
        </>
      )}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Confirm Payment
      </button>
    </form>
  );
};

export default PaymentForm;
