import "@fortawesome/fontawesome-free/css/all.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import the right arrow icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Vet from "../assets/vet.jpg"
// import VetClinicImage from "../assets/vetclinics.jpg";
import CustomModal from "./CustomModal";

import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";

export default function VetClinics() {
    const [favorites, setFavorites] = useState([]);
    const [showBookingCard, setShowBookingCard] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [filterItem, setFilterItem] = useState(null);
    const [sortedData, setSortedData] = useState(null); // State variable to hold sorted data
    const [data, setData] = useState([{
        id: 1,
        title: "Vet Clinic A",
        rating: 4,
        address: "123 Sector 18, Noida, U.P.",
        additionalInfo: "24/7 Emergency, Experienced Veterinarians, Pet Pharmacy",
        price: 100
    }]);

    const [clinic, setClinic] = useState("");

    useEffect(() => {
        fetchVetClinics(); // Fetch data when component mounts
    }, []);

    const fetchVetClinics = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/clinics"); // Adjust the endpoint according to your backend route
            if (!response.ok) {
                throw new Error("Failed to fetch vet clinics");
            }
            const fetchedData = await response.json(); // Parse the JSON response
            console.log('Fetched Data : ', fetchedData);

            // Transform the fetched data into the desired format
            const transformedData = fetchedData.map(item => ({
                id: item._id, // Assuming the MongoDB _id field is used as the ID
                title: item.name,
                rating: item.rating,
                address: item.address,
                additionalInfo: item.additionalInfo,
                price: item.price
            }));
            setData(transformedData); // Set the transformed data into the state
            console.log('Data received from the backend:', transformedData);
        } catch (error) {
            console.error("Error fetching vet clinics:", error);
        }
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((favId) => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const handleBookNow = (clinic) => {
        setClinic(clinic);
        setShowBookingCard(true);
    };

    const modalHandler = () => {
        setShowBookingCard((prevOpn) => !prevOpn);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleFilterChange = (filter) => {
        setFilterItem(filter);
        if (filter === "Rating") {
            // Sort data by rating
            const sortedData = [...data].sort((a, b) => b.rating - a.rating);
            setSortedData(sortedData);
        }
    };

    return (
        <div>
            <Sidebar2 />
            <h2 className="ml-20 mt-5 text-2xl font-semibold mb-4">
                Showing Results for Veterinary Clinics
            </h2>
            <div className="ml-20 flex flex-wrap items-center">
                <button
                    id="Rating"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                    onClick={() => handleFilterChange("Rating")}
                >
                    Rating
                </button>
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                    Nearest
                </button>
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                    24/7 Emergency
                </button>
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                    +Filters
                </button>
            </div>
            <div className="flex ml-20 mt-10">
                <div className="w-1/2">
                    {(filterItem === "Rating" ? sortedData : data).map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded overflow-hidden shadow-lg mb-4"
                        >
                            <div className="px-6 py-4">
                                <div className="flex justify-between items-center m-3">
                                    <img
                                        className="h-64"
                                        src={Vet}
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
                                        <p className="text-gray-700 text-sm">{item.additionalInfo}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 right-0 mb-4 mr-4">
                                <p className="text-gray-700 font-semibold">{item.price} Rs</p>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleBookNow(item)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {showBookingCard && <CustomModal modalOpen={showBookingCard} funcHandle={modalHandler} clinic={clinic} />}
            </div>
            <Footer />
        </div>
    );
}





