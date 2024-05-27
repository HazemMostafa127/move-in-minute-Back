const rideService = require('../services/ride');

exports.createRide = async (req, res) => {
    try {
        const { name, description, from, to, price, seats, date, time, driver, type } = req.body;
        const data = { name, description, from, to, price, seats, date, time, driver, type };
        const ride = await rideService.add(data);
        if (!ride) {
            return res.status(400).json({ error: 'Failed to create ride' });
        }
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.getOne(id);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        res.status(200).json({ message: "Ride Retrieved Successfully", ride });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRides = async (req, res) => {
    try {
        const rides = await rideService.getAll();
        res.status(200).json({ message: "Rides Retrieved Successfully", rides });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.getOne(id);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        const { name, description, from, to, price, seats, date, time, driver, type } = req.body;
        const data = { name, description, from, to, price, seats, date, time, driver, type };
        const updatedRide = await rideService.update(id, data);
        if (!updatedRide) {
            return res.status(400).json({ error: 'Failed to update ride' });
        }
        res.status(200).json({ message: 'Ride updated successfully', updatedRide });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await rideService.getOne(id);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        await rideService.delete(id);
        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.searchRides = async (req, res) => {
    try {
        const { from, to } = req.query;
        console.log(from, to);
        const rides = await rideService.search(from, to);
        res.status(200).json({ message: 'Rides retrieved successfully', rides });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.bookRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const ride = await rideService.getOne(id);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        const updatedRide = await rideService.book(id, userId);
        if (!updatedRide) {
            return res.status(400).json({ error: 'Failed to book ride' });
        }
        res.status(200).json({ message: 'Ride booked successfully', updatedRide });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.cancelRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const ride = await rideService.getOne(id);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        const updatedRide = await rideService.cancel(id, userId);
        if (!updatedRide) {
            return res.status(400).json({ error: 'Failed to cancel ride' });
        }
        res.status(200).json({ message: 'Ride cancelled successfully', updatedRide });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}