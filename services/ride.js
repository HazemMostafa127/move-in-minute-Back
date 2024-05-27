const Ride = require("../models/ride");

exports.add = async (data) => {
    try {
        const { name, description, from, to, price, seats, date, time, driver, type } = data;
        if (date < Date.now()) {
            throw new Error('Date must be in the future')
        }
        if (seats < 1) {
            throw new Error('Seats must be at least 1')
        }
        const ride = new Ride({ name, description, from, to, price, seats, date, time, driver, type });
        return await ride.save();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.getOne = async (id) => {
    try {
        return await Ride.findById(id);
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.getAll = async () => {
    try {
        return await Ride.find();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.update = async (id, data) => {
    try {
        const ride = await this.getOne(id);
        if (!ride) {
            throw new Error('Ride not found');
        }
        if (data.date < Date.now()) {
            throw new Error('Date must be in the future')
        }
        if (data.seats < 1) {
            throw new Error('Seats must be at least 1')
        }
        ride.name = data.name;
        ride.description = data.description;
        ride.from = data.from;
        ride.to = data.to;
        ride.price = data.price;
        ride.seats = data.seats;
        ride.date = data.date;
        ride.time = data.time;
        ride.driver = data.driver;
        ride.type = data.type;
        return await ride.save();
    }
    catch (error) {
        console.log(error);
        return;
    }
};

exports.delete = async (id) => {
    try {
        return await Ride.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.search = async (from, to) => {
    try {
        return await Ride.find({ from, to });
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.book = async (id, userId) => {
    try {
        const ride = await this.getOne(id);
        if (!ride) {
            throw new Error('Ride not found');
        }
        if (ride.seats < 1) {
            throw new Error('No seats available')
        }
        ride.seats -= 1;
        ride.passengers.push(userId);
        return await ride.save();
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.cancel = async (id, userId) => {
    try {
        const ride = await this.getOne(id);
        if (!ride) {
            throw new Error('Ride not found');
        }
        if (!ride.passengers.includes(userId)) {
            throw new Error('User not found in passengers list');
        }
        ride.seats += 1;
        ride.passengers = ride.passengers.filter(p => p.toString() !== userId.toString());
        return await ride.save();
    } catch (error) {
        console.log(error);
        return;
    }
};