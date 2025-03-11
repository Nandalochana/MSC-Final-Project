const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const commentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // New attribute
    comment: { type: String, required: true },
    totalPrice: { type: Number, required: true }, // New attribute
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE } // New attribute
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;