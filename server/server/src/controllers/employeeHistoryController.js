const EmployeeHistory = require('../models/employeeHistory');

class EmployeeHistoryController {
    async getEmployeeHistories(req, res) {
        const employeeHistories = await EmployeeHistory.find().populate('taskId').populate('userId');
        res.status(200).json(employeeHistories);
    }

    async getEmployeeHistoryById(req, res) {
        const employeeHistory = await EmployeeHistory.findById(req.params.id).populate('taskId').populate('userId');
        if (employeeHistory) {
            res.status(200).json(employeeHistory);
        } else {
            res.status(404).json({ message: 'EmployeeHistory not found' });
        }
    }

    async createEmployeeHistory(req, res) {
        try {
            const newEmployeeHistory = new EmployeeHistory(req.body);
            await newEmployeeHistory.save();
            res.status(201).json(newEmployeeHistory);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateEmployeeHistory(req, res) {
        const updatedEmployeeHistory = await EmployeeHistory.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('taskId').populate('userId');
        if (updatedEmployeeHistory) {
            res.status(200).json(updatedEmployeeHistory);
        } else {
            res.status(404).json({ message: 'EmployeeHistory not found' });
        }
    }

    async deleteEmployeeHistory(req, res) {
        const deletedEmployeeHistory = await EmployeeHistory.findByIdAndDelete(req.params.id);
        if (deletedEmployeeHistory) {
            res.status(200).json({ message: 'EmployeeHistory deleted' });
        } else {
            res.status(404).json({ message: 'EmployeeHistory not found' });
        }
    }
}

module.exports = EmployeeHistoryController;