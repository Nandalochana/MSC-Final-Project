const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const setRoutes = require('./routes/index');
const IndexController = require('./controllers/index');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexController = new IndexController();
setRoutes(app, indexController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});