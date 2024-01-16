const routes = require('express').Router();
const authController = require('./controllers/authController');

routes.use('/auth', authController);

module.exports = routes;
