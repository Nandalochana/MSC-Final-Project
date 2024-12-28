const Task = require('../models/task');

class TaskController {
    async getTasks(req, res) {
        const tasks = await Task.find().populate('createdUserId');
        res.status(200).json(tasks);
    }

    async getTaskById(req, res) {
        const task = await Task.findById(req.params.id).populate('createdUserId');
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    async createTask(req, res) {
        try {
            const newTask = new Task(req.body);
            await newTask.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTask(req, res) {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('createdUserId');
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    async deleteTask(req, res) {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
}

module.exports = TaskController;