const BookingSlots = require('../models/bookingSlots');
const FreelancerTimeSlot = require('../models/freelancerTimeSlot');
const TimeSlotStatus = require('../utils/timeSlotStatus');

class BookingSlotsController {
    async createBookingSlot(req, res) {
        try {
            const { freelancerSlotId, userId, buyerId, startTime, endTime, hourlyRate, totalPrice } = req.body;

            const freelancerTimeSlot = await FreelancerTimeSlot.findById(freelancerSlotId);
            if (!freelancerTimeSlot) {
                return res.status(404).json({ error: 'Freelancer time slot not found' });
            }
            freelancerTimeSlot.timeSlotStatus = TimeSlotStatus.MARKED_AS_ALLOCATED;
            console.log(freelancerTimeSlot._id);
            await freelancerTimeSlot.save();
            const freelancerTimeSlotxx = await FreelancerTimeSlot.findById(freelancerSlotId);
            console.log(freelancerTimeSlotxx.timeSlotStatus);
            const bookingSlot = new BookingSlots({
                userId,
                buyerId,
                date: new Date(startTime),
                timeSlot: { start: startTime, end: endTime },
                hourlyRate,
                totalPrice
            });
            await bookingSlot.save();
            res.status(201).json({ data: bookingSlot });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateBookingSlot(req, res) {
        try {
            const bookingSlot = await BookingSlots.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!bookingSlot) {
                return res.status(404).json({ error: 'Booking slot not found' });
            }
            res.status(200).json({ data: bookingSlot });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBookingSlot(req, res) {
        try {
            const bookingSlot = await BookingSlots.findByIdAndDelete(req.params.id);
            if (!bookingSlot) {
                return res.status(404).json({ error: 'Booking slot not found' });
            }
            res.status(200).json({ message: 'Booking slot deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByUserId(req, res) {
        try {
            const bookingSlots = await BookingSlots.find({ userId: req.params.userId });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByBuyerId(req, res) {
        try {
            const bookingSlots = await BookingSlots.find({ buyerId: req.params.buyerId });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByUserIdPast(req, res) {
        try {
            const { userId, date } = req.body;
            const bookingSlots = await BookingSlots.find({
                userId,
                date: { $lt: new Date(date) },
                buyerStatus: { $ne: 'confirmed' },
                freelancerStatus: { $ne: 'confirmed' }
            });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByUserIdFuture(req, res) {
        try {
            const { userId, date } = req.body;
            const bookingSlots = await BookingSlots.find({
                userId,
                date: { $gt: new Date(date) }
            });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByBuyerIdPast(req, res) {
        try {
            const { buyerId, date } = req.body;
            const bookingSlots = await BookingSlots.find({
                buyerId,
                date: { $lt: new Date(date) },
                buyerStatus: { $ne: 'confirmed' },
                freelancerStatus: { $ne: 'confirmed' }
            });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookingSlotsByBuyerIdFuture(req, res) {
        try {
            const { buyerId, date } = req.body;
            const bookingSlots = await BookingSlots.find({
                buyerId,
                date: { $gt: new Date(date) }
            });
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllBookingSlots(req, res) {
        try {
            const bookingSlots = await BookingSlots.find();
            res.status(200).json({ data: bookingSlots });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateBuyerStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const bookingSlot = await BookingSlots.findById(id);
            if (!bookingSlot) {
                return res.status(404).json({ error: 'Booking slot not found' });
            }
            bookingSlot.buyerStatus = status; // Update the status directly
            await bookingSlot.save(); // Save the updated booking slot
            res.status(200).json({ data: bookingSlot });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateFreelancerStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const bookingSlot = await BookingSlots.findById(id);
            if (!bookingSlot) {
                return res.status(404).json({ error: 'Booking slot not found' });
            }
            bookingSlot.freelancerStatus = status; // Update the status directly
            await bookingSlot.save(); // Save the updated booking slot
            res.status(200).json({ data: bookingSlot });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = BookingSlotsController;