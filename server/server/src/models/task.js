const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const taskSchema = new mongoose.Schema({
    createdUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //createdDate: { type: Date, default: Date.now },
    //updatedDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;