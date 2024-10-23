const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./routes/user');
const RecipeRouter = require('./routes/recipe');
const dotenv = require('dotenv');

dotenv.config();

const Port = process.env.Port || 4001;
const app = express();

app.use(express.json());

// Correct CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',  // Use the exact origin of your frontend
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true  // Set credentials to true to allow cookies or tokens to be passed
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/auth', UserRouter);
app.use('/recipe', RecipeRouter);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
