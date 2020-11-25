const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// mongoDB connection string
const MONGO_URL = 'mongodb+srv://admin:1q2w3e4r@cluster0.vyjc7.mongodb.net/vuejs?retryWrites=true&w=majority';



// Middleware
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/contact-list', require('./routes/api/ContactList'));

// Handle production

if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 5000;



mongoose
    .connect(
        MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then((result) => {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
    })
    .catch((err) => {
        console.log(err);
    });