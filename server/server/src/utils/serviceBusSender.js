const { ServiceBusClient } = require('@azure/service-bus');
const NotificationEntity = require('../models/notificationEntity');

class ServiceBusSender {
    constructor() {
        this.serviceBusClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
        this.sender = this.serviceBusClient.createSender(process.env.SERVICE_BUS_QUEUE_NAME);
    }

    async sendMessage(userId, content) {     
        try {
            const notification = new NotificationEntity({ userId, content });
            await notification.save();
            const savedNotification = await NotificationEntity.findById(notification._id);
            console.log('Saved Notification:', savedNotification);
            const message = {
                body: { 
                    id: savedNotification._id, 
                    userId: savedNotification.userId, 
                    content: savedNotification.content 
                },
                contentType: 'application/json',
            };
            await this.sender.sendMessages(message);
            console.log('Message sent to Service Bus queue:', message);
        } 
        catch (error) {
            console.error('Error sending message to Service Bus queue:', error);
        }
    }

    async close() {
        await this.sender.close();
        await this.serviceBusClient.close();
    }
}

module.exports = ServiceBusSender;
