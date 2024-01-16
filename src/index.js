const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/database');
const { PORT } = require('./config/env');
const { auth } = require('./middlewares/authMiddleware');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);

initializeDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
    })
    .catch((err) => {
        console.log(`App cannot connect to database`, err);
    });