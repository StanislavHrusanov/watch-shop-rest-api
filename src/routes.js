const routes = require('express').Router();
const authController = require('./controllers/authController');
const watchController = require('./controllers/watchController');

routes.use('/auth', authController);
routes.use('/watches', watchController);

module.exports = routes;
