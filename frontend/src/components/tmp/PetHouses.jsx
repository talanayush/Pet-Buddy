import React, { useState } from "react";
import CustomModal from "./CustomModal";
import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";
import PetImage from "../assets/pethouses.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function PetHouses() {
    const [favorites, setFavorites] = useState([]);
    const [showBookingCard, setShowBookingCard] = useState(false);
    const [booking, setBooking] = useState({
        username: "JohnDoe",
        petName: "Fluffy",
        startDate: "2024-04-01",
        endDate: "2024-04-10",
        petType: "Cat",
        petHouse: "",
    });

    const data = [
        {
            id: 1,
            title: "PetHouse A",
            rating: 4,
            address: "123 Sector 18, Noida, U.P.",
            additionalInfo: "Pet Grooming, Diet plans, Vet Available",
            price: 100,
        },
        {
            id: 2,
            title: "PetHouse B",
            rating: 5,
            address: "456 Sector 51, Noida, U.P.",
            additionalInfo: "Available vet clinic, Fun for Pets, Safety secured",
            price: 120,
        },
        {
            id: 3,
            title: "PetHouse C",
            rating: 3,
            address: "789 Sector 61, Noida, U.P.",
            additionalInfo: "Pet Grooming, Your diet plans",
            price: 80,
        },
    ];

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((favId) => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const handleBookNow = (item) => {
        // Update booking with pet house title
        setBooking((prevState) => ({
            ...prevState,
            petHouse: item.title, // Set the pet house title as part of the booking
        }));
        setShowBookingCard(true); // Show the booking modal
    };
    function handleBooking(item) {
        setBooking((prevState) => ({
            ...prevState,
        }));
        console.log(booking);
    }

    function modalHandler() {
        setShowBookingCard((prevOpn) => !prevOpn);
    }

    return (
        <div>
            <Sidebar2 />
            <div className="ml-20 flex flex-wrap items-center">
                {/* Some other code */}
            </div>

            <div className="flex ml-20 mt-10">
                <div className="w-1/2">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded overflow-hidden shadow-lg mb-4"
                        >
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <img
                                        className="h-64"
                                        src={PetImage}
                                        alt={item.title}
                                    />
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={`cursor-pointer text-lg ${favorites.includes(item.id)
                                                ? "text-red-500"
                                                : "text-gray-400"
                                            }`}
                                        onClick={() => toggleFavorite(item.id)}
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-bold text-xl">{item.title}</div>

                                        <div className="flex items-center mb-2">
                                            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                                                {item.rating}
                                            </span>
                                            {Array.from({ length: item.rating }, (_, i) => (
                                                <i key={i} className="fas fa-star text-yellow-500"></i>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 text-base">{item.address}</p>
                                        <p className="text-gray-700 text-sm">
                                            {item.additionalInfo}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 mb-4 mr-4">
                                <p className="text-gray-700 font-semibold">{item.price} Rs</p>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleBookNow(item)} // Pass the item to the handleBookNow function
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className=" flex justify-center">
                    {showBookingCard && (
                        <CustomModal
                            booking={booking} // Pass the booking state with the pet house title
                            modalOpen={showBookingCard}
                            funcHandle={modalHandler}
                            handleBooking={handleBooking}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
