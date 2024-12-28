const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;