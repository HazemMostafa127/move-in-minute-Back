const bcrypt = require('bcrypt');

const { generateToken } = require('../utils/jwt');

const userService = require('./user');

exports.login = async (email, password) => {
    try {
        const user = await userService.getOne(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        const token = generateToken(payload);
        if (!token) {
            throw new Error('Token generation failed');
        }
        return { token, user };
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
};

exports.register = async (data) => {
    try {
        const { username, email, password, role } = data;
        const user = await userService.add({ username, email, password, role });
        if (!user) {
            throw new Error('Failed to create user');
        }
        return user;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}