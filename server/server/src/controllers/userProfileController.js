const UserProfile = require('../models/userProfile');

class UserProfileController {
    async getUserProfiles(req, res) {
        const userProfiles = await UserProfile.find().populate('profileId').populate('userId');
        res.status(200).json({data: userProfiles});
    }

    async getUserProfileById(req, res) {
        const userProfile = await UserProfile.findById(req.params.id).populate('profileId').populate('userId');
        if (userProfile) {
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }

    async getUserProfileByUserId(req, res) {
        const userProfiles = await UserProfile.find({ userId: req.params.userId }).populate('profileId').populate('userId');
        res.status(200).json({data: userProfiles});
    }

    async createUserProfile(req, res) {
        try {
            const { profileId, userId } = req.body;
            const existingUserProfile = await UserProfile.findOne({ profileId, userId });
            if (existingUserProfile) {
                return res.status(400).json({ message: 'User already Added this Category !' });
            }
            const newUserProfile = new UserProfile(req.body);
            await newUserProfile.save();
            res.status(201).json(newUserProfile);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUserProfile(req, res) {
        const updatedUserProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('profileId').populate('userId');
        if (updatedUserProfile) {
            res.status(200).json(updatedUserProfile);
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }

    async deleteUserProfile(req, res) {
        const deletedUserProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (deletedUserProfile) {
            res.status(200).json({ message: 'UserProfile deleted' });
        } else {
            res.status(404).json({ message: 'UserProfile not found' });
        }
    }
}

module.exports = UserProfileController;