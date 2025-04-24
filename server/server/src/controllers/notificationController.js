const NotificationEntity = require('../models/notificationEntity');

class NotificationController {
    async insertNotification(req, res) {
        try {
            const notification = new NotificationEntity(req.body);
            const savedNotification = await notification.save();
            res.status(201).json(savedNotification);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Update a notification by ID
    async updateNotification(req, res) {
        try {
            const updatedNotification = await NotificationEntity.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (updatedNotification) {
                res.status(200).json(updatedNotification);
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Update notification status and mark as read
    async updateNotificationStatus(req, res) {
        try {
            const { id, userId } = req.params;
            const updatedNotification = await NotificationEntity.findOneAndUpdate(
                { _id: id, userId },
                { status: 'inactive', read: true },
                { new: true }
            );
            if (updatedNotification) {
                console.log('Notification updated:', updatedNotification);
                res.status(200).json(updatedNotification);
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Delete a notification by ID
    async deleteNotification(req, res) {
        try {
            const deletedNotification = await NotificationEntity.findByIdAndDelete(req.params.id);
            if (deletedNotification) {
                res.status(200).json({ message: 'Notification deleted' });
            } else {
                res.status(404).json({ message: 'Notification not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // Search notifications by userId
    async searchByUserId(req, res) {
        console.log('searchByUserId', req.params.userId);
        try {
            const notifications = await NotificationEntity.find({ 
            userId: req.params.userId, 
            status: 'active' 
            });
            console.log('notifications', notifications);
            res.status(200).json(notifications);
        } catch (error) {
            console.error('Error searching notifications:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = NotificationController;
