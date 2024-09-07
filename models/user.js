const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 225
    },
    email: {
        type: String,
        required: true,
        maxlength: 225
    },
    password: {
        type: String,
        required: true,
        maxlength: 225
    },
    
    gender: {
        type: String,
        required: true,
        maxlength: 225
    },
    phone: {
        type: String,
        required: true,
        maxlength: 225
    },
    age: {
        type: Number,
        required: true,
        max: 225
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
