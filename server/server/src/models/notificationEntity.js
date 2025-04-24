const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'disable', 'read'], default: 'active' },
});

const NotificationEntity = mongoose.model('Notification', Notification);

module.exports = NotificationEntity;
