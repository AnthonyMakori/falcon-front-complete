import React, { useState } from 'react';

const SettingsPage = () => {
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1234567890');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailValid(false);
      isValid = false;
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      setPhoneValid(false);
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordValid(false);
      isValid = false;
    }
    return isValid;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Changes Saved!');
    } catch {
      setError('Failed to save changes');
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Settings</h2>

        {/* Profile Settings Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Profile Information</h3>
          <div className="mt-4">
            <label className="block text-lg text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 p-2 border ${emailValid ? 'border-gray-300' : 'border-red-500'} rounded-md w-full`}
            />
            {!emailValid && <p className="text-red-500 text-sm mt-2">Please enter a valid email address.</p>}

            <label className="block text-lg text-gray-600 mt-4" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`mt-2 p-2 border ${phoneValid ? 'border-gray-300' : 'border-red-500'} rounded-md w-full`}
            />
            {!phoneValid && <p className="text-red-500 text-sm mt-2">Please enter a valid phone number.</p>}
          </div>
        </div>

        {/* Password Settings Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Change Password</h3>
          <div className="mt-4">
            <label className="block text-lg text-gray-600" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 p-2 border ${passwordValid ? 'border-gray-300' : 'border-red-500'} rounded-md w-full`}
            />
            {!passwordValid && <p className="text-red-500 text-sm mt-2">Password must be at least 6 characters long.</p>}
          </div>
        </div>

        {/* Payment Settings Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Payment Settings</h3>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Link MPesa Account
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Link Bank Account
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-700">Notification Preferences</h3>
          <div className="mt-4">
            <div className="flex items-center">
              <input type="checkbox" id="emailNotifications" className="mr-2" />
              <label htmlFor="emailNotifications" className="text-lg text-gray-600">
                Receive Email Notifications
              </label>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="smsNotifications" className="mr-2" />
              <label htmlFor="smsNotifications" className="text-lg text-gray-600">
                Receive SMS Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Error and Loading States */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Save Changes Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
