import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LocationPage from './LocationPage'; // Import the AnotherComponent
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Navbar = styled.nav`
    background-color: #333;
    padding: 10px;
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        li {
            display: inline;
            margin-right: 10px;
            a {
                text-decoration: none;
                color: #fff;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

const Main = styled.main`
    padding: 20px;
`;

const SearchBar = styled.input`
    padding: 8px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    cursor: pointer;
`;

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [centers, setCenters] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch user data when the component mounts
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.post('http://localhost:3001/api/user', { token });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error, e.g., redirect to login page
            }
        };

        fetchUserData(); // Call the fetchUserData function
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        // Fetch centers based on the selected location
        const fetchCenters = async () => {
            try {
                if (!selectedLocation) {
                    return;
                }
                const response = await axios.get(`http://localhost:3001/api/centers?location=${selectedLocation}`);
                setCenters(response.data);
            } catch (error) {
                console.error('Error fetching centers:', error);
            }
        };

        fetchCenters(); // Call the fetchCenters function
    }, [selectedLocation]); // Trigger fetchCenters whenever selectedLocation changes

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleButtonClick = (center) => {
        // Set clicked item and navigate to LocationPage
        setId(center.name);
    };

    useEffect(() => {
        console.log("Updated id:", id);
    }, [id]);

    return (
        <Container>
            <Navbar>
                <ul>
                    <li><a href="#">Pet Boarding</a></li>
                    <li><a href="#">Pet Grooming</a></li>
                    <li><a href="#">Veterinary</a></li>
                </ul>
            </Navbar>
            <Main>
                <h2>Welcome, {username}</h2>
                <SearchBar 
                    type="text"
                    placeholder="Select Location"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                />
                <h3>Centers in {selectedLocation}</h3>
                <ul>
                    {centers.map(center => (
                        <li key={center.id}>
                            <Button onClick={() => handleButtonClick(center)}>{center.name}</Button>
                        </li>
                    ))}
                </ul>
                {/* Ternary statement to conditionally render LocationPage */}
                {id ? <LocationPage center={id} /> : null}
            </Main>
        </Container>
    );
};

export default Dashboard;
