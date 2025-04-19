import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to import these icons

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/login`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    window.location.href = '/dash/dashboard';
                }, 2000);
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch {
            setError('Something went wrong. Please try again later.');
        }

        setLoading(false);
    };

    const goBack = () => {
        window.location.href = '/';
    };

    const redirectToSignup = () => {
        window.location.href = '/AdminAuth/signup';
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 relative">
            <button
                onClick={goBack}
                className="absolute border border-blue-600 top-10 right-4 flex items-center bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900 font-medium py-2 px-4 rounded-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l-7-7 7-7m-7 7h20" />
                </svg>
                Home
            </button>

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                            aria-label="Toggle password visibility"
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 text-center text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mt-4 text-center text-green-600 font-semibold">
                        <p>Login successful! Welcome</p>
                    </div>
                )}

                <div className="mt-4 text-center">
                    <button
                        onClick={redirectToSignup}
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
