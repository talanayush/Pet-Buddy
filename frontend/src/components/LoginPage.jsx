import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; // FontAwesome icon for the login button

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token in localStorage
            console.log('Logged in successfully!');
            navigate('/home'); // Redirect after successful login
        } catch (error) {
            // Handle authentication errors
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Login failed. Please try again later.');
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <label className="block text-sm text-gray-600 dark:text-gray-200">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600 dark:text-gray-200">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                    )}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <FaSignInAlt className="mr-2" />
                            Login
                        </button>
                    </div>
                    <a href="/#" className="hover:underline">Forgot Password?</a>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <a href="/signup" className="hover:underline">Don't have an account? Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
