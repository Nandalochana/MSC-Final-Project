const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const taskLocationInfoSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const TaskLocationInfo = mongoose.model('TaskLocationInfo', taskLocationInfoSchema);

module.exports = TaskLocationInfo;