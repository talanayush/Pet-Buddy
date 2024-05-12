import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar2 from "./Sidebar2";
import User from "../assets/user.jpg";
import Button from "./ButtonG";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState({
        user_name: "",
        user_address: "",
        mobile_number: "",
    });
    const [pets, setPets] = useState([]);
    const [bookings, setBookings] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch user's pets
        const fetchUserPets = async () => {
            try {
                // Send POST request to fetch user's pets
                const response = await axios.post("http://localhost:3001/api/pets", { user_name: user.user_name });
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching user's pets:", error.message);
            }
        };

        // Call the function to fetch user's pets
        fetchUserPets();
    }, [user.user_name]);

    useEffect(() => {
        // Function to fetch user's bookings
        const fetchUserBookings = async () => {
            try {
                // Send POST request to fetch user's bookings
                const response = await axios.post("http://localhost:3001/api/bookings", { username: user.user_name });
                console.log('Pet Bookings :', response.data);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching user's bookings:", error.message);
            }
        };

        // Call the function to fetch user's bookings
        fetchUserBookings();
    }, [user.user_name]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3001/api/user',
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const userDataResponse = await axios.post(
                    'http://localhost:3001/api/userData',
                    { user_name: response.data.username }
                );
                setUser(userDataResponse.data);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };

        if (token) {
            fetchUserDetails();
            console.log('Hello!!!');
        } else {
            console.log('Token Not Set');
        }
    }, []);

    return (
        <>
            <Sidebar2 />
            <div className="flex justify-normal">
                <div className="flex justify-normal bg-blue-gray-100 m-10 rounded-3xl w-1/3">
                    <div className="w-40 h-40 m-10">
                        <img src={User} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center ml-4">
                        <h3 className="text-xl font-semibold text-gray-900">{user.user_name}</h3>
                        <p className="text-sm text-gray-600">{user.user_address}</p>
                        <p className="text-sm text-gray-600">{user.mobile_number}</p>
                    </div>
                </div>
            </div>

            <div className=" flex justify-center">
                <h1 className=" text-3xl font-semibold">Your Pets</h1>
            </div>

            <div className="m-5 justify-center flex">
                <Button text={"Add a New Pet"} onClick={() => navigate('/addpet')} />
            </div>

            <div className="flex flex-wrap justify-start m-10">
                {pets.map((pet, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded overflow-hidden shadow-lg m-4"
                    >
                        <img
                            className="h-64"
                            src={pet.pet_image}
                            alt={pet.pet_name}
                        />
                        <div className="px-6 py-4 flex justify-between bg-blue-gray-200">
                            <div className="font-bold text-xl mb-2 ">{pet.pet_name}</div>
                            <p className="text-gray-700 text-base">
                                Type: {pet.pet_type}
                                <br />
                                Breed: {pet.pet_breed}
                                <br />
                                ID: {pet.pet_id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className=" flex justify-center">
                <h1 className=" text-3xl font-semibold">Your Bookings</h1>
            </div>
            <div className="flex flex-wrap justify-start m-10">
                {bookings.map((booking, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded overflow-hidden shadow-lg m-4"
                    >
                        <div className="px-6 py-4 flex justify-between bg-blue-gray-200">
                            <div className="font-bold text-xl mb-2 ">{booking.pet_name}</div>
                            <p className="text-gray-700 text-base">
                                Start Date: {new Date(booking.start_date).toLocaleDateString()}
                                <br />
                                End Date: {new Date(booking.end_date).toLocaleDateString()}
                                <br />
                                Type: {booking.type}
                                <br></br>
                                Id: {booking._id}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
