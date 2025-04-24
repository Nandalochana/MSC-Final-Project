const mongoose = require('mongoose');
const TimeSlotStatus = require('./SlotStatus');

const locationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(TimeSlotStatus), default: TimeSlotStatus.ACTIVE },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;