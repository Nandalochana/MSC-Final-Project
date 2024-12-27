const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

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
            const newUser = new User({
                ...req.body,
                profileImg: req.file ? req.file.path : null
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUser(req, res) {
        const updatedData = {
            ...req.body,
            profileImg: req.file ? req.file.path : req.body.profileImg
        };
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
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

module.exports = { UserController, upload };