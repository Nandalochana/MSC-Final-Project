const { PENDING } = require("./offerStatusEnum");

const BookingSlotsStatus = Object.freeze({
    CONFIRMED: 'confirmed',
    CANCELLTED: 'cancelled',
    PENDING: 'pending',
    COMPLETED: 'completed'
});

module.exports = BookingSlotsStatus;