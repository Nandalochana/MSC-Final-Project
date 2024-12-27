const PaymentType = require('../models/paymentType');

class PaymentTypeController {
    async getPaymentTypes(req, res) {
        const paymentTypes = await PaymentType.find();
        res.status(200).json(paymentTypes);
    }

    async getPaymentTypeById(req, res) {
        const paymentType = await PaymentType.findById(req.params.id);
        if (paymentType) {
            res.status(200).json(paymentType);
        } else {
            res.status(404).json({ message: 'PaymentType not found' });
        }
    }

    async createPaymentType(req, res) {
        const newPaymentType = new PaymentType(req.body);
        await newPaymentType.save();
        res.status(201).json(newPaymentType);
    }

    async updatePaymentType(req, res) {
        const updatedPaymentType = await PaymentType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedPaymentType) {
            res.status(200).json(updatedPaymentType);
        } else {
            res.status(404).json({ message: 'PaymentType not found' });
        }
    }

    async deletePaymentType(req, res) {
        const deletedPaymentType = await PaymentType.findByIdAndDelete(req.params.id);
        if (deletedPaymentType) {
            res.status(200).json({ message: 'PaymentType deleted' });
        } else {
            res.status(404).json({ message: 'PaymentType not found' });
        }
    }
}

module.exports = PaymentTypeController;