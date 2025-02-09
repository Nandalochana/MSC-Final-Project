const Task = require('../models/task');

class TaskController {
    async getTasks(req, res) {
        const tasks = await Task.find().populate('createdUserId');
        res.status(200).json({data: tasks});
    }

    async getTaskById(req, res) {
        const task = await Task.findById(req.params.id).populate('createdUserId');
        if (task) {
            res.status(200).json({data: task});
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }

    async getTaskByUserId(req, res) {
        const { userId } = req.query;
        const tasks = await Task.find({ createdUserId: userId }).populate('createdUserId');
        res.status(200).json({data: tasks});
    }

    async createTask(req, res) {
        try {
            const newTask = new Task(req.body);
            await newTask.save();
            res.status(201).json({ data: newTask });
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async updateTask(req, res) {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('createdUserId');
        if (updatedTask) {
            res.status(200).json({data: updatedTask});
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

    async toggleTaskStatus(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            if (task) {
                task.status = task.status === 'active' ? 'disable' : 'active';
                await task.save();
                res.status(200).json({ data: task });
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = TaskController;