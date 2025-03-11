const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const TimeSlotStatus = require('../utils/timeSlotStatus');

const timeSlotSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true }
});

const freelancerTimeSlotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    available: { type: Boolean, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE },
    timeSlotStatus: { type: String, enum: Object.values(TimeSlotStatus), default: TimeSlotStatus.AVAILABLE },
    timeSlots: [timeSlotSchema]
});

const FreelancerTimeSlot = mongoose.model('FreelancerTimeSlot', freelancerTimeSlotSchema);

module.exports = FreelancerTimeSlot;
