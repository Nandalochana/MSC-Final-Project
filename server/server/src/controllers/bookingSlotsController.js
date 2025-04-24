const BookingSlots = require('../models/bookingSlots');
const FreelancerTimeSlot = require('../models/freelancerTimeSlot');
const User = require('../models/user');
const TimeSlotStatus = require('../utils/timeSlotStatus');
const ServiceBusSender = require('../utils/serviceBusSender');
const { format } = require('date-fns'); // Add this for date formatting

class BookingSlotsController {
    async createBookingSlot(req, res) {
        try {
            const { freelancerSlotId, userId, buyerId, startTime, endTime, taskInfo, description, contactInfo, location } = req.body;
            const freelancerTimeSlot = await FreelancerTimeSlot.findById(freelancerSlotId);
            if (!freelancerTimeSlot) {
                return res.status(404).json({ error: 'Freelancer time slot not found' });
            }
            freelancerTimeSlot.timeSlotStatus = TimeSlotStatus.MARKED_AS_ALLOCATED;
            await freelancerTimeSlot.save();
            const freelancerTimeSlotxx = await FreelancerTimeSlot.findById(freelancerSlotId);
            console.log(freelancerTimeSlotxx.timeSlotStatus);
            const user = await User.findById(freelancerTimeSlot.userId);
            const hourlyRate = user.hourlyRate;
            const hours = calculateTotalHours(startTime, endTime);
            const totalPrice = hourlyRate * hours;
            const bookingSlot = new BookingSlots({
                userId,
                buyerId,
                date: new Date(startTime),
                timeSlot: { start: startTime, end: endTime },
                hourlyRate,
                totalPrice,
                taskInfo,
                description,
                contactInfo,
                location
            });
            await bookingSlot.save();
            console.log("Booking Slot saved");
            // Send a message to the Service Bus Queue
            const serviceBusSender = new ServiceBusSender();
            const formattedDate = format(new Date(bookingSlot.date), 'yyyy-MM-dd');
            const formattedStartTime = format(new Date(bookingSlot.timeSlot.start), 'HH:mm');
            const formattedEndTime = format(new Date(bookingSlot.timeSlot.end), 'HH:mm');
            await serviceBusSender.sendMessage(userId, `Booking Requested with Date: ${formattedDate} Time: ${formattedStartTime} to ${formattedEndTime}`);
            await serviceBusSender.close();

            res.status(201).json({ data: bookingSlot });
        } catch (error) {
            console.error('Error creating booking slot:', error);
            res.status(400).json({ error: error.message });
        }


    }

    async updateBookingSlot(req, res) {
        try {
            const bookingSlot = await BookingSlots.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!bookingSlot) {
                return res.status(404).json({ error: 'Booking slot not found' });
            }
            const serviceBusSender = new ServiceBusSender();
            const formattedDate = format(new Date(bookingSlot.date), 'yyyy-MM-dd');
            const formattedStartTime = format(new Date(bookingSlot.timeSlot.start), 'HH:mm');
            const formattedEndTime = format(new Date(bookingSlot.timeSlot.end), 'HH:mm');
            await serviceBusSender.sendMessage(bookingSlot.userId, `Booking Requested Updated with Date: ${formattedDate} Time: ${formattedStartTime} to ${formattedEndTime}`);
            await serviceBusSender.close();
            //
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
            const serviceBusSender = new ServiceBusSender();
            const formattedDate = format(new Date(bookingSlot.date), 'yyyy-MM-dd');
            const formattedStartTime = format(new Date(bookingSlot.timeSlot.start), 'HH:mm');
            const formattedEndTime = format(new Date(bookingSlot.timeSlot.end), 'HH:mm');
            await serviceBusSender.sendMessage(bookingSlot.userId, `Booking Deleted with Date: ${formattedDate} Time: ${formattedStartTime} to ${formattedEndTime}`);
            await serviceBusSender.close();
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

    async getAllBookingSlotsWithUserInfo(req, res) {
        try {
            const bookingSlots = await BookingSlots.find().populate('userId').populate('buyerId').populate('timeSlot');
            console.log("Slots : ", { data: bookingSlots });
            res.status(200).json({ data: bookingSlots });
        }
        catch (error) {
            console.error("Error fetching booking slots with user info:", error);
            res.status(400).json({ error: error.message });
        }
    }

    async toggleBookingStatus(req, res) {
        try {
            const bookingSlot = await BookingSlots.findById(req.params.id);
            if (bookingSlot) {
                bookingSlot.status = bookingSlot.status === 'active' ? 'disable' : 'active';
                await bookingSlot.save();
                console.log("Booking Slot status updated:", bookingSlot);
                res.status(200).json({ bookingSlot });
            } else {
                res.status(404).json({ message: 'bookingSlot not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
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

/**
 * Helper method to calculate total hours between two time values.
 * @param {string} startTime - The start time in ISO format.
 * @param {string} endTime - The end time in ISO format.
 * @returns {number} - Total hours as a decimal value.
 */
function calculateTotalHours(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMilliseconds = end - start;
    return diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
}

module.exports = BookingSlotsController;