const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    rides: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride'
    }]    
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = userSchema;