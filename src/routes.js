const routes = require('express').Router();
const authController = require('./controllers/authController');
const watchController = require('./controllers/watchController');
const myProfileController = require('./controllers/myProfileController');
const orderController = require('./controllers/orderController');

routes.use('/auth', authController);
routes.use('/watches', watchController);
routes.use('/myProfile', myProfileController);
routes.use('/orders', orderController);

module.exports = routes;
