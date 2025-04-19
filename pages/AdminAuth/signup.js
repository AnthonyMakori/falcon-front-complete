import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            evaluatePasswordStrength(value);
        }

        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setPasswordsMatch(false);
            } else {
                setPasswordsMatch(true);
            }
        }
    };

    const evaluatePasswordStrength = (password) => {
        const lengthCriteria = password.length >= 8;
        const numberCriteria = /[0-9]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const specialCharCriteria = /[@$!%*?&]/.test(password);

        if (lengthCriteria && numberCriteria && uppercaseCriteria && lowercaseCriteria && specialCharCriteria) {
            setPasswordStrength('Strong');
        } else if (lengthCriteria && (numberCriteria || uppercaseCriteria || lowercaseCriteria)) {
            setPasswordStrength('Medium');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        if (!passwordRegex.test(formData.password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword
                }
            );
    
            if (response.status === 201) {
                setSuccess('Registration Successful!');
                setTimeout(() => {
                    router.push('/AdminAuth/signin');
                }, 2000);
            } else {
                setError(response.data.message || 'Registration failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-gray-900">Admin Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <span 
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {passwordStrength && (
                            <p className={`mt-2 text-sm ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                {passwordStrength} password
                            </p>
                        )}
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <span 
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {!passwordsMatch && (
                            <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">Already have an account?</p>
                        </div>
                        <div className="text-center mt-2">
                        <Link href="/AdminAuth/signin">
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 w-full">
                            Sign In
                            </button>
                        </Link>
                        </div>     
                </form>
            </div>
            {success && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    {success}
                </div>
            )}
        </div>
    );
};

export default Signup;
