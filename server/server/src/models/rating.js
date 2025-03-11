const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const RatingTypeEnum = require('./RatingTypeEnum');

const ratingSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(RatingTypeEnum), required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE },
    rating: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    taskOrBookingId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
