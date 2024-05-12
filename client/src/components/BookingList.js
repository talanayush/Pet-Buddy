import React, { useState } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [username, setUsername] = useState('');
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send a POST request to fetch bookings associated with the username
            const response = await axios.post('http://localhost:3001/api/bookings', { username });
            setBookings(response.data);
            setErrorMessage('');
        } catch (error) {
            setBookings([]);
            setErrorMessage('No bookings found for the provided username.');
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div>
            <h2>Booking List</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Enter Username:</label>
                <input type="text" id="username" value={username} onChange={handleInputChange} />
                <button type="submit">Get Bookings</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {bookings.length > 0 && (
                <div>
                    <h3>Bookings for {username}:</h3>
                    <ul>
                        {bookings.map((booking, index) => (
                            <li key={index}>
                                <p>Pet Name: {booking.pet_name}</p>
                                <p>Booking Date: {booking.datetime_of_booking}</p>
                                <p>Type: {booking.type}</p>
                                <p>Time Slot: {booking.time_slot}</p>
                                <p>Payment ID: {booking.payment_id}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BookingList;
