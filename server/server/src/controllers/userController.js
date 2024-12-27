const User = require('../models/user');

class UserController {
    async getUsers(req, res) {
        const users = await User.find();
        res.status(200).json(users);
    }

    async getUserById(req, res) {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUser(req, res) {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async deleteUser(req, res) {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}

module.exports = UserController;