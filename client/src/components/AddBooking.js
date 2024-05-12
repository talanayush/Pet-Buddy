import React, { useState } from 'react';
import axios from 'axios';

const AddBooking = () => {
    const [bookingData, setBookingData] = useState({
        user_name: '',
        pet_name: '',
        datetime_of_booking: '',
        type: '',
        time_slot: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [addedBooking, setAddedBooking] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send a POST request to add the booking
            const response = await axios.post('http://localhost:3001/api/bookings/add', bookingData);
            setAddedBooking(response.data);
            setErrorMessage('');
        } catch (error) {
            setAddedBooking(null);
            setErrorMessage('Failed to add booking.');
            console.error('Error adding booking:', error);
        }
    };

    return (
        <div>
            <h2>Add Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="user_name">User Name:</label>
                    <input type="text" id="user_name" name="user_name" value={bookingData.user_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="pet_name">Pet Name:</label>
                    <input type="text" id="pet_name" name="pet_name" value={bookingData.pet_name} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="datetime_of_booking">Date and Time of Booking:</label>
                    <input type="datetime-local" id="datetime_of_booking" name="datetime_of_booking" value={bookingData.datetime_of_booking} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" name="type" value={bookingData.type} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="time_slot">Time Slot:</label>
                    <input type="text" id="time_slot" name="time_slot" value={bookingData.time_slot} onChange={handleInputChange} />
                </div>
                <button type="submit">Add Booking</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {addedBooking && (
                <div>
                    <h3>Added Booking:</h3>
                    <p>User Name: {addedBooking.user_name}</p>
                    <p>Pet Name: {addedBooking.pet_name}</p>
                    <p>Date and Time of Booking: {addedBooking.datetime_of_booking}</p>
                    <p>Type: {addedBooking.type}</p>
                    <p>Time Slot: {addedBooking.time_slot}</p>
                    <p>Payment ID: {addedBooking.payment_id}</p>
                </div>
            )}
        </div>
    );
};

export default AddBooking;
