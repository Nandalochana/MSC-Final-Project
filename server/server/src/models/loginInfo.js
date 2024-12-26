const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const StatusEnum = require('./statusEnum');

const loginInfoSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRoleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE }
});

loginInfoSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

loginInfoSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const LoginInfo = mongoose.model('LoginInfo', loginInfoSchema);

module.exports = LoginInfo;