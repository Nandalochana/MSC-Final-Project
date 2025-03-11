const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const BookingSlotsStatus = require('./bookingSlotStatus');
const TimeSlotStatus = require('./SlotStatus');

const timeSlotSchema = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true }
});

const bookingSlotsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    timeSlot: timeSlotSchema,
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(TimeSlotStatus), default: TimeSlotStatus.ACTIVE },
    hourlyRate: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    buyerStatus: { type: String, enum: Object.values(BookingSlotsStatus), default: BookingSlotsStatus.PENDING },
    freelancerStatus: { type: String, enum: Object.values(BookingSlotsStatus), default: BookingSlotsStatus.PENDING }
});

const BookingSlots = mongoose.model('BookingSlots', bookingSlotsSchema);

module.exports = BookingSlots;
