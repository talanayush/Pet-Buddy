import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestAPI = () => {
    const [responseData, setResponseData] = useState(null);
    const { petName } = useParams();

    // Function to send POST request
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                // Send a POST request with the pet name
                const response = await axios.post('http://localhost:3001/api/pets', { pet_name: 'roxy' });
                // Set the retrieved data to state
                console.log(response.data);
                setResponseData(response.data);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        fetchPetData(); // Call the function to fetch pet data
    }, [petName]); // Dependency array includes petName to refetch data when it changes

    return (
        <div>
            {/* Render the retrieved pet data */}
            {responseData && (
                <div>
                    <h2>Pet Information</h2>
                    <p>Pet Name: {responseData.pet_name}</p>
                    <p>Pet Type: {responseData.pet_type}</p>
                    <p>Pet Breed: {responseData.pet_breed}</p>
                    <img src={responseData.pet_image} alt="Pet" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default TestAPI;
