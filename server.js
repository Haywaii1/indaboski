const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

require('dotenv').config()

app.use(express.json())

const productRoute = require('./routes/product')
app.use('/api/products', productRoute)

// you have to install express file upload using "npm i express-fileupload" This is for image upload
app.use(fileUpload({
    useTempFiles: true,
    limits: {fileSize: 50 * 2048 * 1024}
}))

// you have to install cloudinary too, this is also for image upload using "npm i cloudinary"
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

const userRoute = require('./routes/user')
app.use('/api/users', userRoute)

    const PORT = process.env.PORT || 5000
    const dbConnectionString = process.env.DB_CONNECTION 

    mongoose.connect(dbConnectionString).then(() => {
        console.log('Database is connected...');
    }).catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}...`)
    });