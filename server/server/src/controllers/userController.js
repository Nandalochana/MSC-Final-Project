const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const LoginInfo = require('../models/loginInfo');
const Role = require('../models/role');
const { console } = require('inspector');

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

    async getUsersWithLoginInfo(req, res) {
        console.log('getUsersWithLoginInfo');
        try {
            const users = await User.find();
            const usersWithLoginInfo = await Promise.all(users.map(async (user) => {
                const loginInfo = await LoginInfo.findOne({ userId: user._id }).populate('userRoleId');
                return { ...user.toObject(), loginInfo };
            }));
            res.status(200).json({ data: usersWithLoginInfo });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUserById(req, res) {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json({data: user});
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
            res.status(200).json({data: updatedUser});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (deletedUser) {
                await LoginInfo.findOneAndDelete({ userId: req.params.id });
                res.status(200).json({ message: 'User and associated login info deleted' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async toggleUserStatus(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                user.status = user.status === 'active' ? 'disable' : 'active';
                await user.save();
                res.status(200).json({ data: user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = { UserController, upload };