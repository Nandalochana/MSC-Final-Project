const Rating = require('../models/rating');
const BookingSlots = require('../models/bookingSlots');
const TimeSlotStatus = require('../models/SlotStatus');
const RatingTypeEnum = require('../models/RatingTypeEnum');
const TaskOffered = require('../models/taskOffered');
const TaskStatusEnum = require('../models/TaskStatus');

class RatingController {
    async createRating(req, res) {
        try {
            const rating = new Rating(req.body);
            if (rating.type === RatingTypeEnum.BOOKING) {
                const bookingSlot = await BookingSlots.findById(rating.taskOrBookingId);
                if (bookingSlot) {
                    bookingSlot.status = TimeSlotStatus.COMPLETED;
                    await bookingSlot.save();
                }
                else{
                    return res.status(404).json({ error: 'Booking slot not found' });
                }
            }else if(rating.type === RatingTypeEnum.TASK){
                const task = await TaskOffered.findById(rating.taskOrBookingId);
                if (task) {
                    task.status = TaskStatusEnum.COMPLETED;
                    await task.save();
                }
                else{
                    return res.status(404).json({ error: 'Task not found' });
                }
                
            }
            await rating.save();
            res.status(201).json({data: rating});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateRating(req, res) {
        try {
            const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' });
            }
            res.status(200).json({data: rating});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteRating(req, res) {
        try {
            const rating = await Rating.findByIdAndDelete(req.params.id);
            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' });
            }
            res.status(200).json({ message: 'Rating deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getRatingById(req, res) {
        try {
            const rating = await Rating.findById(req.params.id);
            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' });
            }
            res.status(200).json({data: rating});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getRatingsByBuyerId(req, res) {
        try {
            const ratings = await Rating.find({ buyerId: req.params.buyerId });
            res.status(200).json({data: ratings});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getRatingsByFreelancerId(req, res) {
        try {
            const ratings = await Rating.find({ freelancerId: req.params.freelancerId });
            res.status(200).json({data: ratings});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllRatings(req, res) {
        try {
            const ratings = await Rating.find();
            res.status(200).json({data: ratings});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RatingController;
