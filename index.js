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
app.use(cors({
    origin: '*', // Allow requests from the frontend
    credentials: true // Enable credentials if using cookies or tokens
  }));


// // Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
console.log('Mongo Connected')
app.use('/auth', UserRouter);   //all the endpoints which are going to be related to authentication will be prefixed with /auth
app.use('/recipe', RecipeRouter); //all the endpoints which are going to be related to recipes will be prefixed with /recipe

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})


