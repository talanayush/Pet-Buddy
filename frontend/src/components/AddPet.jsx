import { useState, useRef, useEffect } from 'react';
import Sidebar3 from "./Sidebar3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function AddPet() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [username, setUsername] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(0);
    // Define all your state variables and functions here...



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
                console.log('Received RRR : ', response.data.username);
                setIsLoggedIn(1);
                setUsername(response.data.username);

                return response.data;
            } catch (error) {
                console.error('Error fetching user details:', error.message);
                return { username: null };
            }
        };

        if (token) {

            fetchUserDetails();
            console.log('Hello!!!');
        } else {
            console.log('Token Not Set');
        }
    }, []);

    const handleNextClick = async () => {
        if (currentIndex === 4) {
            // If it's the last step, make the API call
            try {
                console.log('Called for backend');

                // Add username to formData
                const dataToSend = {
                    ...formData,
                    username: username // Assuming username is 's', replace it with the actual value
                };

                const response = await axios.post('http://localhost:3001/api/pets/add', dataToSend);
                if (response.status === 200) {
                    console.log('Pet added successfully:', response.data);
                    window.location.href = '/profile';
                } else {
                    console.error('Failed to add pet:', response.data);
                }
            } catch (error) {
                console.error('Error adding pet:', error);
            }
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const PetType = [
        {
            id: 1,
            title: 'Dog',
            imgurl: 'src/assets/dogsvg.svg',
        },
        {
            id: 2,
            title: 'Cat',
            imgurl: 'src/assets/catsvg.svg',
        },
        {
            id: 3,
            title: 'Rabbit',
            imgurl: 'src/assets/rabbitsvg.svg',
        },
        {
            id: 4,
            title: 'Rodents',
            imgurl: 'src/assets/rodentsvg.svg',
        },
    ];
    const Purpose = [
        {
            id: 1,
            title: 'Pet House',
            imgurl: 'src/assets/pethousesvg.svg',
        },
        {
            id: 2,
            title: 'Vet Clinic',
            imgurl: 'src/assets/vetsvg.svg',
        },
    ];
    const [formData, setFormData] = useState({
        name: "",
        ageYears: "",
        ageMonths: "",
        petWeight: "",
        willingnessToTravel: "",
        selected: "",
    });

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value
        });
    };


    const [selectedSize, setSelectedSize] = useState("");

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const [selectedBreed, setSelectedBreed] = useState("");

    const handleBreedClick = (opt) => {
        setSelectedBreed(opt);
    };
    const [selectedTypeBreed, setSelectedTypeBreed] = useState("");
    const handleTypeBreedClick = (opt) => {
        setSelectedTypeBreed(opt);
    };

    const Gender = [
        {
            id: 1,
            title: "male",
            imgurl: 'src/assets/female-svgrepo-com.svg',
        },
        {
            id: 2,
            title: "female",
            imgurl: 'src/assets/male-svgrepo-com.svg',
        },
    ];

    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedPurpose, setSelectedPurpose] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);

    const handlePetClick = (id) => {
        console.log('Pet clicked:', id);
        setSelectedPet(id);
    };

    const handlePurposeClick = (id) => {
        console.log('Purpose clicked:', id);
        setSelectedPurpose(id);
    };
    const handleGenderClick = (id) => {
        console.log('Gender clicked:', id);
        setSelectedGender(id);
    };


    return (
        <>
            <Sidebar3 />
            {currentIndex === 0 && (
                <div className="flex justify-center items-start pt-8">
                    <div className="w-full max-w-md">
                        <div className="px-4 py-4">
                            {/* Step bars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-2 ${currentIndex > index ? 'bg-green-800' : 'bg-gray-200'} rounded-full mx-1`}
                                    ></div>
                                ))}
                            </div>
                            <div className="text-center text-2xl text-black font-bold">
                                What type of pet do you have?
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-wrap justify-center gap-4'>
                                    {PetType.map((pet) => (
                                        <div
                                            key={pet.id}
                                            className={`flex flex-col items-center justify-center text-gray-700 shadow-md bg-clip-border rounded-lg w-32 h-32 m-5 p-5 cursor-pointer bg-${selectedPet === pet.id ? 'gray-500' : 'white'}`}
                                            onClick={() => handlePetClick(pet.id)}
                                        >
                                            <img src={pet.imgurl} alt={pet.title} className='w-20 h-20 mb-2' />
                                            <div>{pet.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <div className='text-center text-2xl text-black font-bold'>Looking For?</div>
                                {/* Cards for purposes */}
                                <div className='flex flex-row justify-center gap-4'>
                                    {Purpose.map((aim) => (
                                        <div
                                            key={aim.id}
                                            className={`flex flex-col items-center justify-center text-gray-700 shadow-md bg-clip-border rounded-lg w-32 h-32 m-5 p-5 cursor-pointer bg-${selectedPurpose === aim.id ? 'gray-500' : 'white'}`}
                                            onClick={() => handlePurposeClick(aim.id)}
                                        >
                                            <img src={aim.imgurl} alt={aim.title} className='w-20 h-20 mb-2' />
                                            <div>{aim.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentIndex === 1 && (
                <div className="flex justify-center items-start pt-8">
                    <div className="w-full max-w-md">
                        <div className="px-4 py-4">
                            {/* Step bars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-2 ${currentIndex > index ? 'bg-green-800' : 'bg-gray-200'} rounded-full mx-1`}
                                    ></div>
                                ))}
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='text-center text-2xl text-black font-bold mb-4'>
                                    What's your pet's name?
                                </div>
                                <input

                                    type="text"
                                    className={`border-2 border-gray-400 rounded-lg px-8 py-2 w-50 h-10 mx-5 my-5`}
                                    placeholder="Enter your pet's name"
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            </div>
                            <div className='text-center text-2xl text-black font-bold mb-4'>
                                Select Gender
                            </div>
                            <div className="flex justify-between mt-4">

                                <div className='flex flex-row justify-center gap-4'>
                                    {Gender.map((aim) => (
                                        <div
                                            key={aim.id}
                                            className={`flex flex-col items-center justify-center text-gray-700 shadow-md bg-clip-border rounded-lg w-32 h-32 m-5 p-5 cursor-pointer ${selectedGender === aim.id ? 'bg-gray-500' : 'bg-white'}`}
                                            onClick={() => handleGenderClick(aim.id)}
                                        >
                                            <img src={aim.imgurl} alt={aim.title} className='w-20 h-20 mb-2' />
                                            <div className={selectedGender === aim.id ? 'text-white' : ''}>{aim.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}


            {currentIndex === 2 && (
                <div className="flex justify-center items-start pt-8">
                    <div className="w-full max-w-md">
                        <div className="px-4 py-4">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-2 ${currentIndex > index ? 'bg-green-800' : 'bg-gray-200'} rounded-full mx-1`}
                                    ></div>
                                ))}
                            </div>
                            <div className='text-center text-2xl text-black font-bold mb-4'>
                                What's your pet's breed?
                            </div>
                            <div className="flex items-center mt-4">
                                <button
                                    className={`w-20 h-12  border border-gray-300 mx-2 ${selectedTypeBreed === "Purebred" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleTypeBreedClick("Purebred")}
                                >
                                    Purebred
                                </button>
                                <button
                                    className={`w-20 h-12 border border-gray-300 mx-2 ${selectedTypeBreed === "Crossbred" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleTypeBreedClick("Crossbred")}
                                >
                                    Crossbred
                                </button>
                            </div>
                            <div className="flex flex-col ">
                                <div className='text-center text-2xl text-black font-bold mb-4'>
                                    Select specific breed
                                </div>
                                <select

                                    onChange={(e) => handleInputChange("selected", e.target.value)}
                                    placeholder="Enter your pet's breed"
                                    className="ml-2 border-2 border-gray-400 rounded-lg px-4 py-2"
                                >
                                    <option value="">Select an option</option>
                                    <option value="option1">Labrador</option>
                                    <option value="option2">German Shepherd</option>
                                    <option value="option3">Golden Retriever</option>
                                </select>
                            </div>
                            <div className='flex flex-row mt-4'>
                                <div className='text-center text-2xl text-black font-bold'>
                                    Certified breed?
                                </div>
                                <div className="flex items-center mt-4">
                                    <button
                                        className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedBreed === "Yes" ? 'bg-gray-500' : 'bg-white'}`}
                                        onClick={() => handleBreedClick("Yes")}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedBreed === "No" ? 'bg-gray-500' : 'bg-white'}`}
                                        onClick={() => handleBreedClick("No")}
                                    >
                                        No
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {currentIndex === 3 && (
                <div className="flex justify-center items-start pt-8">
                    <div className="w-full max-w-md">
                        <div className="px-4 py-4">
                            {/* Step bars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-2 ${currentIndex > index ? 'bg-green-800' : 'bg-gray-200'} rounded-full mx-1`}
                                    ></div>
                                ))}
                            </div>
                            <div className='text-center text-2xl text-black font-bold'>
                                How big is your pet?
                            </div>
                            <div className="flex items-center mt-4">
                                <button
                                    className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedSize === "Small" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleSizeClick("Small")}
                                >
                                    Small
                                </button>
                                <button
                                    className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedSize === "Medium" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleSizeClick("Medium")}
                                >
                                    Medium
                                </button>
                                <button
                                    className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedSize === "Large" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleSizeClick("Large")}
                                >
                                    Large
                                </button>
                                <button
                                    className={`w-16 h-16 rounded-full border border-gray-300 mx-2 ${selectedSize === "Extra Large" ? 'bg-gray-500' : 'bg-white'}`}
                                    onClick={() => handleSizeClick("Extra Large")}
                                >
                                    Extra Large
                                </button>
                            </div>

                        </div>
                        <div className='text-center text-2xl text-black font-bold mt-6'>
                            How old is your pet?
                        </div>
                        <div className="flex flex-row flex-wrap justify-center   mt-4">
                            <div className="flex flex-col items-center">
                                <label htmlFor="pet-age-years" className="text-md font-medium text-gray-900 dark:text-gray-300"></label>
                                <input

                                    onChange={(e) => handleInputChange("ageYears", e.target.value)}
                                    id="pet-age-years"
                                    type="number"
                                    min="0"
                                    className="border-2 border-gray-400 rounded-lg px-4 py-2 w-20 h-10 mx-1 my-2"
                                    placeholder="Years"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label htmlFor="pet-age-months" className="text-md font-medium text-gray-900 dark:text-gray-300"></label>
                                <input

                                    onChange={(e) => handleInputChange("ageMonths", e.target.value)}
                                    id="pet-age-months"
                                    type="number"
                                    min="0"
                                    max="11"
                                    className="border-2 border-gray-400 rounded-lg px-4 py-2 w-20 h-10 mx-1 my-2"
                                    placeholder="Months"
                                />
                            </div>
                        </div>
                        <div className='text-center text-2xl text-black font-bold mt-6'>
                            Your pet's weight
                        </div>
                        <div className="flex flex-row flex-wrap justify-center   mt-4">
                            <div className="flex flex-col items-center">
                                <label htmlFor="pet-age-years" className="text-md font-medium text-gray-900 dark:text-gray-300"></label>
                                <input

                                    onChange={(e) => handleInputChange("petWeight", e.target.value)}
                                    id="pet-weight"
                                    type="number"
                                    min="0"
                                    className="border-2 border-gray-400 rounded-lg px-4 py-2 w-20 h-10 mx-1 my-2"
                                    placeholder="Kgs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {currentIndex === 4 && (
                <div className="flex justify-center items-start pt-8">
                    <div className="w-full max-w-md">
                        <div className="px-4 py-4">
                            {/* Step bars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-2 ${currentIndex > index ? 'bg-green-800' : 'bg-gray-200'} rounded-full mx-1`}
                                    ></div>
                                ))}
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='text-center text-2xl text-black font-bold mb-4'>
                                    Willingness to travel?
                                </div>
                                <input

                                    onChange={(e) => handleInputChange("willingnessToTravel", e.target.value)}
                                    type="text"
                                    className={`border-2 border-gray-400 rounded-lg px-8 py-2 w-50 h-10 mx-5 my-5`}
                                    placeholder="Are you willing to travel..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleNextClick}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );
}
