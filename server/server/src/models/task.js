const mongoose = require('mongoose');
const taskStatus = require('../utils/TaskStatus');

const taskSchema = new mongoose.Schema({
    createdUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(taskStatus), default: taskStatus.ACTIVE },
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;