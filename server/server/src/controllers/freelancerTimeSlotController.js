const mongoose = require('mongoose');
const FreelancerTimeSlot = require('../models/freelancerTimeSlot');
const TimeSlotStatus = require('../utils/timeSlotStatus');

class FreelancerTimeSlotController {
    async getFreelancerTimeSlots(req, res) {
        const timeSlots = await FreelancerTimeSlot.find().populate('userId');
        res.status(200).json({ data: timeSlots });
    }

    async getFreelancerTimeSlotById(req, res) {
        console.log("id----" + req.params.id);
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const timeSlot = await FreelancerTimeSlot.findById(req.params.id).populate('userId');
        if (timeSlot) {
            res.status(200).json({ data: timeSlot });
        } else {
            res.status(404).json({ message: 'Time slot not found' });
        }
    }

    async getTimeSlotsByFreelancerId(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const timeSlots = await FreelancerTimeSlot.find({ userId: id }).populate('userId');
        res.status(200).json({ data: timeSlots });
    }

    async createFreelancerTimeSlot(req, res) {
        try {
            const { userId, date, timeSlots, timeSlotStatus } = req.body;
            const conflict = await FreelancerTimeSlot.findOne({
                userId,
                date,
                timeSlotStatus: { $in: [TimeSlotStatus.AVAILABLE, TimeSlotStatus.UNAVAILABLE] },
                'timeSlots': {
                    $elemMatch: {
                        $or: timeSlots.map(slot => ({
                            $or: [
                                { start: { $lt: slot.end, $gte: slot.start } },
                                { end: { $gt: slot.start, $lte: slot.end } },
                                { start: { $lte: slot.start }, end: { $gte: slot.end } }
                            ]
                        }))
                    }
                }
            });

            if (conflict) {
                return res.status(400).json({ message: 'Time slot conflict detected' });
            }

            const newTimeSlot = new FreelancerTimeSlot({ ...req.body, timeSlotStatus: timeSlotStatus || TimeSlotStatus.AVAILABLE });
            await newTimeSlot.save();
            res.status(201).json({ data: newTimeSlot });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateFreelancerTimeSlot(req, res) {
        try {
            const { userId, date, timeSlots, timeSlotStatus } = req.body;
            const conflict = await FreelancerTimeSlot.findOne({
                userId,
                date,
                _id: { $ne: req.params.id },
                timeSlotStatus: { $in: [TimeSlotStatus.AVAILABLE, TimeSlotStatus.UNAVAILABLE] },
                'timeSlots': {
                    $elemMatch: {
                        $or: timeSlots.map(slot => ({
                            $or: [
                                { start: { $lt: slot.end, $gte: slot.start } },
                                { end: { $gt: slot.start, $lte: slot.end } },
                                { start: { $lte: slot.start }, end: { $gte: slot.end } }
                            ]
                        }))
                    }
                }
            });

            if (conflict) {
                return res.status(400).json({ message: 'Time slot conflict detected' });
            }

            const updatedTimeSlot = await FreelancerTimeSlot.findByIdAndUpdate(req.params.id, { ...req.body, timeSlotStatus: timeSlotStatus || TimeSlotStatus.AVAILABLE }, { new: true }).populate('userId');
            if (updatedTimeSlot) {
                res.status(200).json({ data: updatedTimeSlot });
            } else {
                res.status(404).json({ message: 'Time slot not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteFreelancerTimeSlot(req, res) {
        const deletedTimeSlot = await FreelancerTimeSlot.findByIdAndDelete(req.params.id);
        if (deletedTimeSlot) {
            res.status(200).json({ message: 'Time slot deleted' });
        } else {
            res.status(404).json({ message: 'Time slot not found' });
        }
    }

    async searchFreelancerTimeSlots(req, res) {
        const { userId, date } = req.query;
        const query = {};
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid userId format' });
            }
            query.userId = userId;
        }
        if (date) query.date = new Date(date);
        const timeSlots = await FreelancerTimeSlot.find(query).populate('userId');
        res.status(200).json({ data: timeSlots, message: "success" });
    }
}

module.exports = FreelancerTimeSlotController;
