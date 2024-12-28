const EmployerHistory = require('../models/employerHistory');

class EmployerHistoryController {
    async getEmployerHistories(req, res) {
        const employerHistories = await EmployerHistory.find().populate('taskId').populate('userId');
        res.status(200).json(employerHistories);
    }

    async getEmployerHistoryById(req, res) {
        const employerHistory = await EmployerHistory.findById(req.params.id).populate('taskId').populate('userId');
        if (employerHistory) {
            res.status(200).json(employerHistory);
        } else {
            res.status(404).json({ message: 'EmployerHistory not found' });
        }
    }

    async createEmployerHistory(req, res) {
        try {
            const newEmployerHistory = new EmployerHistory(req.body);
            await newEmployerHistory.save();
            res.status(201).json(newEmployerHistory);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateEmployerHistory(req, res) {
        const updatedEmployerHistory = await EmployerHistory.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId').populate('userId');
        if (updatedEmployerHistory) {
            res.status(200).json(updatedEmployerHistory);
        } else {
            res.status(404).json({ message: 'EmployerHistory not found' });
        }
    }

    async deleteEmployerHistory(req, res) {
        const deletedEmployerHistory = await EmployerHistory.findByIdAndDelete(req.params.id);
        if (deletedEmployerHistory) {
            res.status(200).json({ message: 'EmployerHistory deleted' });
        } else {
            res.status(404).json({ message: 'EmployerHistory not found' });
        }
    }
}

module.exports = EmployerHistoryController;