import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignupPage from './components/SignupPage';
import LocationPage from './components/LocationPage';
import TestAPI from './components/TestApi';
import ThankYouPage from './components/ThankYou';
import AddPetInfo from './components/AddPet';
import BookingList from './components/BookingList';
import AddBooking from './components/AddBooking';

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/data');
            const jsonData = await response.json();
            setData(jsonData.message); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/testapi" element={<TestAPI />} />
                <Route path="/thankyou" element={<ThankYouPage />} />
                <Route path="/addpet" element={<AddPetInfo />} />
                <Route path="/bookings" element={<BookingList />} />
                <Route path="/add_bookings" element={<AddBooking />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
