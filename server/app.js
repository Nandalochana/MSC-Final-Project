const Notification = require('./server/src/models/notificationModel');
const sendNotification = require('./server/src/utils/serviceBusSender');

// ...existing code...

const notification = new Notification("Test Title", "This is a test message", "recipient@example.com");
sendNotification(notification);

// ...existing code...
