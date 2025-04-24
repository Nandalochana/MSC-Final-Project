const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
if (!connectionString) {
    throw new Error("SERVICE_BUS_CONNECTION_STRING is not defined in the environment variables.");
}
const queueName = process.env.SERVICE_BUS_QUEUE_NAME;
const sbClient = new ServiceBusClient(connectionString);
const receiver = sbClient.createReceiver(queueName);

const listenToMessages = async (io) => {
    receiver.subscribe({
        processMessage: async (message) => {
            const { id,userId, content } = message.body;
            const decodedMessage = {id, userId, content };
            console.log("Received from Service Bus:",decodedMessage);
            console.log("Sending notification:", decodedMessage);
            io.emit("notification", { id, userId,content });
        },
        processError: async (error) => {
            console.error("Error receiving message:", error);
        }
    });
};

module.exports = { listenToMessages };
