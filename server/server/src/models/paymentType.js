const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const paymentTypeSchema = new mongoose.Schema({
    paymentType: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const PaymentTypeValue = mongoose.model('PaymentType', paymentTypeSchema);

module.exports = PaymentTypeValue;