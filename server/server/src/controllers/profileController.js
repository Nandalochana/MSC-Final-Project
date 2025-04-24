 const Profile = require('../models/profile');

class ProfileController {
    async getProfiles(req, res) {
        const profiles = await Profile.find({ status: 'active' });
        res.status(200).json({ data: profiles });
    }

    async getProfilesAllStatus(req, res) {
        const profiles = await Profile.find();
        console.log("profiles: ", { data: profiles });
        res.status(200).json({ data: profiles });
    }

    async getProfileById(req, res) {
        const profile = await Profile.findById(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }

    async createProfile(req, res) {
        try {
            const newProfile = new Profile(req.body);
            await newProfile.save();
            res.status(201).json(newProfile);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateProfile(req, res) {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedProfile) {
            res.status(200).json(updatedProfile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }

    async deleteProfile(req, res) {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (deletedProfile) {
            res.status(200).json({ message: 'Profile deleted' });
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    }

    async toggleProfileStatus(req, res) {
        try {
            const profile = await Profile.findById(req.params.id);
            if (profile) {
                profile.status = profile.status === 'active' ? 'disable' : 'active';
                await profile.save();
                console.log("profile: ", { data: profile });
                res.status(200).json({ data: profile });
            } else {
                res.status(404).json({ message: 'Profile not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = ProfileController;