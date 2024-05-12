import React, { useState } from 'react';
import './AddPetInfo.css'; // Importing CSS file

function AddPetInfo() {
    const [petInfo, setPetInfo] = useState({
        pet_name: '',
        pet_type: '',
        pet_breed: '',
        pet_image: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPetInfo({ ...petInfo, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPetInfo({ ...petInfo, pet_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the pet information, such as sending it to a server
        console.log('Pet Information:', petInfo);
        // Reset the form fields after submission
        setPetInfo({
            pet_name: '',
            pet_type: '',
            pet_breed: '',
            pet_image: ''
        });
    };

    return (
        <div className="container">
            <h2>Add Pet Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="petName">Pet Name:</label>
                    <input type="text" className="form-control" id="petName" name="pet_name" value={petInfo.pet_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="petType">Pet Type:</label>
                    <select className="form-control" id="petType" name="pet_type" value={petInfo.pet_type} onChange={handleInputChange} required>
                        <option value="">Select pet type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="petBreed">Pet Breed:</label>
                    <input type="text" className="form-control" id="petBreed" name="pet_breed" value={petInfo.pet_breed} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="petImage">Upload Pet Image : </label>
                    <input type="file" className="form-control-file" id="petImage" name="pet_image" accept="image/*" onChange={handleImageChange} />
                </div>
                {petInfo.pet_image && <img src={petInfo.pet_image} alt="Pet" className="uploaded-image" />}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddPetInfo;
