const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const commentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    comment: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;