const UserPaymentType = require('../models/userPaymentType');
const PaymentType = require('../models/paymentType'); // Ensure this import is correct

class UserPaymentTypeController {
    async getUserPaymentTypes(req, res) {
        const userPaymentTypes = await UserPaymentType.find().populate('userId').populate('paymentTypeId');
        res.status(200).json(userPaymentTypes);
    }

    async getUserPaymentTypeById(req, res) {
        const userPaymentType = await UserPaymentType.findById(req.params.id).populate('userId').populate('paymentTypeId');
        if (userPaymentType) {
            res.status(200).json(userPaymentType);
        } else {
            res.status(404).json({ message: 'UserPaymentType not found' });
        }
    }

    async createUserPaymentType(req, res) {
        const newUserPaymentType = new UserPaymentType(req.body);
        await newUserPaymentType.save();
        res.status(201).json(newUserPaymentType);
    }

    async updateUserPaymentType(req, res) {
        const updatedUserPaymentType = await UserPaymentType.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId').populate('paymentTypeId');
        if (updatedUserPaymentType) {
            res.status(200).json(updatedUserPaymentType);
        } else {
            res.status(404).json({ message: 'UserPaymentType not found' });
        }
    }

    async deleteUserPaymentType(req, res) {
        const deletedUserPaymentType = await UserPaymentType.findByIdAndDelete(req.params.id);
        if (deletedUserPaymentType) {
            res.status(200).json({ message: 'UserPaymentType deleted' });
        } else {
            res.status(404).json({ message: 'UserPaymentType not found' });
        }
    }
}

module.exports = UserPaymentTypeController;