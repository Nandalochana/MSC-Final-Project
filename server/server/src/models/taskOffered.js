const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const OfferStatusEnum = require('./offerStatusEnum');
const BookingSlotsStatus = require('./bookingSlotStatus');
const TaskStatusEnum = require('./TaskStatus');

const taskOfferedSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    offerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: Object.values(TaskStatusEnum), default: TaskStatusEnum.ACTIVE },
    offerStatus: { type: String, enum: Object.values(OfferStatusEnum), default: OfferStatusEnum.OFFERED },
    buyerStatus: { type: String, enum: Object.values(BookingSlotsStatus), default: BookingSlotsStatus.PENDING },
    freelancerStatus: { type: String, enum: Object.values(BookingSlotsStatus), default: BookingSlotsStatus.PENDING }
});

const TaskOffered = mongoose.model('TaskOffered', taskOfferedSchema);

module.exports = TaskOffered;
