const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');
const taskStatusEnumValues = require('../utils/taskStatusEnum');


const employeeHistorySchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    taskStatus: { type: String, enum: Object.values(taskStatusEnumValues), default: taskStatusEnumValues.PENDING },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const EmployeeHistory = mongoose.model('EmployeeHistory', employeeHistorySchema);

module.exports = EmployeeHistory;