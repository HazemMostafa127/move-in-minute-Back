const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    seats:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passengers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    type:{
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'rides'
});

module.exports = ridesSchema;