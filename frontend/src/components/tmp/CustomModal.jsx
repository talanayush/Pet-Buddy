import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function CustomModal({ modalOpen, funcHandle, booking, handleBooking }) {
    const [selectedPetId, setSelectedPetId] = useState(""); // Default selected pet ID
    const [startDate, setStartDate] = useState(""); // Default start date
    const [endDate, setEndDate] = useState(""); // Default end date
    const timeRef = useRef(""); // For pickup time input
    const [userPets, setUserPets] = useState([]); // State to hold user's pets
    const [username, setUsername] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch user details
                const userDetailsResponse = await axios.post(
                    'http://localhost:3001/api/user',
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                // Update username state
                setUsername(userDetailsResponse.data.username);

                // Fetch user's pets
                const userPetsResponse = await axios.post(
                    "http://localhost:3001/api/pets",
                    { user_name: userDetailsResponse.data.username }
                );

                // Set user's pets state
                setUserPets(userPetsResponse.data);
            } catch (error) {
                console.error('Error fetching user details and pets:', error.message);
            }
        };

        fetchData();
    }, []);


    // Handle modal closure
    function closeModal() {
        funcHandle(); // External function to handle modal close
    }

    // Handle booking submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Find the selected pet
        const selectedPet = userPets.find((pet) => pet.pet_id === selectedPetId);

        // Construct the new booking object
        const newBooking = {
            username: username, // Use the obtained username
            pet_name: selectedPet.pet_name, // Update key to match API endpoint
            datetime_of_booking: new Date(), // Assuming booking datetime is the current datetime
            type: "Pet House", // Replace with actual booking type if needed
            start_time: startDate, // Use selected start date
            end_time: endDate, // Use selected end date
        };

        // Send POST request to add new booking
        axios.post('http://localhost:3001/api/bookings/add', newBooking)
            .then((response) => {
                // Handle successful booking addition
                console.log('Booking added successfully:', response.data);
                closeModal();
            })
            .catch((error) => {
                // Handle error
                console.error('Error adding booking:', error);
                // Optionally, display an error message to the user
            });
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${modalOpen ? "" : "hidden"}`}>
            {/* Modal overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>

            {/* Modal content */}
            <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    {/* Modal header */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pet Booking</h3>
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Form for booking */}
                <form onSubmit={handleSubmit} className="p-4">
                    {/* Select Pet */}
                    <div className="mb-4">
                        <label htmlFor="pet-select" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Select Pet
                        </label>
                        <select
                            id="pet-select"
                            value={selectedPetId}
                            onChange={(e) => setSelectedPetId(e.target.value)}
                            className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                        >
                            <option value="">Select a pet</option>
                            {userPets.map((pet) => (
                                <option key={pet.pet_id} value={pet.pet_id}>
                                    {pet.pet_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* DatePicker for start date */}
                    <div className="mb-4">
                        <label htmlFor="start-date" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            id="start-date"
                            required
                            className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                        />
                    </div>

                    {/* DatePicker for end date */}
                    <div className="mb-4">
                        <label htmlFor="end-date" className="block text-sm font-medium text-gray-900 dark:text-white">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            id="end-date"
                            required
                            className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                        />
                    </div>

                    {/* Pickup time selection */}
                    <div className="mb-4">
                        <label htmlFor="pickup-time" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Pickup Time
                        </label>
                        <select
                            id="pickup-time"
                            ref={timeRef}
                            className="w-full p-2.5 border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                        >
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 focus:outline-none focus:ring-primary-600"
                    >
                        Book Pet
                    </button>
                </form>
            </div>
        </div>
    );
}
