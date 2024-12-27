const mongoose = require('mongoose');
const StatusEnum = require('./statusEnum');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: { type: String },
    address1: { type: String, required: true },
    address2: { type: String },
    address3: { type: String },
    telephoneNr: { type: String, required: true },
    mobileNr: { type: String, required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

const User = mongoose.model('User', userSchema);

module.exports = User;