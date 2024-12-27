const mongoose = require('mongoose');

const userPaymentTypeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentType', required: true }
});

const UserPaymentType = mongoose.model('UserPaymentType', userPaymentTypeSchema);

module.exports = UserPaymentType;