const UserLocationInfo = require('../models/userLocationInfo');

class UserLocationInfoController {
    async getUserLocationInfo(req, res) {
        const userLocationInfo = await UserLocationInfo.find().populate('userId');
        res.status(200).json(userLocationInfo);
    }

    async getUserLocationInfoById(req, res) {
        const userLocationInfo = await UserLocationInfo.findById(req.params.id).populate('userId');
        if (userLocationInfo) {
            res.status(200).json(userLocationInfo);
        } else {
            res.status(404).json({ message: 'UserLocationInfo not found' });
        }
    }

    async createUserLocationInfo(req, res) {
        try {
            const newUserLocationInfo = new UserLocationInfo(req.body);
            await newUserLocationInfo.save();
            res.status(201).json(newUserLocationInfo);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUserLocationInfo(req, res) {
        const updatedUserLocationInfo = await UserLocationInfo.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
        if (updatedUserLocationInfo) {
            res.status(200).json(updatedUserLocationInfo);
        } else {
            res.status(404).json({ message: 'UserLocationInfo not found' });
        }
    }

    async deleteUserLocationInfo(req, res) {
        const deletedUserLocationInfo = await UserLocationInfo.findByIdAndDelete(req.params.id);
        if (deletedUserLocationInfo) {
            res.status(200).json({ message: 'UserLocationInfo deleted' });
        } else {
            res.status(404).json({ message: 'UserLocationInfo not found' });
        }
    }
}

module.exports = UserLocationInfoController;