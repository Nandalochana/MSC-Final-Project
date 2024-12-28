const jwt = require('jsonwebtoken');
const LoginInfo = require('../models/loginInfo');

class LoginInfoController {
    async getloginInfo(req, res) {
        const loginInfo = await LoginInfo.find().populate('userRoleId');
        res.status(200).json(loginInfo);
    }

    async getLoginInfoById(req, res) {
        const loginInfo = await LoginInfo.findById(req.params.id).populate('userRoleId');
        if (loginInfo) {
            res.status(200).json(loginInfo);
        } else {
            res.status(404).json({ message: 'LoginInfo not found' });
        }
    }

    async createLoginInfo(req, res) {
        try {
            const newLoginInfo = new LoginInfo(req.body);
            await newLoginInfo.save();
            res.status(201).json(newLoginInfo);
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async updateLoginInfo(req, res) {
        const updatedLoginInfo = await LoginInfo.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userRoleId');
        if (updatedLoginInfo) {
            res.status(200).json(updatedLoginInfo);
        } else {
            res.status(404).json({ message: 'LoginInfo not found' });
        }
    }

    async deleteLoginInfo(req, res) {
        const deletedLoginInfo = await LoginInfo.findByIdAndDelete(req.params.id);
        if (deletedLoginInfo) {
            res.status(200).json({ message: 'LoginInfo deleted' });
        } else {
            res.status(404).json({ message: 'LoginInfo not found' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        const loginInfo = await LoginInfo.findOne({ email }).populate('userRoleId');

        if (loginInfo && await loginInfo.comparePassword(password)) {
            const token = jwt.sign({ id: loginInfo._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }

    async logout(req, res) {
        const token = req.header('Authorization')?.split(' ')[1];
        if (token) {
            res.setHeader('Authorization', '');
            res.status(200).json({ message: 'Logged out successfully' });
        } else {
            res.status(400).json({ message: 'Token not provided' });
        }
    }
}

module.exports = LoginInfoController;