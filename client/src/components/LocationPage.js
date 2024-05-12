// LocationPage.js
import React from 'react';

const LocationPage = ({ location }) => {
    console.log('In location page : ', location);

    const { center } = location.state;

    return (
        <div>
            <h2>Location Details</h2>
            <p>Name: {center.name}</p>
            <p>Latitude: {center.latitude}</p>
            <p>Longitude: {center.longitude}</p>
            <p>Address: {center.address}</p>
        </div>
    );
};

export default LocationPage;
