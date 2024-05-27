const mongoose = require("mongoose");

const rideSchema = require("../schemas/ride");

const rideModel = mongoose.model('Ride', rideSchema);

module.exports = rideModel;