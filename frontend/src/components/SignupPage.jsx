import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa'; // FontAwesome icon for the signup button

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(username, password, userAddress, mobileNumber);
            
            const response = await axios.post('http://localhost:3001/api/signup', {
                username,
                password,
                user_address: userAddress,
                mobile_number: mobileNumber
            });
            console.log('User signed up successfully!');
            navigate('/login'); // Redirect after successful signup
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Signup</h2>
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
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600 dark:text-gray-200">Address</label>
                        <input
                            type="text"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm text-gray-600 dark:text-gray-200">Mobile Number</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <FaUserPlus className="mr-2" />
                            Signup
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <a href="/login" className="hover:underline">Already have an account? Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
