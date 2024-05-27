const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require("../models/user");

require('dotenv').config();

exports.add = async (data) => {
    try {
        const { username, email, password, role } = data;
        const existingUser = await this.getOne(email) || await this.getOne(username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        return await user.save();
    }
    catch (error) {
        console.log(error);
        return;
    }
};

exports.getOne = async (id) => {
    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(id)) {
            user = await User.findById(id);
        } else {
            user = await User.findOne({
                $or: [
                    { username: id },
                    { email: id }
                ]
            });
        }
        return user;
    } catch (error) {
        console.log(error);
        return;
    }
};

exports.getAll = async () => {
    try {
        return await User.find();
    }
    catch (error) {
        console.log(error);
        return;
    }
};

exports.update = async (id, user) => {
    try {
        const updatedUser = await this.getOne(id);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        const { username, email, role } = user;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        updatedUser.username = username;
        updatedUser.email = email;
        updatedUser.role = role;
        return await updatedUser.save();
    }
    catch (error) {
        console.log(error);
        return;
    }
};

exports.delete = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    }
    catch (error) {
        console.log(error);
        return;
    }
};