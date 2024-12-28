const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const userLocationInfoSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const UserLocationInfo = mongoose.model('UserLocationInfo', userLocationInfoSchema);

module.exports = UserLocationInfo;