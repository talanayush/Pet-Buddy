// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

const secretKey = 'xyz'; // Secret key for JWT

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://pandeygrocks:Saurabh04@maindb.ijbfr2l.mongodb.net/petbuddy?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {

        console.log('Connected to MongoDB');
    })
    .catch((error) => {

        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    password: {
        type: String
    },
    user_name: {
        type: String
    },
    user_address: {
        type: String
    },
    mobile_number: {
        type: String
    }
});
const Users = mongoose.model('Users', userSchema);

const centerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    address: {
        type: String
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
});
const Center = mongoose.model('Center', centerSchema);

const petSchema = new mongoose.Schema({
    pet_id: {
        type: String
    },
    pet_name: {
        type: String
    },
    pet_age: {
        type: String
    },
    pet_weight: {
        type: String
    },
    pet_willingness: {
        type: String
    },
    pet_type: {
        type: String
    },
    user_name: {
        type: String
    },
    pet_breed: {
        type: String
    },
    pet_size: {
        type: String
    },
    pet_image: {
        type: String
    },
    pet_gender: {
        type: String
    }
});
const Pet = mongoose.model('Pet', petSchema);

const bookingSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    pet_name: {
        type: String
    },
    datetime_of_booking: {
        type: Date
    },
    type: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    payment_id: {
        type: String
    },
    pethouse_id: {
        type: String
    }
});
const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
    const { username } = req.body;
    console.log('API/Booking Called : ', req.body);

    try {
        // Find all bookings associated with the provided username
        const bookings = await Booking.find({ user_name: username });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the provided username' });
        }

        res.json(bookings);
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/bookings/add', async (req, res) => {
    const { username, pet_name, datetime_of_booking, type, time_slot, pethouse_id, start_time, end_time } = req.body; // Added pethouse_id

    try {
        // Generate payment ID (you can use any method to generate a unique ID)
        const payment_id = generatePaymentID();

        // Create a new booking record
        const newBooking = new Booking({
            user_name: username,
            pet_name,
            datetime_of_booking,
            type,
            time_slot,
            payment_id,
            pethouse_id,
            start_date: start_time,
            end_date: end_time
        });

        // Save the booking record to the database
        const savedBooking = await newBooking.save();

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error adding booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const generatePaymentID = () => {
    // Generate a random alphanumeric string (you can use any method to generate a unique ID)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let paymentID = '';
    for (let i = 0; i < 10; i++) {
        paymentID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return paymentID;
};

app.post('/api/pets', async (req, res) => {
    const { user_name } = req.body;

    console.log('API Pets called', user_name);

    try {
        // Find all pets associated with the provided user_name
        const pets = await Pet.find({ user_name });

        if (!pets || pets.length === 0) {
            return res.status(404).json({ message: 'No pets found for the provided user_name' });
        }

        console.log('dvahdavhasv : ', pets);

        res.json(pets);
    } catch (error) {
        console.error('Error retrieving pet information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/pets/add', (req, res) => {
    // Destructure the request body to get the data for the new pet
    const { name, ageYears, ageMonths, petWeight, willingnessToTravel, selected, username } = req.body;
    console.log('Received request:', req.body);

    // Generate a random pet ID
    const pet_id = uuid.v4();

    // Create a new pet document based on the request body
    const newPet = new Pet({
        pet_id, // Include the generated pet ID
        pet_name: name,
        pet_age: `${ageYears} years ${ageMonths} months`,
        pet_weight: petWeight,
        pet_willingness: willingnessToTravel,
        pet_type: (selected == 'option1' ? "Dog" : (selected == 'option2' ? "Cat" : (selected == 'option3' ? "Rabbit" : "Rodent"))),
        user_name: username, // Assuming you have a way to identify the user
        pet_breed: 'Labrador', // Assuming you have a default breed or another way to get this data
        pet_image: 'https://placekitten.com/200/300', // Assuming you have a way to handle the image data
        pet_size: 'Medium', // Assuming you have a default size or another way to get this data
        pet_gender: 'male' // Assuming you have a default gender or another way to get this data
    });

    // Save the new pet document to the database
    newPet.save()
        .then(() => {
            // Send a success response back to the client
            res.status(200).json({ message: 'Pet added successfully' });
        })
        .catch((error) => {
            // If there's an error saving the pet data, send an error response
            console.error('Error saving pet data:', error);
            res.status(500).json({ error: 'Failed to add pet' });
        });
});





app.get('/api/centers', async (req, res) => {
    try {
        const centers = await Center.find({});

        if (!centers || centers.length === 0) {
            return res.status(404).json({ message: 'No centers found' });
        }

        res.json(centers);
    } catch (error) {
        console.error('Error loading centers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/userData', async (req, res) => {
    const { user_name } = req.body;

    try {
        // Find the user by user_name in the Users collection
        const userData = await Users.findOne({ user_name });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // console.log(userData);
        res.json(userData); // Send the user data as response
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post('/api/signup', async (req, res) => {
    const { username, password, user_address, mobile_number } = req.body;

    try {
        const existingUser = await Users.findOne({ user_name: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user_id = uuid.v4();


        const newUser = new Users({ user_id, user_name: username, password, user_address, mobile_number });
        await newUser.save();

        console.log('User signed up:', newUser);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Signup failed:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { user_name: username, password } = req.body;

    try {
        const user = await Users.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.user_name }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});


app.post('/api/user', (req, res) => {
    const token = req.headers.authorization;

    console.log('Received Token:', token);

    try {
        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Invalid token format');
        }
        const decodedToken = token.split(' ')[1];

        // console.log('Decoded Token:', decodedToken);

        const decoded = jwt.verify(decodedToken, secretKey);
        if (Date.now() >= decoded.exp * 1000) {
            throw new Error('Token expired');
        }

        // console.log('Decoded:', decoded);
        res.json({ username: decoded.username });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
});

const vetSchema = new mongoose.Schema({
    vet_name: {
        type: String,
        required: true
    },
    vet_address: {
        type: String,
        required: true
    },
    vet_mobile: {
        type: String,
        required: true
    },
    education: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    vet_fees: {
        type: String
    }
});
const Vet = mongoose.model('Vet', vetSchema);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
