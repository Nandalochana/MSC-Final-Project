const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const RequiredLevelEnum = require('./requiredLevelEnum');

const taskProfileSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    requiredLevel: { type: String, enum: Object.values(RequiredLevelEnum), default: RequiredLevelEnum.NOT_MANDATORY },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const TaskProfile = mongoose.model('TaskProfile', taskProfileSchema);

module.exports = TaskProfile;