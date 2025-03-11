
// const { ServiceBusClient } = require("@azure/service-bus");
// const connectionString = "YOUR_SERVICE_BUS_CONNECTION_STRING";
// const queueName = "YOUR_QUEUE_NAME";

// async function sendNotification(notification) {
//     const sbClient = new ServiceBusClient(connectionString);
//     const sender = sbClient.createSender(queueName);

//     try {
//         const message = {
//             body: notification,
//             contentType: "application/json",
//         };
//         await sender.sendMessages(message);
//         console.log(`Sent notification: ${notification.title}`);
//     } catch (err) {
//         console.error("Error sending notification:", err);
//     } finally {
//         await sender.close();
//         await sbClient.close();
//     }
// }

// module.exports = sendNotification;
