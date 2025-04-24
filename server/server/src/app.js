require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const setRoutes = require('./routes/index');
const cors = require('cors'); // Import cors
const { listenToMessages } = require('./utils/serviceBus');
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_PORT = 4000;

mongoose.connect('mongodb://localhost:27017/jamkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from port 5173
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    credentials: true // Allow credentials
};

app.use(cors(corsOptions)); // Enable CORS with options
app.options('*', cors(corsOptions)); // Enable pre-flight
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
setRoutes(app);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
  }
});

// Start Service Bus listening
listenToMessages(io);

httpServer.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
