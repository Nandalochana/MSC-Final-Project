const TaskProfile = require('../models/taskProfile');

class TaskProfileController {
    async getTaskProfiles(req, res) {
        const taskProfiles = await TaskProfile.find().populate('taskId').populate('profileId');
        res.status(200).json(taskProfiles);
    }

    async getTaskProfileById(req, res) {
        const taskProfile = await TaskProfile.findById(req.params.id).populate('taskId').populate('profileId');
        if (taskProfile) {
            res.status(200).json(taskProfile);
        } else {
            res.status(404).json({ message: 'TaskProfile not found' });
        }
    }

    async createTaskProfile(req, res) {
        try {
            const newTaskProfile = new TaskProfile(req.body);
            await newTaskProfile.save();
            res.status(201).json(newTaskProfile);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTaskProfile(req, res) {
        const updatedTaskProfile = await TaskProfile.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId').populate('profileId');
        if (updatedTaskProfile) {
            res.status(200).json(updatedTaskProfile);
        } else {
            res.status(404).json({ message: 'TaskProfile not found' });
        }
    }

    async deleteTaskProfile(req, res) {
        const deletedTaskProfile = await TaskProfile.findByIdAndDelete(req.params.id);
        if (deletedTaskProfile) {
            res.status(200).json({ message: 'TaskProfile deleted' });
        } else {
            res.status(404).json({ message: 'TaskProfile not found' });
        }
    }

    async getProfilesByTaskId(req, res) {
        try {
            const taskProfiles = await TaskProfile.find({ taskId: req.params.taskId }).populate('profileId');
            const profiles = taskProfiles.map(tp => tp.profileId);
            res.status(200).json(profiles);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = TaskProfileController;