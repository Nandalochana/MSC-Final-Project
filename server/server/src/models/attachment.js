const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const attachmentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;