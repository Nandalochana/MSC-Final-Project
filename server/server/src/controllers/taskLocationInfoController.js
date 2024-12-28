const TaskLocationInfo = require('../models/taskLocationInfo');

class TaskLocationInfoController {
    async getTaskLocationInfo(req, res) {
        const TaskLocationInfoValue = await TaskLocationInfo.find().populate('taskId');
        res.status(200).json(TaskLocationInfoValue);
    }

    async getTaskLocationInfoById(req, res) {
        const taskLocationInfo = await TaskLocationInfo.findById(req.params.id).populate('taskId');
        if (taskLocationInfo) {
            res.status(200).json(taskLocationInfo);
        } else {
            res.status(404).json({ message: 'TaskLocationInfo not found' });
        }
    }

    async createTaskLocationInfo(req, res) {
        try {
            const newTaskLocationInfo = new TaskLocationInfo(req.body);
            await newTaskLocationInfo.save();
            res.status(201).json(newTaskLocationInfo);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTaskLocationInfo(req, res) {
        const updatedTaskLocationInfo = await TaskLocationInfo.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId');
        if (updatedTaskLocationInfo) {
            res.status(200).json(updatedTaskLocationInfo);
        } else {
            res.status(404).json({ message: 'TaskLocationInfo not found' });
        }
    }

    async deleteTaskLocationInfo(req, res) {
        const deletedTaskLocationInfo = await TaskLocationInfo.findByIdAndDelete(req.params.id);
        if (deletedTaskLocationInfo) {
            res.status(200).json({ message: 'TaskLocationInfo deleted' });
        } else {
            res.status(404).json({ message: 'TaskLocationInfo not found' });
        }
    }
}

module.exports = TaskLocationInfoController;