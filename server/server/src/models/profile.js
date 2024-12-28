const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const profileSchema = new mongoose.Schema({
    profileName: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;