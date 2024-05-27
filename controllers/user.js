const userService = require('../services/user');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const data = { username, email, password, role };
        const user = await userService.add(data);
        if (!user) {
            return res.status(400).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getOne(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: "User Retrieved Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json({ message: "Users Retrieved Successfully", users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getOne(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { username, email, role } = req.body;
        const data = { username, email, role };
        const updatedUser = await userService.update(id, data);
        if (!updatedUser) {
            return res.status(400).json({ error: 'Failed to update user' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // if (req.user._id.toString() !== id.toString() && req.user.role !== 'admin') {
        //     return res.status(403).json({ error: 'Unauthorized' });
        // }
        const user = await userService.getOne(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await userService.delete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};