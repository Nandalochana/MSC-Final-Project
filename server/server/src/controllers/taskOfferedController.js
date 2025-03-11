const TaskOffered = require('../models/taskOffered');
const Task = require('../models/task');
const Comment = require('../models/comment');
const StatusEnum = require('../models/statusEnum');
const offerEnum = require('../utils/offerEnum');
const taskStatus = require('../utils/TaskStatus');
const { Freelancer } = require('../utils/systemEnums');
const BookingSlotsStatus = require('../models/bookingSlotStatus');

class TaskOfferedController {
    async createTaskOffered(req, res) {
        try {
            const { taskId, offerUserId, commentId } = req.body;
            const task = await Task.findById(taskId);
            task.status =  taskStatus.OFFERED;
            await task.save();
            console.log(task.offferStatsus);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const comment = await Comment.findById(commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            const newTaskOffered = new TaskOffered({
                taskId,
                offerUserId,
                totalPrice: comment.totalPrice, // Fetch total price from comment
                status: StatusEnum.ACTIVE,
                offerStatus: offerEnum.Offered
            });

            await newTaskOffered.save();
            res.status(201).json({ message: 'succefully offfered to user' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTaskOffered(req, res) {
        try {
            const updatedTaskOffered = await TaskOffered.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedTaskOffered) {
                res.status(200).json(updatedTaskOffered);
            } else {
                res.status(404).json({ message: 'TaskOffered not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateTaskOfferedStatusAsFreelnacer(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const taskOffered = await TaskOffered.findById(id);
            if (!taskOffered) {
                return res.status(404).json({ message: 'TaskOffered not found' });
            }
            taskOffered.status = status;
            taskOffered.freelancerStatus = BookingSlotsStatus.CONFIRMED;
            await taskOffered.save();
            res.status(200).json(taskOffered);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    
    async updateTaskOfferedStatusAsBuyer(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const taskOffered = await TaskOffered.findById(id);
            if (!taskOffered) {
                return res.status(404).json({ message: 'TaskOffered not found' });
            }
            taskOffered.status = status;
            taskOffered.buyerStatus = BookingSlotsStatus.CONFIRMED;
            await taskOffered.save();
            res.status(200).json(taskOffered);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteTaskOffered(req, res) {
        try {
            const deletedTaskOffered = await TaskOffered.findByIdAndDelete(req.params.id);
            if (deletedTaskOffered) {
                res.status(200).json({ message: 'TaskOffered deleted' });
            } else {
                res.status(404).json({ message: 'TaskOffered not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async searchTaskOffered(req, res) {
        try {
            const { taskId, offerUserId } = req.query;
            const query = {};
            if (taskId) query.taskId = taskId;
            if (offerUserId) query.offerUserId = offerUserId;

            const taskOffereds = await TaskOffered.find(query).populate('taskId offerUserId');
            res.status(200).json({ data: taskOffereds });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTasksByOfferUserId(req, res) {
        try {
            const { offerUserId } = req.params;
            const tasks = await TaskOffered.find({ offerUserId }).populate('taskId');
            res.status(200).json({ data: tasks });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getTasksByCreatedUserId(req, res) {
        try {
            const { createdUserId } = req.params;
            const tasks = await Task.find({ createdUserId }).populate('createdUserId');
            res.status(200).json({ data: tasks });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = TaskOfferedController;
